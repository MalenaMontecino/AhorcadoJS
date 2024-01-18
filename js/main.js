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
document.getElementById('contadorErrores').innerHTML = "Nº de errores: 0";

// LLAMADA A FUNCIONES
crearArrayPalabras();
seleccionarPalabraRandom(arrayPalabras);
crearGuionesPalabra(palabraSeleccionada);
imagenDibujo();
crearBotones();

//FUNCIONES
function crearArrayPalabras() {
    arrayPalabras = ['globo', 'mapa', 'viaje', 'mar', 'tierra',
        'avion', 'pais', 'ruta', 'continente', 'oceano',
        'montaña', 'desierto', 'selva', 'barco', 'cuidad',
        'cultura', 'idioma', 'explorador', 'aventura', 'maleta',
        'visado', 'brujula', 'hemisferio', 'polo', 'safari',
        'faro', 'tradicion', 'monumento', 'isla', 'puente',
        'calle', 'mercado', 'playa', 'rio', 'piramide'];
}

function seleccionarPalabraRandom(arrayPalabras) {
    //generar un numero random del 0 al 34
    numeroRandom = Math.floor(Math.random() * 34);
    console.log(numeroRandom);

    // sacar palabra de la array   
    palabraSeleccionada = arrayPalabras[numeroRandom]
    console.log(palabraSeleccionada)

}

function crearGuionesPalabra(palabraSeleccionada) {
    //contar cuantas letras tiene
    longitudPalabra = palabraSeleccionada.length;
    console.log(longitudPalabra);

    //mostrar tantos guiones como letras
    for (let i = 0; i < longitudPalabra; i++) {

        guion = document.createElement('p');
        guion.textContent = "_";
        guion.style.display = 'inline';
        guion.style.padding = '5px';
        guion.style.fontSize = '100px';

        // Añadir el elemento de imagen al contenedor en el DOM
        let contenedorGuion = document.getElementById("contenedor-guion");
        // contenedorGuion.style.height = '120px'; 
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

            };
        })(letraActual, boton));

        boton.addEventListener("click", (function (letraClickeada, botonClickeado) {
            return function () {
                console.log("Letra seleccionada: " + letraClickeada);
                comprobarLetraDentroPalabra(letraClickeada, botonClickeado);
                printErrores(letraCorrecta);
            };
        })(letraActual, boton));


        // Agregar el botón al contenedor
        contenedorBotones.appendChild(boton);
    }

}

function comprobarLetraDentroPalabra(letraClickeada, botonClickeado) {
    let letras = palabraSeleccionada.split('');
    letraCorrecta = false;
    console.log(letras);
    console.log(letraClickeada.toLowerCase());
    // letraClickeada.style.marginTop= "16px";

    for (let i = 0; i < letras.length; i++) {
        if (letraClickeada.toLowerCase() == letras[i]) {
            letraCorrecta = true;
            //HACER QUE NO SE COMA EL MARGIN CUANDO SE COMPLETE LA PALABRA

            guiones[i].style.fontSize = "50px";
            guiones[i].textContent = letraClickeada;

        }
    }
    console.log(letraCorrecta);
    cambiarColorBotones(letraCorrecta, botonClickeado);
    
}



function cambiarColorBotones(letraCorrecta, botonClickeado) {
    botonClickeado.disabled = true;
    if (letraCorrecta == true) {
        botonClickeado.classList.remove("btn-light");
        botonClickeado.classList.add("btn-success");
    }
}
function printErrores(letraCorrecta) {
    if (!letraCorrecta) {
        errores++;

        console.log("Nº Errores: " + errores);
        document.getElementById('contadorErrores').innerHTML = "Nº de errores: " + errores;
        if (errores >= 10) {
            //PONER UN POP UP
            document.getElementById('contadorErrores').innerHTML = "HAS PERDIDO";
            popupFuncion('perder');
            errores = 9;

        }
        imagenDibujo();
    }
}


function popupFuncion(resultado) {
    //juegoEnCurso = false;

    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    const popupContent = document.getElementById('popupContent');

    if (resultado === 'ganar') {
        popupContent.innerHTML = document.getElementById('ganar').innerHTML;
    } else if (resultado === 'perder') {
        popupContent.innerHTML = document.getElementById('perder').innerHTML;
    }

    const botones = popupContent.querySelectorAll('button');
    botones.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const accion = event.target.getAttribute('data-action');
            if (accion === 'volver') {
                location.reload();
            } else if (accion === 'reiniciar') {
                location.reload();
            }
        });
    });
}

// Si esta seleccionada sacar posición y ponerla (poner botón en verde )
// si no esta seleccionada sumar un error y printear dibujo (poner boton en disabled)








