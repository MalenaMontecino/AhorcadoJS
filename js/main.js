//VARIABLES
let arrayPalabras;
let numeroRandom;
let palabraSeleccionada;
let longitudPalabra;
let imagenesLetras = {}; //no es array, es objeto (para asociar directamente con la letra)
let boton;
let letraActual;
let guion;
let guiones = [];
let letraCorrecta;
let errores = 0;
let temporizador;
//document.getElementById('contadorErrores').innerHTML = "Nº de errores: 0";

// LLAMADA A FUNCIONES
crearArrayPalabras();
seleccionarPalabraRandom(arrayPalabras);
crearGuionesPalabra(palabraSeleccionada);
imagenDibujo();
crearBotones();
timer();

//FUNCIONES
function crearArrayPalabras() {
    arrayPalabras = {
        "Países": ["inglaterra", "francia", "italia", "china", "mexico", "japon", "australia", "brasil", "canada", "egipto", "rusia", "india", "argentina"],
        "Transporte": ["avion", "barco", "tren", "bicicleta", "coche", "camion", "helicoptero", "autobus"],
        "Cultura": ["traje", "idioma", "costumbre", "baile", "comida", "festividad", "mito", "religion", "creencias", "leyendas"]
    }

}
// function timer() {

//     let tiempoTranscurrido = 0;
//     let minutos = 0;

//     temporizador = setInterval(() => {
//         tiempoTranscurrido++;
//         if (tiempoTranscurrido == 60){
//             tiempoTranscurrido = 0;
//             minutos =+1;
//         }
//         document.getElementById('timer').innerHTML = "Tiempo ["+ minutos+ ":" + tiempoTranscurrido + " segundos  ]";
//     }, 1000);
// }
function timer() {
    let tiempoTranscurrido = 0;
    let minutos = 0;

    temporizador = setInterval(() => {
        tiempoTranscurrido++;

        if (tiempoTranscurrido == 60) {
            tiempoTranscurrido = 0;
            minutos++;
        }

        //PARA EL FORMATO 00:00
       // verifica si la variable minutos es menor que 10. 
       //Si es verdadero, se concatena el string "0" con la variable minutos ("0" + minutos), lo que añade un cero a la izquierda.
        let minutosFormateados = minutos < 10 ? "0" + minutos : minutos;
        let segundosFormateados = tiempoTranscurrido < 10 ? "0" + tiempoTranscurrido : tiempoTranscurrido;

        document.getElementById('timer').innerHTML = "Tiempo [" + minutosFormateados + ":" + segundosFormateados + "]";
    }, 1000);
}

function seleccionarPalabraRandom(arrayPalabras) {
    // Obtener una categoría aleatoria
    const categorias = Object.keys(arrayPalabras);
    const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];

    // Obtener la lista de palabras de la categoría seleccionada
    const palabrasCategoria = arrayPalabras[categoriaAleatoria];

    // Generar un número aleatorio para seleccionar una palabra de la categoría
    numeroRandom = Math.floor(Math.random() * palabrasCategoria.length);

    // Obtener la palabra seleccionada
    palabraSeleccionada = palabrasCategoria[numeroRandom];
    document.getElementById('categoria').innerHTML = "<strong>Categoría: </strong>" + categoriaAleatoria;
}


function crearGuionesPalabra(palabraSeleccionada) {
    //contar cuantas letras tiene
    longitudPalabra = palabraSeleccionada.length;
    console.log("Longitud palabra: " + longitudPalabra);

    //mostrar tantos guiones como letras
    for (let i = 0; i < longitudPalabra; i++) {

        guion = document.createElement('p');

        guion.textContent = "_";
        guion.style.display = 'inline';
        guion.style.padding = '5px';
        guion.style.fontSize = '100px';

        // Añadir el elemento de imagen al contenedor en el DOM
        let contenedorGuion = document.getElementById("contenedor-guion");

        contenedorGuion.style.height = '142.8px';

        contenedorGuion.appendChild(guion);
        guiones.push(guion);
    }


}

function imagenDibujo() {
    // let imagenDibujo = document.createElement("img");
    let imagenDibujo = document.querySelector("#contenedor-imagen-dibujo img");
    imagenDibujo.src = `/images/${errores}.png`;

    let contenedorImagenDibujo = document.getElementById("contenedor-imagen-dibujo");
    contenedorImagenDibujo.appendChild(imagenDibujo);

}



