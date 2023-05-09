// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqgh8hqcWoXUNmTS5vctPZWsX3GmFmqH8",
  authDomain: "shopping-cart-6f949.firebaseapp.com",
  projectId: "shopping-cart-6f949",
  storageBucket: "shopping-cart-6f949.appspot.com",
  messagingSenderId: "72235385446",
  appId: "1:72235385446:web:977e81b38415b4ee19a3a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
