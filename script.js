let bancoPreguntas = [];
let indiceActual = 0;

async function init() {
    const res = await fetch('preguntas.json');
    bancoPreguntas = await res.json();
    renderizarPregunta();
}

function renderizarPregunta() {
    const p = bancoPreguntas[indiceActual];
    document.getElementById('categoria').innerText = p.c;
    document.getElementById('pregunta').innerText = p.p;
    document.getElementById('feedback').style.display = 'none';
    
    const divOpciones = document.getElementById('opciones');
    divOpciones.innerHTML = ''; // Limpiar opciones anteriores

    p.o.forEach((opcion, index) => {
        const btn = document.createElement('button');
        btn.innerText = opcion;
        btn.className = 'btn-opcion';
        btn.onclick = () => verificarRespuesta(index);
        divOpciones.appendChild(btn);
    });
}

function verificarRespuesta(indexElegido) {
    const p = bancoPreguntas[indiceActual];
    const feedback = document.getElementById('mensaje-resultado');
    
    if (indexElegido === p.r) {
        feedback.innerText = "✅ ¡Correcto!";
    } else {
        feedback.innerText = `❌ Incorrecto. La respuesta era: ${p.o[p.r]}`;
    }
    
    document.getElementById('feedback').style.display = 'block';
    // Deshabilitar botones para que no cambien la respuesta
    document.querySelectorAll('.btn-opcion').forEach(b => b.disabled = true);
}

function siguientePregunta() {
    indiceActual = (indiceActual + 1) % bancoPreguntas.length;
    renderizarPregunta();
}

init();
