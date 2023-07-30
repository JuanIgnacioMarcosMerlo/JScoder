let display = document.getElementById("display");
let operador = "";
let numeros = [];
let totalResultado = 0;
const historyModal = document.getElementById("historyModal");
const operationHistory = document.getElementById("operationHistory");
const finalResultDisplay = document.getElementById("finalResult");
const operacionesRealizadas = [];



window.addEventListener('load', function() {
    let resultadoGuardado = localStorage.getItem('resultado');
    if (resultadoGuardado) {
        let resultadoObj = JSON.parse(resultadoGuardado);
        display.value = resultadoObj.valor;
    }
});

function openModal() {
    historyModal.style.display = "block";
}
function closeModal() {
    historyModal.style.display = "none";
}

const historyBtn = document.createElement("button");
historyBtn.id = "historyBtn";
historyBtn.textContent = "Ver Historial";
historyBtn.onclick = openModal;
document.body.appendChild(historyBtn);



function agregarOperacionAlHistorial(operacion) {
    let li = document.createElement("li");
    li.textContent = operacion;
    li.onclick = function() {
        const index = Array.from(operationHistory.childNodes).indexOf(li);
        eliminarOperacion(index);
    };
    operationHistory.appendChild(li);
    
    let valorOperacion = eval(operacion);
    operacionesRealizadas.push({ operacion, valorOperacion });

    totalResultado += valorOperacion;
    finalResultDisplay.textContent = totalResultado;
}

function eliminarOperacion(index) {
    if (index >= 0 && index < numeros.length) {
        operationHistory.removeChild(operationHistory.childNodes[index]);
        let operacionEliminar = numeros[index];
        if (index > 0) {
            operacionEliminar = `${numeros[index - 1]} ${operador} ${numeros[index]}`;
        }
        let valorEliminar = eval(operacionEliminar);
        totalResultado -= valorEliminar;
        finalResultDisplay.textContent = totalResultado;
        numeros.splice(index - 1, 2);
    }
}

function eliminarOperacion(index) {
    if (index >= 0 && index < operacionesRealizadas.length) {
        operationHistory.removeChild(operationHistory.childNodes[index]);
        let valorEliminar = operacionesRealizadas[index].valorOperacion;
        totalResultado -= valorEliminar;
        finalResultDisplay.textContent = totalResultado;
        operacionesRealizadas.splice(index, 1);
    }
}



function agregarNumero(numero) {
    display.value += numero;
}
function borrarUltimoCaracter() {
    let valorActual = display.value;
    display.value = valorActual.slice(0, -1);
}

function agregarOperador(op) {
    operador = op;
    numeros.push(parseFloat(display.value));
    display.value = "";
}

function calcular() {
    numeros.push(parseFloat(display.value));

    let resultado;
    switch (operador) {
        case "+":
            resultado = sumar();
            break;
        case "-":
            resultado = restar();
            break;
        case "*":
            resultado = multiplicar();
            break;
        case "/":
            resultado = dividir();
            break;
            case "^":
            resultado = potencia();
            break;
        default:
            alert("Operador inválido.");
            return;
        }
        agregarOperacionAlHistorial(numeros.join(` ${operador} `));
        display.value = resultado;
        operador = "";
        numeros = [];
        let resultadoObj = { valor: resultado };
        localStorage.setItem('resultado', JSON.stringify(resultadoObj));
}


// mis funciones

function sumar() {
    let total = 0;
    for (let i = 0; i < numeros.length; i++) {
        total += numeros[i];
    }
    return total;
}

function restar() {
    let total = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
        total -= numeros[i];
    }
    return total;
}

function multiplicar() {
    let total = 1;
    for (let i = 0; i < numeros.length; i++) {
        total *= numeros[i];
    }
    return total;
}

function dividir() {
    let total = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] !== 0) {
            total /= numeros[i];
        } else {
            alert("División entre cero no está permitida.");
            return;
        }
    }
    return total;
}

function agregarDecimal() {
    if (!display.value.includes('.')) {
        display.value += '.';
    }
}

function potencia() {
    let base = numeros[0];
    let exponente = numeros[1];
    return Math.pow(base, exponente);
}

function resetearModal() {
    while (operationHistory.firstChild) {
        operationHistory.removeChild(operationHistory.firstChild);
    }
    totalResultado = 0;
    finalResultDisplay.textContent = totalResultado;
    operacionesRealizadas.length = 0;
}

function borrar() {
    display.value = "";
    operador = "";
    numeros = [];

    resetearModal();
}


//eventos de teclado


let altGrKeyPressed = false;

  document.addEventListener("keydown", function(e) {
    let tecla = e.key;
  
    if (e.altKey && tecla === "Control") {
        altGrKeyPressed = true;
    }


    if (!isNaN(tecla)) {
        agregarNumero(tecla);
    } else if (tecla === "+" || tecla === "-" || tecla === "*" || tecla === "/") {
        agregarOperador(tecla);
    } else if (tecla === "Enter" || tecla === "Intro") {
        calcular();
    } else if (tecla === ".") {
        agregarDecimal();
    } else if (tecla === "Escape") {
        borrar();
    } else if (tecla === "Backspace") {
        borrarUltimoCaracter();
    } else if (tecla === "e") {
        display.value = Math.E;
    } else if (tecla === "p") {
        display.value = Math.PI;
    } else if (altGrKeyPressed && tecla === "^") {
        agregarOperador("^");
    }
});

document.addEventListener("keyup", function(e) {
    if (e.key === "Control") {
        altGrKeyPressed = false;
    }
});



