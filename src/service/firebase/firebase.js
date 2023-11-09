import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAKUe0_p7UjQE2Eg_KYl8hcwJN2hDAkzR4",
    authDomain: "capstone-esms.firebaseapp.com",
    projectId: "capstone-esms",
    storageBucket: "capstone-esms.appspot.com",
    messagingSenderId: "84350334649",
    appId: "1:84350334649:web:0580f7bbc68ea168b50d68",
    measurementId: "G-B9W8ZXZET7"
};

// Initialize Firebase
// firebase.messaging.isSupported()
firebase.initializeApp(firebaseConfig);

export default firebase