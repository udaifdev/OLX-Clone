import firebase from "firebase";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbMG5yECYhqBJevqQF9X3OMpuz-GaHozo",
  authDomain: "olx-project-demo.firebaseapp.com",
  projectId: "olx-project-demo",
  storageBucket: "olx-project-demo.appspot.com",
  messagingSenderId: "495838806761",
  appId: "1:495838806761:web:bf70b6ccb6b935bb82e678",
  measurementId: "G-C7CZZJ4BEK"
};


export default firebase.initializeApp(firebaseConfig)