import { app, db } from "./FireBase.js";
import { doc, updateDoc } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function guardarMateria(materia) {
  const uid = sessionStorage.getItem("uid");
  console.log("UID en materia:", uid);
  if (!uid) return;

  await updateDoc(doc(db, "usuarios", uid), { materiaPrincipal: materia });
  window.location.href = "index.html";
}

document.getElementById("btnLenguaje").addEventListener("click", () => guardarMateria("Lenguaje"));
document.getElementById("btnMatematicas").addEventListener("click", () => guardarMateria("Matemáticas"));
document.getElementById("btnCiencias").addEventListener("click", () => guardarMateria("Ciencias"));
document.getElementById("btnHistoria").addEventListener("click", () => guardarMateria("Historia"));

