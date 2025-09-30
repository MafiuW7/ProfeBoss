import { getUsuario } from "./FireBase.js";

const uid = sessionStorage.getItem("uid");
const titulo = document.getElementById("titulo");
const contenido = document.getElementById("contenido");

(async () => {
  if (!uid) {
    titulo.textContent = "Error: no hay usuario activo.";
    return;
  }

  const usuario = await getUsuario(uid);
  if (!usuario) {
    titulo.textContent = "Error: usuario no encontrado";
    return;
  }

  const curso = usuario.curso;
  const materia = sessionStorage.getItem("materiaSeleccionada") || usuario.materiaPrincipal;

  

  // Título dinámico
  titulo.textContent = `${materia} - ${curso}`;

  // Plantilla base para cada interfaz
const plantilla = (nombre, icono) => `
  <h2>Bienvenido a ${nombre} de ${curso} ${icono}</h2>
  <div class="lesson-path"></div>
  <div id="Snoopy"></div>
`;

  // Interfaz para cada combinación
  if (curso === "5° Básico" && materia === "Lenguaje") {
    contenido.innerHTML = plantilla("Lenguaje", "📖");
  } else if (curso === "5° Básico" && materia === "Matemáticas") {
    contenido.innerHTML = plantilla("Matemáticas", "➗📐");
  } else if (curso === "5° Básico" && materia === "Ciencias") {
    contenido.innerHTML = plantilla("Ciencias", "🌱🔬");
  } else if (curso === "5° Básico" && materia === "Historia") {
    contenido.innerHTML = plantilla("Historia", "📜");
  }

  else if (curso === "6° Básico" && materia === "Lenguaje") {
    contenido.innerHTML = plantilla("Lenguaje", "📖");
  } else if (curso === "6° Básico" && materia === "Matemáticas") {
    contenido.innerHTML = plantilla("Matemáticas", "➗📐");
  } else if (curso === "6° Básico" && materia === "Ciencias") {
    contenido.innerHTML = plantilla("Ciencias", "🌱🔬");
  } else if (curso === "6° Básico" && materia === "Historia") {
    contenido.innerHTML = plantilla("Historia", "📜");
  }

  else if (curso === "7° Básico" && materia === "Lenguaje") {
    contenido.innerHTML = plantilla("Lenguaje", "📖");
  } else if (curso === "7° Básico" && materia === "Matemáticas") {
    contenido.innerHTML = plantilla("Matemáticas", "➗📐");
  } else if (curso === "7° Básico" && materia === "Ciencias") {
    contenido.innerHTML = plantilla("Ciencias", "🌱🔬");
  } else if (curso === "7° Básico" && materia === "Historia") {
    contenido.innerHTML = plantilla("Historia", "📜");
  }

  else if (curso === "8° Básico" && materia === "Lenguaje") {
    contenido.innerHTML = plantilla("Lenguaje", "📖");
  } else if (curso === "8° Básico" && materia === "Matemáticas") {
    contenido.innerHTML = plantilla("Matemáticas", "➗📐");
  } else if (curso === "8° Básico" && materia === "Ciencias") {
    contenido.innerHTML = plantilla("Ciencias", "🌍🔬");
  } else if (curso === "8° Básico" && materia === "Historia") {
    contenido.innerHTML = plantilla("Historia", "🏺");
  }

  else {
    contenido.innerHTML = `<p>No hay interfaz definida para ${curso} - ${materia}</p>`;
  }

  // Modal de ejercicio

 // Generar nodos dinámicos 
 const ejercicios = [1, 2, 3];
 const path = document.createElement("div");
 path.className = "lesson-path";
 contenido.appendChild(path);

  ejercicios.forEach((n, i) => {
    // nodo
    const nodo = document.createElement("div");
    nodo.className = "lesson-node";
    nodo.id = `ej${n}`;
    nodo.textContent = n;

    // marcar verde si ya está en progreso
    if (usuario.progreso?.[`ej${n}`]) nodo.classList.add("filled");

    // bloqueo: solo deja abrir si es el primero o si el anterior está completado
    const desbloqueado =
      n === 1 || usuario.progreso?.[`ej${n - 1}`] ? true : false;

    if (!desbloqueado) nodo.classList.add("locked");

    // click → abrir modal
    nodo.addEventListener("click", () => {
      if (desbloqueado) abrirEjercicio(materia, curso, n);
    });

    // animación: aparecen de a poco
    setTimeout(() => path.appendChild(nodo), i * 600);

    // línea entre nodos
    if (i < ejercicios.length - 1) {
      const line = document.createElement("div");
      line.className = "path-line";
      setTimeout(() => path.appendChild(line), i * 600 + 300);
    }
  });
})();

