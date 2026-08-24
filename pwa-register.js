// CHP Pilotaje — registro de PWA
// Este archivo se carga desde index.html y activa el Service Worker.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then((registration) => {
        console.log("CHP Pilotaje: Service Worker activo.", registration.scope);
      })
      .catch((error) => {
        console.error("CHP Pilotaje: no se pudo registrar el Service Worker.", error);
      });
  });
}
