

import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCTRErEtrONcnBdyrGoi9O2_ZCkWz474tI",
    authDomain: "kon2-ac12f.firebaseapp.com",
    projectId: "kon2-ac12f",
    storageBucket: "kon2-ac12f.appspot.com",
    messagingSenderId: "166603336323",
    appId: "1:166603336323:web:a232f3b8d49a2ba76e49b6"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;