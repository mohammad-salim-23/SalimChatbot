import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxlxNB7x4P0ooljCnsAScuSOtc1ptKe-8",
  authDomain: "aichatbot-c288e.firebaseapp.com",
  projectId: "aichatbot-c288e",
  storageBucket: "aichatbot-c288e.firebasestorage.app",
  messagingSenderId: "208521185101",
  appId: "1:208521185101:web:8a4e3cc889c1422f439904"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;