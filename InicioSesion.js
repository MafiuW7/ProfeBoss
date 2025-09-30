import { loginUsuario, getUsuario } from "./FireBase.js";

const btn = document.getElementById("btnLogin");
const mensaje = document.getElementById("mensaje");

btn.addEventListener("click", async () => {
  const nombre = document.getElementById("nombre").value.trim();
  const contraseña = document.getElementById("contraseña").value.trim();

  if (!nombre || !contraseña) {
    mensaje.textContent = "Completa los campos.";
    mensaje.style.color = "red";
    return;
  }

  try {
    const uid = await loginUsuario(nombre, contraseña);
    sessionStorage.setItem("uid", uid);

    const usuario = await getUsuario(uid);

    // Mostrar mensaje de bienvenida
    mensaje.textContent = "¡Bienvenido, " + usuario.nombre + "!";
    mensaje.style.color = "green";

    // Redirigir según lo que tenga guardado
    setTimeout(() => {     if (!usuario.curso) {
      window.location.href = "SeleccionCurso.html";
    } else if (!usuario.materiaPrincipal) {
      window.location.href = "SeleccionMateria.html";
    } else {
      window.location.href = "index.html";
    } }, 2000);
  }



  catch (err) {
    mensaje.textContent = "Error: Nombre o contraseña incorrectos.";
    mensaje.style.color = "red";
  };
});

