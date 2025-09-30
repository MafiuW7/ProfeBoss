import { db } from "./FireBase.js";
import { doc, updateDoc } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function guardarCurso(curso) {
  const uid = sessionStorage.getItem("uid");
  console.log("UID en curso:", uid);

  if (!uid) {
    alert("Error: no hay usuario activo.");
    return;
  }

  try {
    await updateDoc(doc(db, "usuarios", uid), { curso });
    console.log("Curso guardado correctamente:", curso);
    window.location.href = "SeleccionMateria.html";
  } catch (err) {
    console.error("Error guardando curso:", err);
    alert("No se pudo guardar el curso. Revisa la consola.");
  }
}

// Conectar eventos
document.getElementById("btn5").addEventListener("click", () => guardarCurso("5° Básico"));
document.getElementById("btn6").addEventListener("click", () => guardarCurso("6° Básico"));
document.getElementById("btn7").addEventListener("click", () => guardarCurso("7° Básico"));
document.getElementById("btn8").addEventListener("click", () => guardarCurso("8° Básico"));
