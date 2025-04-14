export let swRegistration: ServiceWorkerRegistration | null = null;

export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push Manager are supported!");
    navigator.serviceWorker
      .register("../public/sw.js")
      .then((registration) => {
        swRegistration = registration;
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
}