// ---------------- MODAL DE EJERCICIOS ---------------- //
const modal = document.getElementById("modalEjercicio");
const cerrarModalBtn = document.getElementById("cerrarModal");
const tituloEjercicio = document.getElementById("tituloEjercicio");
const contenidoEjercicio = document.getElementById("contenidoEjercicio");
const btnCompletar = document.getElementById("btnCompletar");

let ejerciciosData = {}; // base de datos de ejercicios
let ejercicioActual = null;
let subindice = 0;

// cerrar modal
cerrarModalBtn.addEventListener("click", () => (modal.style.display = "none"));

// --- EJERCICIOS --- //
ejerciciosData["Matemáticas-5° Básico"] = {
  1: [
    { pregunta: "Si tengo un submarino a más de 600.000m de profundidad, ¿Cómo escribirías esa profundidad?", respuesta: "-600000" },
    { pregunta: "Escribe en palabras lo siguiente: 578206", respuesta: "quinientos setenta y ocho mil doscientos seis" },
    { pregunta: "Si un avión vuela a 200m y se eleva 100 más, ¿Cómo expresarías la altura en la que quedó?", respuesta: "300" },
    { pregunta: "Ordena de mayor a menor: 369, 1997, 13248, 2, 11", respuesta: ["13248","1997","369","11","2"], tipo: "ordenar" },
    { pregunta: "Ordena de menor a mayor: 704 , 4 , 56789 , 1234 , 10", respuesta: ["4","10","704","1234","56789"], tipo: "ordenar" }
  ],
  2: [
    { pregunta: "Multiplica: 12 x 23", respuesta: "276" },
    { pregunta: "Multiplica: 31 x 14", respuesta: "434" },
    { pregunta: "Multiplica: 40 x 99", respuesta: "3960" },
    { pregunta: "Multiplica: 73 x 17", respuesta: "1241" },
    { pregunta: "Multiplica: 63 x 87", respuesta: "5481" }
  ],
  3: [
    { pregunta: "Divide: 135 / 5", respuesta: "27" },
    { pregunta: "Divide: 497 / 7", respuesta: "71" },
    { pregunta: "Divide: 983 / 4", respuesta: "245.75" },
    { pregunta: "Divide: 673 / 1", respuesta: "673" },
    { pregunta: "Divide: 438 / 8", respuesta: "54.75" }
  ]
};
ejerciciosData["Matemáticas-6° Básico"] = {
  1: [
    { pregunta: "Un colegio tiene 8 765 libros en la biblioteca y recibe una donación de 4 532 libros más. ¿Cuántos libros tiene ahora en total?", respuesta: "13097" },
    { pregunta: "En una ciudad viven 25 480 personas. En un pueblo cercano hay 12 365 personas. ¿Cuántas personas más tiene la ciudad que el pueblo?", respuesta: "13015" },
    { pregunta: "Un estadio tiene 12 350 asientos y se vendieron entradas para 3 partidos. ¿Cuántas entradas se vendieron en total?", respuesta: "37050" },
    { pregunta: "Una fábrica produce 48 600 galletas y quiere guardarlas en cajas de 150 galletas cada una. ¿Cuántas cajas completas se pueden llenar?", respuesta: "324" },
    { pregunta: "Una tienda vende 3 250 camisetas a $4 500 cada una. ¿Cuánto dinero recibe en total por la venta?", respuesta: "14625000" }
  ],
  2: [ 
    { pregunta: "María tiene 3 monedas de $2,5. ¿Cuánto dinero tiene en total?", respuesta: "7.5" },
    { pregunta: "Un envase de jugo trae 1,25 litros. Si compran 4 envases, ¿Cuántos litros de jugo tienen en total?", respuesta: "5" },
    { pregunta: "0,46×10", respuesta: "4.6" },
    { pregunta: "3,25÷10", respuesta: "0.325" },
    { pregunta: "7,89×100", respuesta: "789" }
  ],
  3: [
    { pregunta: "Ana pensó en un número, lo multiplicó por 3 y luego le sumó 5. El resultado fue 20. Escribe una ecuación y resuelve el número que pensó Ana.", respuesta: "x=5" },
    { pregunta: "Escribe una expresión con una letra que represente &quot;el doble de un número cualquiera&quot;.", respuesta: "2x" },
    { pregunta: "Representa con una expresión el siguiente enunciado: &quot;El triple de un número menos 1&quot;", respuesta: "3x-1" },
    { pregunta: "Pedro tiene n años. Su hermano tiene el doble de edad menos 3. Escribe una expresión que represente la edad del hermano.", respuesta: "2n-3" },
    { pregunta: "Cada caja tiene x lápices. Si tengo 5 cajas, ¿cuántos lápices tengo en total?", respuesta: "5x" }
  ]
};
ejerciciosData["Historia-5° Básico"] = {
  1: [
    { pregunta: "¿Qué buscaban los reinos europeos al financiar los viajes de Cristóbal Colón?", respuesta: "nuevas rutas comerciales" },
    { pregunta: "¿Qué papel jugó la caída de Constantinopla (1453) en la necesidad de buscar nuevas rutas?", respuesta: "bloqueo de rutas comerciales" },
    { pregunta: "Nombra tres avances tecnológicos que ayudaron a los viajes de descubrimiento.", respuesta: "brújula, carabelas, astrolabio" },
    { pregunta: "Problemas de las tripulaciones (hambre, enfermedades, tormentas, motines). Elige uno y explica.", respuesta: "hambre" },
    { pregunta: "Elige un explorador (ej: Vasco da Gama) y explica su importancia.", respuesta: "vasco da gama" }
  ],
  2: [
    { pregunta: "La conquista permitió que en Europa llegaran productos como maíz, papa y cacao. (V/F)", respuesta: "V" },
    { pregunta: "En América, la población indígena aumentó después de la llegada de los europeos. (V/F)", respuesta: "F" },
    { pregunta: "Los europeos introdujeron caballos y vacas en América. (V/F)", respuesta: "V" },
    { pregunta: "La conquista no afectó la cultura de los pueblos originarios. (V/F)", respuesta: "F" },
    { pregunta: "Escribe 5 palabras clave de la conquista (ejemplo: oro, mestizaje, enfermedades, comercio, cultura).", respuesta: "oro,mestizaje,enfermedades,comercio,cultura" }
  ],
  3: [
    { pregunta: "En la colonia, ¿la sociedad estaba organizada de manera igualitaria? (V/F)", respuesta: "F" },
    { pregunta: "Los españoles y criollos ocupaban los cargos más importantes. (V/F)", respuesta: "V" },
    { pregunta: "Los indígenas fueron obligados a trabajar en encomiendas. (V/F)", respuesta: "V" },
    { pregunta: "Las fiestas religiosas eran muy importantes en la vida cotidiana. (V/F)", respuesta: "V" },
    { pregunta: "Escribe del 1 al 4 según posición social: 1=Peninsulares, 2=Criollos, 3=Mestizos, 4=Indígenas y esclavos", respuesta: "1,2,3,4" }
  ]
};
ejerciciosData["Historia-6° Básico"] = {
  1: [
    { pregunta: "¿Cuál fue uno de los principales productos que generó riqueza para Chile a fines del siglo XIX y comienzos del siglo XX? <br> a) El cobre <br> b) El oro <br> c) El salitre <br> d) El carbón", respuesta: "El salitre" },
    { pregunta: "¿En qué zona de Chile se concentró la explotación del salitre? <br> a) Zona sur <br> b) Zona central <br> c) Zona austral <br> d) Zona norte", respuesta: "Zona norte" },
    { pregunta: "¿Qué eran las oficinas salitreras? <br> a) Edificios del gobierno <br> b) Ciudades pequeñas donde vivían y trabajaban los obreros del salitre <br> c) Lugares para exportar frutas <br> d) Escuelas del norte", respuesta: "Ciudades pequeñas donde vivían y trabajaban los obreros del salitre" },
    { pregunta: "¿Qué nombre recibe el conjunto de problemas sociales que afectaban a los trabajadores durante el auge del salitre? <br> a) Conflicto nacional <br> b) Crisis económica <br> c) Cuestión laboral <br> d) Cuestión social", respuesta: "Cuestión social" },
    { pregunta: "¿Qué institución vendía productos a los trabajadores en las oficinas salitreras? <br> a) Municipalidad <br> b) Biblioteca <br> c) Pulpería <br> d) Hospital", respuesta: "Pulpería" }
  ],
  2: []//Falta...
}
ejerciciosData["Ciencias-5° Básico"] = {
  1: [
    { pregunta: "Todos los seres vivos están formados por células. (✔️/❌)", respuesta: "✔️" },
    { pregunta: "Un órgano está formado por un solo tipo de célula. (✔️/❌)", respuesta: "❌" },
    { pregunta: "Los tejidos son grupos de células que trabajan juntas. (✔️/❌)", respuesta: "✔️" },
    { pregunta: "El corazón es un órgano del sistema digestivo. (✔️/❌)", respuesta: "❌" },
    { pregunta: "Ordena: células → tejidos → órganos → sistemas", respuesta: "células,tejidos,órganos,sistemas" }
  ],
  2: [
    { pregunta: "Ordena el paso de los alimentos (1 al 8): Estómago, Ano, Boca, Intestino grueso, Esófago, Hígado, Intestino delgado, Recto", respuesta: "Boca,Esófago,Estómago,Hígado,Intestino delgado,Intestino grueso,Recto,Ano" },
    { pregunta: "¿Qué órgano tritura y mastica los alimentos?", respuesta: "boca" },
    { pregunta: "¿Qué órgano transporta el alimento al estómago?", respuesta: "esófago" },
    { pregunta: "¿Qué órgano absorbe los nutrientes?", respuesta: "intestino delgado" },
    { pregunta: "¿Qué órgano elimina los desechos?", respuesta: "recto y ano" }
  ],
  3: [
    { pregunta: "Clasifica: Leche – Pan – Pollo – Zanahoria – Pescado – Manzana – Arroz – Nueces – Huevos → Energía, Crecimiento, Vitaminas", respuesta: "pan,arroz = energía; pollo,pescado,huevos,leche = crecimiento; zanahoria,manzana,nueces = vitaminas" },
    { pregunta: "Las proteínas ayudan al crecimiento y reparación del cuerpo. (V/F)", respuesta: "V" },
    { pregunta: "Las frutas y verduras entregan vitaminas y minerales. (V/F)", respuesta: "V" },
    { pregunta: "El azúcar es un alimento indispensable para vivir. (V/F)", respuesta: "F" },
    { pregunta: "Si comes mucho pan, arroz y fideos pero pocas frutas y verduras, ¿qué problema tendrás?", respuesta: "falta de vitaminas" }
  ]
};




