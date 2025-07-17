const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys");
const P = require("pino");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
  const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" })
    });

  sock.ev.on("creds.update", saveCreds);

  // 🔍 Mostrar todos los grupos y sus IDs una vez conectado
  sock.ev.on("connection.update", async (update) => {
    const { connection } = update;
    if (connection === "open") {
      console.log("✅ Conectado a WhatsApp");

      const chats = await sock.groupFetchAllParticipating();
      console.log("📋 Lista de grupos donde estás:");
      for (const key in chats) {
        console.log(`🔹 Grupo: ${chats[key].subject} - ID: ${key}`);
      }
    }
  });

  // 🟡 Coloca aquí el ID real del grupo que obtendrás desde consola
  const GRUPO_OBJETIVO = "120363422364795351@g.us"; // ⚠️ CAMBIA ESTO

  // 👥 Evento: cuando alguien es añadido al grupo
  // 👥 Evento: cuando alguien entra o sale del grupo
  sock.ev.on("group-participants.update", async (update) => {
    if (update.id !== GRUPO_OBJETIVO) return;

    for (const participant of update.participants) {
        let profilePic;
        try {
            profilePic = await sock.profilePictureUrl(participant, "image");
        } catch {
            profilePic = "https://i.imgur.com/UWbDPrN.png";
        }

        const name = await sock.getName(participant) || `+${participant.split("@")[0]}`;
        const number = participant.split("@")[0];

        if (update.action === "add") {
            const mensaje = `👋 Bienvenido *${name}* a *XFire Squad* 🔥\n\n📱 Número: +${number}\n🔥 Fuego real: *XFire Squad🔥!!*`;
            await sock.sendMessage(update.id, {
            image: { url: profilePic },
            caption: mensaje
            });
            console.log(`✅ Bienvenida enviada a ${name}`);
        }

        if (update.action === "remove") {
            const mensaje = `😢 *${name}* se ha retirado de *XFire Squad*\n\n📱 Número: +${number}\n🔥 Que el fuego siempre te acompañe. ¡Hasta pronto!`;
            await sock.sendMessage(update.id, {
            image: { url: profilePic },
            caption: mensaje
            });
            console.log(`🟥 Despedida enviada a ${name}`);
        }
    }
  });

  // 🔁 Reconexion automática
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("❌ Conexión cerrada. ¿Reconectar?", shouldReconnect);
      if (shouldReconnect) startBot();
    }
  });

  const qrcode = require("qrcode-terminal");

    sock.ev.on("connection.update", async (update) => {
    const { connection, qr } = update;

    if (qr) {
        qrcode.generate(qr, { small: true });
        console.log("📲 Escanea el QR desde tu WhatsApp para iniciar sesión");
    }

    if (connection === "open") {
        console.log("✅ Conectado a WhatsApp");

        const chats = await sock.groupFetchAllParticipating();
        console.log("📋 Lista de grupos donde estás:");
        for (const key in chats) {
        console.log(`🔹 Grupo: ${chats[key].subject} - ID: ${key}`);
        }
    }
    });
}

startBot();
