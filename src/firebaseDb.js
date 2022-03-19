import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth,signInWithEmailAndPassword,signOut } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAWTo8thfE0iBPSM1HsnTM38P-najtCKFY",
  authDomain: "wolverine-mumbai-db.firebaseapp.com",
  projectId: "wolverine-mumbai-db",
  storageBucket: "wolverine-mumbai-db.appspot.com",
  messagingSenderId: "753985943282",
  appId: "1:753985943282:web:e8f2d8474f0386aeefc26b",
  measurementId: "G-VW4WP3HGHS"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = firebaseApp.firestore();
export {db,auth,signInWithEmailAndPassword,signOut}; 
