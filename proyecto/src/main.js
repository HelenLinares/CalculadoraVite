const pantalla = document.getElementById("pantalla");

function agregar(valor) {
    pantalla.value += valor;
}

function limpiar() {
    pantalla.value = "";
}

function borrar() {
    pantalla.value = pantalla.value.slice(0, -1);
}

function calcular() {
    try {
        // Reemplazar símbolos visuales por operadores matemáticos
        let expresion = pantalla.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        
        // Evaluar la expresión
        pantalla.value = eval(expresion);
    } catch {
        pantalla.value = "Error";
    }
}

// Configurar event listeners para los botones
document.addEventListener('DOMContentLoaded', function() {
    const botones = document.getElementById('botones');
    
    botones.addEventListener('click', function(e) {
        if (e.target.matches('button')) {
            const action = e.target.dataset.action;
            const value = e.target.dataset.value;
            
            if (action === 'clear') {
                limpiar();
            } else if (action === 'del') {
                borrar();
            } else if (action === 'equals') {
                calcular();
            } else if (value) {
                agregar(value);
            }
        }
    });
});

// Soporte para teclado
document.addEventListener('keydown', function(e) {
    const key = e.key;
    
    if (/[0-9]|\.|\+|\-|\*|\//.test(key)) {
        agregar(key);
    } else if (key === 'Enter') {
        calcular();
    } else if (key === 'Backspace') {
        e.preventDefault();
        borrar();
    } else if (key === 'Escape') {
        limpiar();
    }
});

// No necesitas esta función para la calculadora, puedes eliminarla
// export function setupCounter(element) {
//   let counter = 0
//   const setCounter = (count) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }