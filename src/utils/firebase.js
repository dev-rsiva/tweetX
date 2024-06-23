// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpUaWFhqb7l025btgu0IAo8seeU2--r6M",
  authDomain: "tweetx-f1ac1.firebaseapp.com",
  projectId: "tweetx-f1ac1",
  storageBucket: "tweetx-f1ac1.appspot.com",
  messagingSenderId: "350063743872",
  appId: "1:350063743872:web:9b4c00541af204c4162765",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
