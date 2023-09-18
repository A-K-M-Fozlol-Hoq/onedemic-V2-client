// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQSyvinDdSC0j1rhI-ASGKlVMS6Wv2cgo",
  authDomain: "onedemic-v2.firebaseapp.com",
  projectId: "onedemic-v2",
  storageBucket: "onedemic-v2.appspot.com",
  messagingSenderId: 387500634825,
  appId: " https://onedemic-server.vercel.app/api/v1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
