// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0a9FXgEHiTsaOgQl2rxP7H2XAENnf6DE",
  authDomain: "chat-karlo-f2d87.firebaseapp.com",
  projectId: "chat-karlo-f2d87",
  storageBucket: "chat-karlo-f2d87.appspot.com",
  messagingSenderId: "854412323115",
  appId: "1:854412323115:web:70bf6c5862c28a42a87d6e",
  measurementId: "G-TT5G2WQ139"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore()
export const storage = getStorage()
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db =
//   firebaseApp.firestore(); 
//   const app = initializeApp(firebaseConfig)
//   export const auth = getAuth(app)

// export default db;