function crearBotones() {
    // Obtener el contenedor de botones
    let contenedorBotones = document.getElementById("contenedor-botones");

    // Crear botones para cada letra del abecedario
    for (let letra = 65; letra <= 90; letra++) { //Código ACII de las letras
        letraActual = String.fromCharCode(letra); // Pasar el código a letra

        //Botón y estilos
        boton = document.createElement("button");
        boton.type = "button";
        boton.classList.add("btn", "btn-light");
        boton.textContent = letraActual;
        boton.style.fontSize = "30px";
        boton.style.width = "50px";
        boton.style.margin = "5px"; // Agregar margen entre botones

        // función externa porque al estar dentro del bucle siempre recordará la última letra creada (Z)
        //USO DE E.TARGET

        boton.addEventListener("click", (function (letraClickeada, botonClickeado) {
            return function () {
                console.log("Letra seleccionada: " + letraClickeada);
                comprobarLetraDentroPalabra(letraClickeada, botonClickeado);
                printErrores(letraCorrecta);
                comprobarVictoria();
            };
        })(letraActual, boton));


        // Agregar el botón al contenedor
        contenedorBotones.appendChild(boton);
    }

}

function comprobarLetraDentroPalabra(letraClickeada, botonClickeado) {
    let letras = palabraSeleccionada.split('');
    letraCorrecta = false;
    console.log("Letras: " + letras);
    console.log("Botón: " + letraClickeada.toLowerCase());
    // letraClickeada.style.marginTop= "16px";

    for (let i = 0; i < letras.length; i++) {
        if (letraClickeada.toLowerCase() == letras[i]) {
            letraCorrecta = true;
            //HACER QUE NO SE COMA EL MARGIN CUANDO SE COMPLETE LA PALABRA

            guiones[i].style.fontSize = "50px";
            guiones[i].textContent = letraClickeada;
            //guiones[i].style.alignItems = 'flex-end'; NO FUNCIONA

        }
    }
    console.log("Letra correcta: " + letraCorrecta);
    cambiarColorBotones(letraCorrecta, botonClickeado);

    //FUNCION COMPROBAR VICTORIA

}

function comprobarVictoria() {
    let ganar = true;
    for (let i = 0; i < guiones.length; i++) {
        if (guiones[i].textContent === "_") {
            ganar = false;
        }


    }
    if (ganar == true) {
        console.log("Has ganado");
        //PONER AQUÍ POPUP
       // popupFuncion('ganar');
    }
}

function cambiarColorBotones(letraCorrecta, botonClickeado) {
    botonClickeado.disabled = true;
    if (letraCorrecta == true) {
        botonClickeado.classList.remove("btn-light");
        botonClickeado.classList.add("btn-success");
    } else {
        botonClickeado.classList.remove("btn-light");
        botonClickeado.classList.add("btn-secondary");
    }
}
function printErrores(letraCorrecta) {
    if (!letraCorrecta) {
        errores++;

        console.log("Nº Errores: " + errores);
        //CREO QUE NO VOY A MOSTRAR LOS ERRORES 
        //  document.getElementById('contadorErrores').innerHTML = "Nº de errores: " + errores;
        if (errores >= 9) {
            //PONER UN POP UP
            // document.getElementById('contadorErrores').innerHTML = "HAS PERDIDO";
          //  popupFuncion('perder');
          console.log("Has perdido");
            errores = 9;
            popup(); 
        }
        imagenDibujo();
    }
}


//NO FUNCIONA

// function popupFuncion(resultado) {
//     //juegoEnCurso = false;
//     clearInterval(temporizador);
//     const popup = document.getElementById('popup');
//     popup.style.display = 'block';

//     const popupContent = document.getElementById('popup-content');
//     console.log("resultado",resultado);
//     if (resultado === 'ganar') {
//         popupContent.innerHTML = document.getElementById('ganar').innerHTML;
//     } else if (resultado === 'perder') {
//         popupContent.innerHTML = document.getElementById('perder').innerHTML;
//     }

//     const botones = popupContent.querySelectorAll('button');
//     botones.forEach((boton) => {
//         boton.addEventListener('click', (event) => {
//             const accion = event.target.getAttribute('data-action');
//             if (accion === 'volver') {
//                 location.reload();
//             } else if (accion === 'reiniciar') {
//                 location.reload();
//             }
//         });
//     });
// }



function createPopup(id) {
    let popupNode = document.querySelector(id);
    let overlay = popupNode.querySelector(".overlay");
    let closeBtn = popupNode.querySelector(".close-btn");

    function openPopup() {
        popupNode.classList.add("active");
    }

    function closePopup() {
        popupNode.classList.remove("active");
    }

    overlay.addEventListener("click", closePopup);
    closeBtn.addEventListener("click", closePopup);

    return openPopup;
}

let popup = createPopup("#popup");
 // Llama a la función openPopup directamente para que se abra el popup al cargar la página



