import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDwvbnDIQEjnLj1YWTih_Y6MWDhk2OCkzo",
    authDomain: "kon5-e8989.firebaseapp.com",
    projectId: "kon5-e8989",
    storageBucket: "kon5-e8989.appspot.com",
    messagingSenderId: "107317948467",
    appId: "1:107317948467:web:dc91a473f3e17459a8f346"
}
firebase.initializeApp(config);
firebase.firestore();

export default firebase;