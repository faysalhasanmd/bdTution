import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 👈 ১. এটি নতুন যুক্ত করা হয়েছে

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf9Fe0S12LzvNVgun31FM0oXZdE7RsDek",
  authDomain: "assignment-11-1306a.firebaseapp.com",
  projectId: "assignment-11-1306a",
  storageBucket: "assignment-11-1306a.firebasestorage.app",
  messagingSenderId: "286729855266",
  appId: "1:286729855266:web:2ac586e4c338abdcdcc57b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Export it
export const auth = getAuth(app); // 👈 ২. এটি নতুন যুক্ত করা হয়েছে যাতে অন্য ফাইলে ইম্পোর্ট করা যায়
