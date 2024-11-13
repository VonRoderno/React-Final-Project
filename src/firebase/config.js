import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCFYQsaxLsX8re1_4YI4eIbj-SS8rKm6xc",
    authDomain: "react-final-project-3cdf6.firebaseapp.com",
    projectId: "react-final-project-3cdf6",
    storageBucket: "react-final-project-3cdf6.firebasestorage.app",
    messagingSenderId: "82530640582",
    appId: "1:82530640582:web:cd3fb55c336d9922a2adc7",
    measurementId: "G-FLKFZPKG6D"
  };

  initializeApp(firebaseConfig);

  const db = getFirestore();

  const auth = getAuth();

  export {db}
  export {auth}