// función que abre el modal en el nodo correcto
function abrirEjercicio(materia, curso, nodo) {
  const key = `${materia}-${curso}`;
  ejercicioActual = { materia, curso, nodo };
  subindice = 0;

  mostrarSubEjercicio(key, nodo, subindice);
  modal.style.display = "flex";
}

// función que carga cada subejercicio
function mostrarSubEjercicio(key, nodo, i) {
  const subej = ejerciciosData[key][nodo][i];
  tituloEjercicio.textContent = `Ejercicio ${nodo}.${i + 1}`;

  if (subej.tipo === "ordenar") {
    const opciones = [...subej.respuesta].sort(() => Math.random() - 0.5); // shuffle
    contenidoEjercicio.innerHTML = `
      <p>${subej.pregunta}</p>
      <ul id="sortable" class="sortable-list">
        ${opciones.map(op => `<li class="draggable" draggable="true">${op}</li>`).join("")}
      </ul>
      <p id="feedback"></p>
    `;
    activarDragAndDrop();
  } else {
    contenidoEjercicio.innerHTML = `
      <p>${subej.pregunta}</p>
      <input type="text" id="respuestaInput" placeholder="Tu respuesta aquí">
      <p id="feedback"></p>
    `;
  }

  btnCompletar.onclick = () => validarRespuesta(key, nodo, i);
}


