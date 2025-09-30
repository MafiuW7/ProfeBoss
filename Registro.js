// Registro.js
import { registrarUsuario } from "./FireBase.js"; // ajustá nombre si tu archivo es distinto

const btn = document.getElementById("btnRegistro");
const mensaje = document.getElementById("mensaje");

btn.addEventListener("click", async () => {
  mensaje.textContent = "";
  const nombre = document.getElementById("nombre").value.trim();
  const contraseña = document.getElementById("contraseña").value.trim();

  if (!nombre || !contraseña) {
    mensaje.textContent = "Completa nombre y contraseña.";
    mensaje.style.color = "red";
    return;
  }

  try {
    btn.disabled = true;
    btn.textContent = "Registrando...";
    await registrarUsuario(nombre, contraseña);
    mensaje.textContent = "✅ Usuario registrado. Redirigiendo al login...";
    mensaje.style.color = "green";

    setTimeout(() => { window.location.href = "index.html"; }, 1400);
  } catch (err) {
    console.error(err);
    mensaje.textContent = "Error: " + (err.message || err);
    mensaje.style.color = "red";
  } finally {
    btn.disabled = false;
    btn.textContent = "Registrarse";
  }
});

