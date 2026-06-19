import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjOCd2SiENwxBjDajeQ9gv7oiq3lxKlJc",
  authDomain: "perfect-sample-112b7.firebaseapp.com",
  projectId: "perfect-sample-112b7",
  storageBucket: "perfect-sample-112b7.firebasestorage.app",
  messagingSenderId: "693333132104",
  appId: "1:693333132104:web:6938fe9b2cac6e8ac7a97d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Função para salvar progresso do produtor
export async function updateProducerData(uid, data) {
    const userRef = doc(db, "users", uid);
    return await updateDoc(userRef, data);
}