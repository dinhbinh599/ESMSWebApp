importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}

firebase.initializeApp({
    apiKey: "AIzaSyAKUe0_p7UjQE2Eg_KYl8hcwJN2hDAkzR4",
    authDomain: "capstone-esms.firebaseapp.com",
    projectId: "capstone-esms",
    storageBucket: "capstone-esms.appspot.com",
    messagingSenderId: "84350334649",
    appId: "1:84350334649:web:0580f7bbc68ea168b50d68",
    measurementId: "G-B9W8ZXZET7"
})

const initMessaging = firebase.messaging()

initMessaging.onBackgroundMessage((payload) => {
    console.log(payload.notification)  
});