// validar la respuesta
async function validarRespuesta(key, nodo, i) {
  const subej = ejerciciosData[key][nodo][i];
  const feedback = document.getElementById("feedback");

  if (subej.tipo === "ordenar") {
    const items = [...document.querySelectorAll(".draggable")].map(li => li.textContent);
    if (JSON.stringify(items) === JSON.stringify(subej.respuesta)) {
      feedback.textContent = "¡Correcto! ✅";
      feedback.style.color = "green";
      avanzarEjercicio(key, nodo, i);
    } else {
      feedback.textContent = "Orden incorrecto ❌ intenta de nuevo";
      feedback.style.color = "red";
    }
  } else {
    const input = document.getElementById("respuestaInput").value.trim().toLowerCase();
    if (input === subej.respuesta.toLowerCase()) {
      feedback.textContent = "¡Correcto! ✅";
      feedback.style.color = "green";
      avanzarEjercicio(key, nodo, i);
    } else {
      feedback.textContent = "Incorrecto ❌ intenta de nuevo";
      feedback.style.color = "red";
    }
  }
}

async function avanzarEjercicio(key, nodo, i) {
  if (i < ejerciciosData[key][nodo].length - 1) {
    subindice++;
    setTimeout(() => mostrarSubEjercicio(key, nodo, subindice), 1000);
  } else {
    document.getElementById(`ej${nodo}`).classList.add("filled");
    await guardarProgreso(uid, `ej${nodo}`);
    setTimeout(() => {
      modal.style.display = "none";
      location.reload();
    }, 1000);
  }
}


// --- MODAL Otras Materias ---
function abrirModal() {
  document.getElementById("modalMateria").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalMateria").style.display = "none";
}

// Para seleccionar otra materia
function explorarMateria(materia) {
  sessionStorage.setItem("materiaSeleccionada", materia);
  window.location.reload(); // recarga la interfaz con la nueva materia
}

window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.explorarMateria = explorarMateria;