//DECLARACIÓN DE VARIABLES
const nombreSerie = document.querySelector(".nombreSerie");
const pasar = document.querySelector(".pasar");
const progressBar = document.querySelector(".progress-bar");
const foto1 = document.querySelector(".foto1");
const foto2 = document.querySelector(".foto2");
const foto3 = document.querySelector(".foto3");
const reloj = document.querySelector(".reloj");
const mensaje = document.querySelector(".mensaje");

//Num y Aciertos van a ser variables globales
let num = 0;
let aciertos = 0;

//Minutos y segundos también
let minutos = 2;
let segundos = 30;
const tiempoTotal = 150;

const mensajesError = [
  "KIIII",
  "KE DISE",
  "NUNCA TUVISTE TELE NO?",
  "ÑE ÑE ÑE",
  "ÑOP",
  "NO SABE LERO LERO",
  "JAJAJA",
  "CAMBIALE MARGE",
];
const mensajeCorrecto = [
  "ERA MUY FACIL",
  "BIEEEN",
  "100 PUNTOS PARA GRYFFINDOR",
  "BUEH, MÁS FÁCIL IMPOSIBLE",
  "CORRRECTOO",
  "TREMENDO",
  "GOLAZO",
];

const series = [
  { nombre: "friends", adivinada: false, titulos: ["friends", "amigos"] },
  { nombre: "futurama", adivinada: false, titulos: ["futurama"] },
  { nombre: "lost", adivinada: false, titulos: ["lost", "perdidos"] },
  {
    nombre: "office",
    adivinada: false,
    titulos: ["the office", "office", "ofice"],
  },
  { nombre: "heroes", adivinada: false, titulos: ["heroes"] },
  {
    nombre: "24",
    adivinada: false,
    titulos: ["24", "veinticuatro", "twenty four"],
  },
  { nombre: "30rock", adivinada: false, titulos: ["30 rock", "30rock"] },
  {
    nombre: "bigbang",
    adivinada: false,
    titulos: ["the big bang theory", "big bang", "big bang theory", "tbbt"],
  },
  {
    nombre: "bob",
    adivinada: false,
    titulos: ["bob esponja", "bob", "spongebob", "spongebob squarepants"],
  },
  {
    nombre: "breaking",
    adivinada: false,
    titulos: ["breaking bad", "bb", "breaking"],
  },
  {
    nombre: "got",
    adivinada: false,
    titulos: ["juego de tronos", "got", "game of thrones"],
  },
  {
    nombre: "stranger",
    adivinada: false,
    titulos: ["stranger things", "stranger"],
  },
  { nombre: "true", adivinada: false, titulos: ["true detective"] },
  {
    nombre: "sherlock",
    adivinada: false,
    titulos: ["sherlock", "sherlock holmes"],
  },
  { nombre: "vikings", adivinada: false, titulos: ["vikings", "vikingos"] },
  { nombre: "madmen", adivinada: false, titulos: ["mad men", "madmen"] },
  {
    nombre: "cards",
    adivinada: false,
    titulos: ["house of cards", "cards", "hoc"],
  },
  {
    nombre: "parks",
    adivinada: false,
    titulos: ["parks and recreation", "parks", "parks&recreation", "p&r"],
  },
  {
    nombre: "family",
    adivinada: false,
    titulos: ["family guy", "padre de familia"],
  },
  { nombre: "scrubs", adivinada: false, titulos: ["scrubs"] },
];

//*****EVENT LISTENERS

//Evento principal, que es el 'change' (como el submit) del input
nombreSerie.addEventListener("change", function (e) {
  e.preventDefault();
  //LLAMO A LA FUNCION 'JUEGO' Y LE PASO EL VALUE DEL INPUT
  juego(e.target.value);
  e.target.value = "";
  if (screen.width < 700) {
    nombreSerie.blur();
  } else {
    nombreSerie.focus();
  }
});

//Evento del botón pasar, se pasa a la siguiente serie que no fue adivinada
pasar.addEventListener("click", function (e) {
  e.preventDefault();
  pasarSerie();
});

//******FUNCIONES

//Función que bloquea el boton "pasar" en caso de que falte adivinar solo 1
function bloquear() {
  pasar.classList = "btn btn-danger disabled";
  pasar.innerHTML = "es la ultima!";
  pasar.setAttribute("disabled", "");
}

