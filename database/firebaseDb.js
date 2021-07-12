

import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD8Ir6PhLICvWwmbf5KDm4p4btn1ETrTCc",
    authDomain: "kon-db.firebaseapp.com",
    projectId: "kon-db",
    storageBucket: "kon-db.appspot.com",
    messagingSenderId: "558992267147",
    appId: "1:558992267147:web:c9a7ef75d5052defe8818e",
    measurementId: "G-MQB2MFZCJH"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;