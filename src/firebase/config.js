import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBQMgAbZtCSKlr3VJflKR-i2jhBP160PBk",
  authDomain: "mitsui-web-app.firebaseapp.com",
  projectId: "mitsui-web-app",
  storageBucket: "mitsui-web-app.appspot.com",
  messagingSenderId: "207953420839",
  appId: "1:207953420839:web:73a65b3d5d00d475e82402"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;