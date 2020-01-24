importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
    apiKey: "AIzaSyBiPAWjKP9Qcy0OCxjl-TMt80ie0teJkVQ",
    authDomain: "sargas-5ecb3.firebaseapp.com",
    databaseURL: "https://sargas-5ecb3.firebaseio.com",
    projectId: "sargas-5ecb3",
    storageBucket: "sargas-5ecb3.appspot.com",
    messagingSenderId: "441438148482",
    appId: "1:441438148482:web:61cb59b116fd912952219b"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});