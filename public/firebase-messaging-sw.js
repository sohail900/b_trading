importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// // Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
    apiKey: "AIzaSyBAhyK9ZZvhZZM9HFivb-U-83oG7lmVeWM",
    authDomain: "ortakmarketapp.firebaseapp.com",
    projectId: "ortakmarketapp",
    storageBucket: "ortakmarketapp.firebasestorage.app",
    messagingSenderId: "637461942070",
    appId: "1:637461942070:web:a2c188e24a27b657eaed97",
    measurementId: "G-8KMV6CQWR2"
};

firebase?.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging();

self.addEventListener('install', function (event) {
    console.log('Hello world from the Service Worker :call_me_hand:');
});


