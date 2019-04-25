import firebase from "@firebase/app"
import "@firebase/auth"
import "@firebase/firestore"

console.log(process.env)

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJ_ID
}

firebase.initializeApp(firebaseConfig);

export default firebase