
const formulario = document.getElementById("formulario-tarea");
const entrada = document.getElementById("entrada-tarea");
const lista = document.getElementById("lista-tareas");
const contador = document.getElementById("contador");
const mensajeVacio = document.getElementById("mensaje-vacio");

let tareas = [];

function actualizarLista() {
    lista.innerHTML = "";

    tareas.forEach((tarea, indice) => {
        const elemento = document.createElement("li");

        // Crear la casilla de verificación
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;
        checkbox.classList.add("checkbox-tarea");

        checkbox.addEventListener("change", () => {
            tareas[indice].completada = checkbox.checked;
            actualizarLista();
        });

        // Crear el texto de la tarea
        const texto = document.createElement("span");
        texto.textContent = tarea.nombre;

        if (tarea.completada) {
            texto.classList.add("completada");
        }

        // Crear el botón para eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("eliminar");

        botonEliminar.addEventListener("click", () => {
            tareas.splice(indice, 1);
            actualizarLista();
        });

        // Agregar los elementos a la tarea
        elemento.appendChild(checkbox);
        elemento.appendChild(texto);
        elemento.appendChild(botonEliminar);

        lista.appendChild(elemento);
    });

    const pendientes = tareas.filter(tarea => !tarea.completada).length;

    contador.textContent = pendientes;
    mensajeVacio.style.display = tareas.length === 0 ? "block" : "none";
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = entrada.value.trim();

    if (nombre === "") {
        return;
    }

    tareas.push({
        nombre: nombre,
        completada: false
    });

    entrada.value = "";
    actualizarLista();
});

actualizarLista();
