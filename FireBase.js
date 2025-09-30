// FireBase.js
// usa módulos ESM (type="module" en tu HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// --- CONFIG: pega tu firebaseConfig aquí (el que ya tenís) ---
const firebaseConfig = {
  apiKey: "AIzaSyC7Fuk8H2_GvbFoISVFZTzN1zCPefoJ8bw",
  authDomain: "profeboss-1305.firebaseapp.com",
  projectId: "profeboss-1305",
  storageBucket: "profeboss-1305.firebasestorage.app",
  messagingSenderId: "658968520269",
  appId: "1:658968520269:web:3fd439ebbad456e9141e04",
  measurementId: "G-W9Z0VZF2QC"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- FUNCIONES EXPUESTAS ---
// registrarUsuario(nombre, contraseña) -> crea Auth + doc en Firestore
export async function registrarUsuario(nombre, contraseña) {
  // convertimos nombre a un email ficticio para usar Auth
  const email = `${nombre.replace(/\s+/g,'').toLowerCase()}@profeboss.com`;

  // crear usuario en Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
  const uid = userCredential.user.uid;

  // Guardar perfil en Firestore (no guardamos contraseña en Firestore)
  await setDoc(doc(db, "usuarios", uid), {
    nombre: nombre,
    curso: "",
    materiaPrincipal: "",
    progreso: {}
  });

  return uid;
}

// loginUsuario(nombre, contraseña) -> retorna uid
export async function loginUsuario(nombre, contraseña) {
  const email = `${nombre.replace(/\s+/g,'').toLowerCase()}@profeboss.com`;
  const userCredential = await signInWithEmailAndPassword(auth, email, contraseña);
  return userCredential.user.uid;
}
// getUsuario(uid) -> obtiene doc con datos
export async function getUsuario(uid) {
  const docSnap = await getDoc(doc(db, "usuarios", uid));
  return docSnap.exists() ? docSnap.data() : null;
}

// guardarProgreso(uid, key)
export async function guardarProgreso(uid, key, valor = true) {
  await updateDoc(doc(db, "usuarios", uid), {
    [`progreso.${key}`]: valor
  });

}

export { app, db, auth };
