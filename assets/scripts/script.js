const diaNumero = document.getElementById('diaNumero');
const mes = document.getElementById('mes');
const año = document.getElementById('año');
const diaSemana = document.getElementById('diaSemana');
const listaTareas = document.getElementById('listaTareas');

const mostrarFecha = () => {
    const date = new Date();
    diaNumero.textContent = date.toLocaleString('es', { day : 'numeric'});
    mes.textContent = date.toLocaleString('es', { month : 'short'});
    año.textContent = date.toLocaleString('es', { year : 'numeric'});
    diaSemana.textContent = date.toLocaleString('es', { weekday : 'long'});
}

const agregarNuevaTarea = event => {
    event.preventDefault();
    const {value} = event.target.nuevaTarea;
    if (!value) return;
    const tarea = document.createElement('section');
    tarea.classList.add('tarea');
    tarea.addEventListener('click', cambiarEstadoTarea)
    tarea.textContent = value;
    listaTareas.prepend(tarea);
    event.target.reset();
}

const cambiarEstadoTarea = event => {
    event.target.classList.toggle('hecho');
}

const order = () => {
    const hecho = [];
    const porHacer = [];
    listaTareas.childNodes.forEach( elemento => {
        elemento.classList.contains('hecho') ? hecho.push(elemento) : porHacer.push(elemento);
    })
    return [...porHacer, ... hecho];
}

const ordenarTareas = () => {
    order().forEach(elemento =>  listaTareas.appendChild(elemento));
}

mostrarFecha ();
