
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDCEIk9SVgEjGvJgexFCa2248BbMdr4QNQ",
  authDomain: "creativeconnect-19f22.firebaseapp.com",
  projectId: "creativeconnect-19f22",
  storageBucket: "creativeconnect-19f22.firebasestorage.app",
  messagingSenderId: "1060560585835",
  appId: "1:1060560585835:web:4db7def642f832ecd25d2e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
