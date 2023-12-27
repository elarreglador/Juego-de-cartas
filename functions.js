//FILESYSTEM
//DEFINICIONES
let credito = document.getElementById("credito");
let apuesta = document.getElementById("apuesta");
let desplegable = document.getElementById("desplegable");
let btnApostar = document.getElementById("btnApostar");
let btnReset = document.getElementById("btnReset");
let notification = document.getElementById("notification");

let carta1 = document.getElementById("carta1");
let paloCarta1 = 0;
let carta2 = document.getElementById("carta2");
let paloCarta2 = 0;
let carta3 = document.getElementById("carta3");
let paloCarta3 = 0;
let carta4 = document.getElementById("carta4");
let paloCarta4 = 0;
let carta5 = document.getElementById("carta5");
let paloCarta5 = 0;
let carta6 = document.getElementById("carta6");
let paloCarta6 = 0;
let baraja = [paloCarta1, paloCarta2, paloCarta3, paloCarta4, paloCarta5, paloCarta6];
let imgCartas = [carta1, carta2, carta3, carta4, carta5, carta6];

let creditoValor = 100;

//MAIN
//Prepara el juego
muestraCredito(creditoValor);
apuesta.value = 100;
desplegableAdd("bastos");
desplegableAdd("copas");
desplegableAdd("espadas");
desplegableAdd("oros");
for (let i = 0; i < imgCartas.length; i++) {
    ocultarObjeto(imgCartas[i], true);
}

//LISTENERS
btnApostar.addEventListener('click', () => {
    if (apuesta.value < 100) {
        notificacion("La apuesta debe ser minimo 100");
        return;
    }
    if (parseInt(apuesta.value, 10) > creditoValor) {
        notificacion("Estas intentando apostar mas de lo que tienes.");
        return;
    }
    ocultarObjeto(apuesta, true);
    desplegable.disabled = true;
    asignaValorCartas();

    for (let i = 0; i < imgCartas.length; i++) {
        ocultarObjeto(imgCartas[i], false);
    }
})

btnReset.addEventListener('click', () => {
    creditoValor = 100;
    muestraCredito(creditoValor);
    ocultarObjeto(apuesta, false);
    desplegable.disabled = false;
    cartasBocaAbajo();

})

carta1.addEventListener('click', () => {
    carta1.src = "./img/" + baraja[0] + ".png";
    setTimeout(() => {     // Esperar 100 milisegundos a que la carta cambie src
        if (todasBocaArriba()) {
            esVictoria();
        }
    }, 100);
})

carta2.addEventListener('click', () => {
    carta2.src = "./img/" + baraja[1] + ".png";
    setTimeout(() => {     // Esperar 100 milisegundos a que la carta cambie src
        if (todasBocaArriba()) {
            esVictoria();
        }
    }, 100);
})

carta3.addEventListener('click', () => {
    carta3.src = "./img/" + baraja[2] + ".png";
    setTimeout(() => {     // Esperar 100 milisegundos a que la carta cambie src
        if (todasBocaArriba()) {
            esVictoria();
        }
    }, 100);
})

carta4.addEventListener('click', () => {
    carta4.src = "./img/" + baraja[3] + ".png";
    setTimeout(() => {     // Esperar 100 milisegundos a que la carta cambie src
        if (todasBocaArriba()) {
            esVictoria();
        }
    }, 100);
})

carta5.addEventListener('click', () => {
    carta5.src = "./img/" + baraja[4] + ".png";
    setTimeout(() => {     // Esperar 100 milisegundos a que la carta cambie src
        if (todasBocaArriba()) {
            esVictoria();
        }
    }, 100);
})

carta6.addEventListener('click', () => {
    carta6.src = "./img/" + baraja[5] + ".png";
    setTimeout(() => {     // Esperar 100 milisegundos a que la carta cambie src
        if (todasBocaArriba()) {
            esVictoria();
        }
    }, 100);
})

//FUNCIONES
function asignaValorCartas() {
    //Asigna el valor de cada carta
    for (let i = 0; i < baraja.length; i++) {
        baraja[i] = num2Palo(rnd(4));
    }
}

function cartasBocaAbajo() {
    for (let i = 0; i < imgCartas.length; i++) {
        imgCartas[i].src = "./img/dorso.png";
    }
}

//agregar varlores al desplegable ordenados alfabeticamente
function desplegableAdd(texto) {
    let opcion = document.createElement("option");
    opcion.text = texto;
    let totalOpciones = desplegable.options.length;
    // Recorre opciones y busca posición adecuada para la nueva opción
    for (let i = 0; i < totalOpciones; i++) {
        if (texto < desplegable.options[i].text) {
            desplegable.add(opcion, i);
            return; // Sal del bucle
        }
    }
    // Si la nueva opción debe ir al final
    desplegable.add(opcion);
}

function esVictoria() {
    let miApuesta = desplegable.value;
    let exitos = 0;

    //iteramos sobre las cartas
    for (let i = 0; i < baraja.length; i++) {
        if (miApuesta == baraja[i]) {
            exitos++
        }
    }
    if (exitos > 1) {
        notificacion("Enhorabuena, has ganado con " + exitos + " aciertos.");
        creditoValor = creditoValor + parseInt(apuesta.value, 10);
    } else {
        notificacion(exitos + " acierto(s). Mala suerte, otra vez sera.")
        creditoValor = creditoValor - parseInt(apuesta.value, 10);
    }
    muestraCredito(creditoValor);
    ocultarObjeto(apuesta, false);
    desplegable.disabled = false;
    cartasBocaAbajo();
    for (let i = 0; i < imgCartas.length; i++) {
        ocultarObjeto(imgCartas[i], true);
    }
    if (creditoValor<100){
        notificacion("La banca siempre gana jajajajajjaaja!");
    }
}

function muestraCredito(valor) {
    credito.innerHTML = valor;
}

function num2Palo(num) {
    if (num == 1) {
        return "bastos";
    } else if (num == 2) {
        return "copas";
    } else if (num == 3) {
        return "espadas";
    } else if (num == 4) {
        return "oros";
    } else {
        console.log("parametro de num2Palo() no valida: " + num);
        return "ERROR";
    }
}

function notificacion(mensaje) {
    alert(mensaje);
}

function ocultarObjeto(objeto, booleano) {
    if (booleano == true) {
        objeto.style.visibility = "hidden";
    } else {
        objeto.style.visibility = "visible";
    }
}

function rnd(max) {
    //0 no es una respuesta valida
    return Math.floor(Math.random() * max) + 1;
}

function todasBocaArriba() {
    // Verificar si todas las cartas están boca arriba
    for (let i = 0; i < imgCartas.length; i++) {
        if (imgCartas[i].src.indexOf("/img/dorso.png") !== -1) {
            return false; // Al menos una carta está boca abajo
        }
    }
    return true;
}
