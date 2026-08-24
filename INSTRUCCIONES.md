# PAQUETE 1.5 — Iconos y activación PWA

## Archivos

- `icons/icon-192.png`
- `icons/icon-512.png`
- `favicon-32.png`
- `pwa-register.js`

## Dónde subirlos en GitHub

En la raíz del repositorio:

CH-Pereira-Pilotaje/
├── index.html
├── manifest.json
├── sw.js
├── pwa-register.js
├── favicon-32.png
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README-APK.md

## Cambio mínimo en index.html

Dentro de `<head>`, después de `<title>...</title>`, agrega:

<link rel="manifest" href="./manifest.json">

Antes de `</head>`, agrega:

<script src="./pwa-register.js"></script>

NO reemplaces el index.html completo todavía.
NO borres Firebase ni el código existente.

## Prueba

Después de guardar los cambios y esperar a GitHub Pages:

1. Abre la aplicación.
2. Usa Ctrl+Shift+R.
3. En Chrome de escritorio abre DevTools → Application.
4. Revisa Manifest y Service Workers.
5. En Android abre la aplicación desde Chrome y revisaremos si aparece la opción de instalación.

## Nota

La PWA todavía NO es la APK final. Esta etapa prepara la aplicación web para poder instalarla y posteriormente empaquetarla como Android.