function accionBarra(minutos, segundos) {
  //por las dudas, hago un parse a los minutos y segundos, porque en el conteo no lo hago
  minutos = parseInt(minutos);
  segundos = parseInt(segundos);
  //traigo los minutos que serán el 100%, depende en qué timer esté parado
  //hago un total de segundos del contador actual de tiempo
  minutos *= 60;
  minutos += segundos;
  //con x, saco el porcentaje de lo que realmente va de tiempo
  if (minutos == 60) {
    progressBar.classList = "progress-bar bg-warning";
  } else if (minutos == 30) {
    progressBar.classList = "progress-bar bg-danger";
  }
  let x = (minutos * 100) / tiempoTotal;
  //aplico ese porcentaje al width de la barra
  progressBar.style.width = `${x}%`;
}

function tiempo() {
  let intervalo = setInterval(() => {
    if (minutos == 0 && segundos == 0) {
      clearInterval(intervalo);
      finDelJuego();
    } else if (segundos == 0) {
      --minutos;
      segundos = 59;
    } else {
      --segundos;
    }
    let sec = segundos > 9 ? `${segundos}` : `0${segundos}`;
    accionBarra(minutos, segundos);
    reloj.innerHTML = `0${minutos}:${sec}`;
  }, 1000);
}

//FALTA LA FUNCION DEL TIEMPO
// function consola() {
//   console.log("Hola " + num++);
//   if (num == 5) {
//     clearInterval(intervalo);
//     num = 15;
//     intervalo = setInterval(consola, 2000);
//   }
// }

//Esta serie es llamada ni bien empieza el juego, ya que posiciona la primer serie sin adivinar, es decir, la primera de todas
function pasarSerie() {
  //El primer if, detecta que si sólo falta adivinar 1 serie, bloquea el botón "pasar"
  if (aciertos + 1 == series.length) {
    bloquear();
  }
  //Si hay series por adivinar...
  if (aciertos < series.length) {
    //Se hace un while, que busca la primera serie que posicione 'num' sin adivinarse
    while (series[num].adivinada != false) {
      num++;
      //si 'num' llega a 20, vuelve a 0
      if (num > 19) num = 0;
    }
    //Cuando se encontró la primera serie sin adivinar, se ponen sus fotos en pantalla
    foto1.style = `background-image: url("/img/${series[num].nombre}1.jpg");`;
    foto2.style = `background-image: url("/img/${series[num].nombre}2.jpg");`;
    foto3.style = `background-image: url("/img/${series[num].nombre}3.jpg");`;
    num++;
    if (num > 19) num = 0;
  }
}

function juego(nombre) {
  // console.log(num);
  let flag;
  if (aciertos < series.length) {
    nombre = nombre.trim().toLowerCase();
    //IMPORTANTE: NUM SIEMPRE VIENE ADELANTADO EN 1. SI ESTÁ EN 0, YA DIO UNA VUELTA, Y YO NECESITO EL 4.
    let vuelta = num > 0 ? num - 1 : 19;
    console.log("vuelta:" + vuelta);
    for (let index = 0; index < series[vuelta].titulos.length; index++) {
      if (nombre == series[vuelta].titulos[index]) {
        flag = true;
        break;
      }
    }
    if (flag) {
      let num = Math.floor(Math.random() * mensajeCorrecto.length);
      let msj = mensajeCorrecto[num];
      mensaje.innerHTML = msj;
      mensaje.classList = "mensaje text-center mensajeVerde";
      setTimeout(function () {
        mensaje.classList = "mensaje text-center";
      }, 1500);
      series[vuelta].adivinada = true;
      aciertos++;
      console.log("aciertos: " + aciertos);
      console.log(series);
      pasarSerie();
    } else {
      let num = Math.floor(Math.random() * mensajesError.length);
      let msj = mensajesError[num];
      mensaje.innerHTML = msj;
      mensaje.classList = "mensaje text-center mensajeRojo";
      setTimeout(function () {
        mensaje.classList = "mensaje text-center";
      }, 1500);
    }
  }

  if (aciertos == series.length) {
    finDelJuego();
  }
}

function finDelJuego() {
  localStorage.setItem("resultados", JSON.stringify(series));
  window.open("resultado.html", "_self");
}

//******CUANDO SE CARGA LA PÁGINA
localStorage.clear();
tiempo();
pasarSerie();
document.onload = funcFocus();

function funcFocus() {
  if (screen.width < 700) {
    nombreSerie.blur();
  } else {
    nombreSerie.focus();
  }
}

// setTimeout(function () {
//   finDelJuego();
// }, 8000);
