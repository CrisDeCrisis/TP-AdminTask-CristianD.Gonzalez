const diaNumero = document.getElementById('diaNumero');
const mes = document.getElementById('mes');
const año = document.getElementById('año');
const diaSemana = document.getElementById('diaSemana');
const listaTareas = document.getElementById('listaTareas');

const mostrarFecha = () => {
    const date = new Date();
    diaNumero.textContent = date.toLocaleString('es', { day: 'numeric' });
    mes.textContent = date.toLocaleString('es', { month: 'short' });
    año.textContent = date.toLocaleString('es', { year: 'numeric' });
    diaSemana.textContent = date.toLocaleString('es', { weekday: 'long' });
}

const agregarNuevaTarea = event => {
    event.preventDefault();
    const { value } = event.target.nuevaTarea;
    if (!value) return;

    const tarea = document.createElement('section');
    tarea.classList.add('tarea');
    tarea.addEventListener('click', cambiarEstadoTarea);
    tarea.textContent = value;

    const botonesContainer = document.createElement('div');
    botonesContainer.style.display = 'flex';
    botonesContainer.style.gap = '5px';

    const editar = document.createElement('button');
    editar.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editar.classList.add('editar');
    editar.addEventListener('click', editarTarea);

    const eliminar = document.createElement('button');
    eliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
    eliminar.classList.add('eliminar');
    eliminar.addEventListener('click', eliminarTarea);

    botonesContainer.appendChild(editar);
    botonesContainer.appendChild(eliminar);
    tarea.appendChild(botonesContainer);

    listaTareas.prepend(tarea);
    event.target.reset();
}

const editarTarea = event => {
    event.stopPropagation();

    const tarea = event.target.closest('section');
    const textoActual = tarea.childNodes[0].textContent;

    const inputEdicion = document.createElement('input');
    inputEdicion.type = 'text';
    inputEdicion.value = textoActual;
    inputEdicion.classList.add('inputEdicion');
    inputEdicion.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            tarea.childNodes[0].textContent = e.target.value;
            tarea.removeChild(inputEdicion);
        }
    });

    tarea.replaceChild(inputEdicion, tarea.childNodes[0]);
    inputEdicion.focus();
}

const cambiarEstadoTarea = event => {
    event.target.classList.toggle('hecho');
}

const eliminarTarea = event => {
    const tarea = event.target.parentElement;
    listaTareas.removeChild(tarea);
};

const order = () => {
    const hecho = [];
    const porHacer = [];
    listaTareas.childNodes.forEach(elemento => {
        elemento.classList.contains('hecho') ? hecho.push(elemento) : porHacer.push(elemento);
    });
    return [...porHacer, ...hecho];
}

const ordenarTareas = () => {
    order().forEach(elemento => listaTareas.appendChild(elemento));
}

mostrarFecha();
