// Obtener referencias a los elementos del DOM
const diaNumero = document.getElementById('diaNumero');
const mes = document.getElementById('mes');
const año = document.getElementById('año');
const diaSemana = document.getElementById('diaSemana');
const listaTareas = document.getElementById('listaTareas');
const form = document.getElementById('form');
const regex = /^\S(.*\S)?$/; // Expresión regular para validar entradas no vacías

// Inicializar la lista de tareas
let tareas = [];

// Función para mostrar la fecha actual en el DOM
const mostrarFecha = () => {
    const date = new Date();
    diaNumero.textContent = date.toLocaleString('es', { day: 'numeric' });
    mes.textContent = date.toLocaleString('es', { month: 'short' });
    año.textContent = date.toLocaleString('es', { year: 'numeric' });
    diaSemana.textContent = date.toLocaleString('es', { weekday: 'long' });
}

// Función para editar una tarea existente
const editarTarea = (tarea) => {
    const nuevaTarea = prompt('Ingrese la nueva tarea');
    if (!regex.test(nuevaTarea)) return alert('Por favor, ingrese un valor válido');
    if (!nuevaTarea) return;
    tareas.forEach(t => {
        if (t.tarea === tarea) {
            t.tarea = nuevaTarea;
        }
    });
    mostrarTareas(tareas);
};

// Función para eliminar una tarea existente
const eliminarTarea = (tarea) => {
    const validarEliminar = prompt("Ingrese el nombre de la tarea que quiere eliminar");
    if (!validarEliminar) return;
    if (validarEliminar !== tarea) return alert("El nombre de la tarea no coincide");
    tareas = tareas.filter(t => t.tarea !== tarea);
    mostrarTareas(tareas);
};

// Función para mostrar las tareas en el DOM
const mostrarTareas = (tareas) => {
    listaTareas.innerHTML = '';
    tareas.forEach(tarea => {
        listaTareas.innerHTML += `
        <section class="tarea tareasContainer ${tarea.hecho ? 'hecho' : 'porHacer'}" >
            <p onClick='cambiarEstadoTarea("${tarea.tarea}")' class=" tareaP ${tarea.hecho ? 'hechoP' : ''}"">${tarea.tarea}</p>
            <div>
                <button class="editar" onClick='editarTarea("${tarea.tarea}")'><i class="fas fa-pencil-alt"></i></button>
                <button class="eliminar" onClick='eliminarTarea("${tarea.tarea}")'><i class="fas fa-trash-alt"></i></button>
            </div>    
        </section>
        `;
    });
};

// Función para agregar una nueva tarea
const agregarNuevaTarea = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const inputTarea = data.get('nuevaTarea')
    if (!regex.test(inputTarea)) return alert('Por favor, ingrese un valor válido');
    tareas.push({ tarea: inputTarea, hecho: false });
    mostrarTareas(tareas);
    console.log(tareas);
    form.reset()
};

// Agregar un evento al formulario para agregar nuevas tareas
form.addEventListener('submit', agregarNuevaTarea)

// Función para cambiar el estado de una tarea (hecho/por hacer)
const cambiarEstadoTarea = (tarea) => {
    tareas.forEach(t => {
        if (t.tarea === tarea) {
            t.hecho = !t.hecho;
        }
    });
    mostrarTareas(tareas);
    ordenarTareas();
}

// Función para ordenar las tareas, mostrando primero las no hechas
const ordenarTareas = () => {
    tareas.sort((a, b) => a.hecho - b.hecho);
    mostrarTareas(tareas);
}

// Mostrar la fecha actual al cargar la página
mostrarFecha();