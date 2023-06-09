let display = document.getElementById("display");
let operador = "";
let numeros = [];

window.addEventListener('load', function() {
    let resultadoGuardado = localStorage.getItem('resultado');
    if (resultadoGuardado) {
        let resultadoObj = JSON.parse(resultadoGuardado);
        display.value = resultadoObj.valor;
    }
});

function agregarNumero(numero) {
    display.value += numero;
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
        display.value = resultado;
        operador = "";
        numeros = [];
        let resultadoObj = { valor: resultado };
        localStorage.setItem('resultado', JSON.stringify(resultadoObj));
}


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


function borrar() {
    display.value = "";
    operador = "";
    numeros = [];
}



document.addEventListener("keydown", function(event) {
    let tecla = event.key;
  
    if (!isNaN(tecla)) {
      agregarNumero(tecla);
    } else if (tecla === "+" || tecla === "-" || tecla === "*" || tecla === "/") {
      agregarOperador(tecla);
    } else if (tecla === "Enter" || "intro") {
      calcular();
    } else if (tecla === "Backspace") {
      borrar();
    }
  });


