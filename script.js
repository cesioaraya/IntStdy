let bancoPreguntas = [];
let indiceActual = 0;

async function init() {
    try {
        console.log("Intentando cargar preguntas...");
        const res = await fetch('preguntas.json');
        
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        
        bancoPreguntas = await res.json();
        console.log("Preguntas cargadas con éxito:", bancoPreguntas);
        renderizarPregunta();
        
    } catch (error) {
        console.error("Error en la carga:", error);
        alert("¡Error al cargar el archivo! Revisa la consola (F12). Error: " + error.message);
        document.getElementById('categoria').innerText = "Error cargando archivo.";
    }
}

function renderizarPregunta() {
    const p = bancoPreguntas[indiceActual];
    // Asegúrate de que los elementos existan antes de modificar el innerText
    document.getElementById('categoria').innerText = p.c;
    document.getElementById('pregunta').innerText = p.p;
    
    const divOpciones = document.getElementById('opciones');
    divOpciones.innerHTML = ''; 

    p.o.forEach((opcion, index) => {
        const btn = document.createElement('button');
        btn.innerText = opcion;
        btn.className = 'btn-opcion';
        btn.onclick = () => verificarRespuesta(index);
        divOpciones.appendChild(btn);
    });
}

// ... resto de tus funciones verificarRespuesta y siguientePregunta ...

init();
