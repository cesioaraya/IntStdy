let bancoPreguntas = [];
let indiceActual = 0;
let progresos = JSON.parse(localStorage.getItem('estudio_cancilleria')) || {};

async function init() {
    const res = await fetch('preguntas.json');
    bancoPreguntas = await res.json();
    actualizarInterfaz();
}

function actualizarInterfaz() {
    const p = bancoPreguntas[indiceActual];
    document.getElementById('pregunta').innerText = p.p;
    document.getElementById('categoria').innerText = p.c;
    document.getElementById('respuesta').innerText = p.r;
    document.getElementById('respuesta-container').style.display = 'none';
    document.getElementById('btn-show').style.display = 'block';
    document.getElementById('count').innerText = Object.keys(progresos).length;
}

function mostrarRespuesta() {
    document.getElementById('respuesta-container').style.display = 'block';
    document.getElementById('btn-show').style.display = 'none';
}

function registrarResultado(acierto) {
    progresos[indiceActual] = acierto;
    localStorage.setItem('estudio_cancilleria', JSON.stringify(progresos));
    indiceActual = (indiceActual + 1) % bancoPreguntas.length;
    actualizarInterfaz();
}

init();
