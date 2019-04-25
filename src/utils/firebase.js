import firebase from "firebase"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_API_KEY,
  storageBucket: process.env.FIREBASE_API_KEY
}

firebase.initializeApp(firebaseConfig);

export default firebase