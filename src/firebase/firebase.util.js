import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjw1J-MN_CLGXoh6TAdrIARn6yBBG9E5o",
  authDomain: "weather-app-vue-6c10b.firebaseapp.com",
  projectId: "weather-app-vue-6c10b",
  storageBucket: "weather-app-vue-6c10b.appspot.com",
  messagingSenderId: "1076080735789",
  appId: "1:1076080735789:web:a5a13de2b1d7264578aaa4",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore();

export { app, database };
