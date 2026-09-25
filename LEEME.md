# Invitación · Ruben & Susana

React + Tailwind CSS + Lucide, con animaciones CSS y diseño mobile-first.

## Usar

Requiere Node.js 22.13 o superior. Ejecuta `npm install` y `npm run dev` para abrir la vista local. `npm run build` compila la versión de producción.

## Personalizar

Edita `app/invitation-config.ts`: nombres, fecha, hora, dirección, contactos, mensaje, imágenes y música. Los datos de fecha/dirección son provisionales. Los botones de WhatsApp generan enlaces `wa.me` cuando agregas los números con código de país; mientras están vacíos, muestran un aviso y no envían mensajes.

Pon tus imágenes en `public/images/` y actualiza sus rutas en la configuración. Se incluyen ilustraciones SVG provisionales. Hay comentarios en los componentes indicando dónde sustituirlas. El sobre está dibujado con CSS para poder animarlo sin depender de una imagen.

Pon tu canción en `public/audio/` y actualiza `audio` en la configuración. Se incluye una melodía instrumental original de caja musical, reproducida únicamente cuando se pulsa el radar. `node scripts/create-invitation-assets.mjs` regenera los recursos provisionales.

Los estilos están en `app/globals.css` y los componentes en `app/page.tsx`. Las fuentes de Google Fonts requieren conexión; existen fuentes alternativas. Se respeta la preferencia de movimiento reducido y el sobre se puede abrir con teclado.
