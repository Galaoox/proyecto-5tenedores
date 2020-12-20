import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDVUGxyzaZnnBEITUAU3LDSUj5fAfhOxr0",
    authDomain: "tenedores-ca281.firebaseapp.com",
    databaseURL: "https://tenedores-ca281.firebaseio.com",
    projectId: "tenedores-ca281",
    storageBucket: "tenedores-ca281.appspot.com",
    messagingSenderId: "535452411372",
    appId: "1:535452411372:web:489166621c48ed511c0cc9",
    measurementId: "G-QFW3XES4WD"
};


export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore(firebaseApp);
