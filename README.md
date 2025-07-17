# Bot WhatsApp

Este proyecto es un bot para WhatsApp basado en Node.js, utilizando la librería [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) para interactuar con la API de WhatsApp Web. El bot está diseñado principalmente para gestionar eventos en grupos, como dar la bienvenida a nuevos miembros y despedir a quienes salen.

## Características principales

- **Conexión automática a WhatsApp Web** usando autenticación multi-archivo.
- **Muestra en consola todos los grupos** donde el bot está presente, junto con sus IDs.
- **Bienvenida personalizada** con imagen de perfil para nuevos miembros de un grupo específico.
- **Despedida personalizada** con imagen de perfil para miembros que salen del grupo.
- **Reconexión automática** si la sesión se cierra inesperadamente (excepto si se cierra por cierre de sesión manual).
- **Generación de QR** en consola para iniciar sesión fácilmente.
- **Gestión de credenciales y sesiones** en la carpeta `auth_info_baileys/`.

## Estructura del proyecto

```
bot-WhatsApp/
│
├── auth_info_baileys/         # Carpeta donde se almacenan las credenciales y sesiones de WhatsApp
├── index.js                   # Código principal del bot
├── package.json               # Dependencias y metadatos del proyecto
├── package-lock.json          # Detalles de dependencias instaladas
└── node_modules/              # Dependencias instaladas (autogenerado)
```

## Instalación

1. **Clona el repositorio** y entra en la carpeta del proyecto:

   ```bash
   git clone <url-del-repo>
   cd bot-WhatsApp
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

## Uso

1. **Ejecuta el bot**:

   ```bash
   node index.js
   ```

2. **Escanea el código QR** que aparece en la consola con la app de WhatsApp para vincular el bot.

3. **Configura el grupo objetivo**:
   - Cambia el valor de la constante `GRUPO_OBJETIVO` en `index.js` por el ID del grupo donde quieres que el bot dé la bienvenida y despida miembros.
   - El ID del grupo se muestra en consola cuando el bot se conecta.

## Personalización

- Puedes modificar los mensajes de bienvenida y despedida en el archivo `index.js` para adaptarlos a tu comunidad.
- El bot utiliza la imagen de perfil del usuario, o una imagen por defecto si no está disponible.

## Dependencias principales

- [`@whiskeysockets/baileys`](https://www.npmjs.com/package/@whiskeysockets/baileys): API para WhatsApp Web.
- [`pino`](https://www.npmjs.com/package/pino): Logger para Node.js.
- [`qrcode-terminal`](https://www.npmjs.com/package/qrcode-terminal): Generador de QR en la terminal.

## Notas de seguridad

- **No compartas la carpeta `auth_info_baileys/`** ni su contenido, ya que contiene las credenciales de tu sesión de WhatsApp.
- Si necesitas reiniciar la autenticación, elimina la carpeta `auth_info_baileys/` y vuelve a ejecutar el bot para generar un nuevo QR.

## Licencia

ISC 