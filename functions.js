//FILESYSTEM
//DEFINICIONES
let bolsa = document.getElementById("bolsa");
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

bolsa = 100;

//MAIN
//Prepara el juego
muestraBolsa();
apuesta.value = 100;
desplegableAdd("bastos");
desplegableAdd("copas");
desplegableAdd("espadas");
desplegableAdd("oros");
for (let i = 0; i < imgCartas.length; i++) {
    ocultarObjeto(imgCartas[i],true);
}

//LISTENERS
btnApostar.addEventListener('click', () => {
    //notificacion(apuesta.value);
    if (apuesta.value < 100) {
        notificacion("La apuesta debe ser minimo 100");
        return;
    }
    ocultarObjeto(apuesta, true);
    desplegable.disabled = true;
    asignaValorCartas();
    
    for (let i = 0; i < imgCartas.length; i++) {
        ocultarObjeto(imgCartas[i],false);
    }
})

btnReset.addEventListener('click', () => {
    bolsa = 100;
})

carta1.addEventListener('click', () => {
    carta1.src = "./img/" + paloCarta1 + ".png";
    if (todasBocaArriba()) {
        esVictoria();
    }
})

carta2.addEventListener('click', () => {
    carta2.src = "./img/" + paloCarta2 + ".png";
    if (todasBocaArriba()) {
        esVictoria();
    }
})

carta3.addEventListener('click', () => {
    carta3.src = "./img/" + paloCarta3 + ".png";
    if (todasBocaArriba()) {
        esVictoria();
    }
})

carta4.addEventListener('click', () => {
    carta4.src = "./img/" + paloCarta4 + ".png";
    if (todasBocaArriba()) {
        esVictoria();
    }
})

carta5.addEventListener('click', () => {
    carta5.src = "./img/" + paloCarta5 + ".png";
    if (todasBocaArriba()) {
        esVictoria();
    }
})

carta6.addEventListener('click', () => {
    carta6.src = "./img/" + paloCarta6 + ".png";
    if (todasBocaArriba()) {
        esVictoria();
    }
})

//FUNCIONES
function asignaValorCartas() {
    //Asigna el valor de cada carta
    paloCarta1 = num2Palo(rnd(4));
    paloCarta2 = num2Palo(rnd(4));
    paloCarta3 = num2Palo(rnd(4));
    paloCarta4 = num2Palo(rnd(4));
    paloCarta5 = num2Palo(rnd(4));
    paloCarta6 = num2Palo(rnd(4));
    baraja = [paloCarta1, paloCarta2, paloCarta3, paloCarta4, paloCarta5, paloCarta6];
}

function cartasBocaAbajo(){
    for (let i=0; i<imgCartas.length; i++){
        imgCartas[i].src="./img/dorso.png";
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
        //notificacion(miApuesta + " Vs " + baraja[i]);
        if (miApuesta == baraja[i]) {
            exitos++
        }
    }
    if (exitos > 1) {
        notificacion("Enhorabuena, has ganado con " + exitos + " aciertos.");
        bolsa = bolsa + apuesta.value;
    } else {
        notificacion(exitos + " acierto(s). Mala suerte, otra vez sera. La banca siempre gana jajajajajjaaja!")
        bolsa = bolsa - apuesta;
    }
    muestraBolsa();
    ocultarObjeto(apuesta, false);
    desplegable.disabled = false;
}

function muestraBolsa() {
    bolsa.innerHTML = "CREDITO: " + bolsa;
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
