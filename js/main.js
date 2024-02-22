
//VARIABLES
let arrayPalabras;
let numeroRandom;
let palabraSeleccionada = localStorage.getItem('palabraSeleccionada');
let palabraCategoria = localStorage.getItem('palabraCategoria');
let palabraDescripcion = localStorage.getItem('palabraDescripcion');;
let palabraImagen = localStorage.getItem('palabraImagen');
let longitudPalabra;
let imagenesLetras = {}; //no es array, es objeto (para asociar directamente con la letra)
let boton;
let letraActual;
let guion;
let guiones = [];
let letraCorrecta;
let errores = localStorage.getItem('errores');

let temporizador;
let tiempoTranscurrido;
let usuario;
let arrayLetrasClickadas =[];
let arrayLetrasCorrectas =[];
let arrayLetrasIncorrectas = [];
let letras;


//NO FUNCIONA:
// los errores
//el usuario


if(localStorage.getItem('arrayLetrasUsadas') == null  ){
// para empezar de 0
    crearArrayPalabras();
    seleccionarPalabraRandom(arrayPalabras);
    crearGuionesPalabra(palabraSeleccionada);

    errores = 0;
    localStorage.setItem('errores',0);
    console.log('partida nueva');
}else{
    //F5

  
    //si ya había una partida en marcha
    crearGuionesPalabra(localStorage.getItem('palabraSeleccionada')); //AQUI SE PUEDE CAMBIAR POR PALABRA SELECCIONADA DIRECTAMENTE AHORA NO?
    document.getElementById('categoria').innerHTML = "<strong>Categoría: </strong>" + palabraCategoria;
    usuario = localStorage.getItem('usuario');
    console.log('partida ya empezada');
  
    //cambiarColorBotones();
    
    // document.getElementById('index').style.display='none';
    // document.getElementById('juego').style.display='block';
}





imagenDibujo();
crearBotones();
actualizarLetrasUsadas();


function actualizarLetrasUsadas() {
    setTimeout(() => {
        let letrasCorrectas0 = localStorage.getItem('letrasCorrectas');
        //letrasCorrectas0 =letrasCorrectas0.split('');
    
        let letrasIncorrectas0 = localStorage.getItem('letrasIcorrectas');
       // letrasIcorrectas0 = letrasIncorrectas0.split('');
    
        let botones = document.querySelectorAll("button");
        botones.forEach(boton => {
          
            if (letrasCorrectas0.includes(boton.textContent)) {
                letraCorrecta = true;
                cambiarColorBotones(letraCorrecta, boton);
            } else if(letrasIncorrectas0.includes(boton.textContent)){
                letraCorrecta = false;
                cambiarColorBotones(letraCorrecta, boton);
            }
            
        });
    }, 1);
   
    // let letrasUsadas = localStorage.getItem('arrayLetrasUsadas');
    
    //     letrasUsadas = letrasUsadas.split(',');

    //     // Itera sobre los botones y actualiza su estado
    //     let botones = document.querySelectorAll("#contenedor-botones button");
    //     botones.forEach((boton) => {
    //         let letra = boton.textContent;
    //         if (letrasUsadas.includes(letra)) {
    //             for (let i = 0; i < letras.length; i++) {
    //                 if (letra.toLowerCase() == letras[i]) {
    //                     letraCorrecta = true;
    //                     //HACER QUE NO SE COMA EL MARGIN CUANDO SE COMPLETE LA PALABRA
        
    //                     guiones[i].style.fontSize = "50px";
    //                     guiones[i].textContent = letra;
    //                 }
    //             }
    //              letraCorrecta = true;
    //             cambiarColorBotones(letraCorrecta, boton);
               
    //         } 
    //     });
    
}





function iniciaJuego(){
    usuario = document.getElementById('usuario').value;
    if (usuario == ''){
       let arroba = document.getElementById('arroba');
       arroba.style = "background-color: rgba(255, 166, 0, 0.878)";
     
    } else{
       timer();
       localStorage.setItem('usuario', usuario);
    console.log('existe usuario', usuario);
    document.getElementById('index').style.display='none';
    document.getElementById('juego').style.display='block';
    }
}

//FUNCIONES
function crearArrayPalabras() {
    arrayPalabras = [
        { palabra: "inglaterra", categoria: "Países", descripcion: "Inglaterra es un país en Europa conocido por su historia fascinante...", img: "/images/imgDescripciones/inglaterra.jpg" },
        { palabra: "francia", categoria: "Países", descripcion: "Francia es famosa por su Torre Eiffel y deliciosa comida...", img: "/images/imgDescripciones/francia.jpg" },
        { palabra: "italia", categoria: "Países", descripcion: "Italia es la cuna de la pizza y la pasta, con ciudades llenas de arte y historia...", img: "/images/imgDescripciones/italia.jpg" },
        { palabra: "china", categoria: "Países", descripcion: "China es conocida por su Gran Muralla y la celebración del Año Nuevo chino...", img: "/images/imgDescripciones/china.jpg" },
        { palabra: "mexico", categoria: "Países", descripcion: "México tiene vibrantes festivales como el Día de los Muertos, comida sabrosa como tacos...", img: "/images/imgDescripciones/mexico.jpg" },
        { palabra: "japon", categoria: "Países", descripcion: "Japón es un país en Asia con una rica herencia cultural, incluyendo la ceremonia del té y festivales como Hanami...", img: "/images/imgDescripciones/japon.jpg" },
        { palabra: "australia", categoria: "Países", descripcion: "Australia es conocida por su vida silvestre única, como canguros y koalas. Tiene hermosos paisajes...", img: "/images/imgDescripciones/australia.jpg" },
        { palabra: "brasil", categoria: "Países", descripcion: "Brasil es famoso por su carnaval vibrante, playas tropicales y selvas exuberantes...", img: "/images/imgDescripciones/brasil.jpg" },
        { palabra: "canada", categoria: "Países", descripcion: "Canadá es un país con impresionantes paisajes, como las Montañas Rocosas y las Cataratas del Niágara...", img: "/images/imgDescripciones/canada.jpg" },
        { palabra: "egipto", categoria: "Países", descripcion: "Egipto tiene una rica historia con pirámides antiguas y el río Nilo...", img: "/images/imgDescripciones/egipto.jpg" },
        { palabra: "rusia", categoria: "Países", descripcion: "Rusia es conocida por su vasto territorio y la Plaza Roja en Moscú...", img: "/images/imgDescripciones/rusia.jpg" },
        { palabra: "india", categoria: "Países", descripcion: "India es famosa por sus colores vibrantes, el Taj Mahal y su diversidad cultural...", img: "/images/imgDescripciones/india.jpg" },
        { palabra: "argentina", categoria: "Países", descripcion: "Argentina es conocida por su tango, carne asada y paisajes impresionantes como la Patagonia...", img: "/images/imgDescripciones/argentina.jpg" },
        // Transporte
        { palabra: "avion", categoria: "Transporte", descripcion: "Los aviones vuelan por el cielo y nos llevan a lugares lejanos. Son rápidos y emocionantes para viajar...", img: "/images/imgDescripciones/avion.jpg" },
        { palabra: "barco", categoria: "Transporte", descripcion: "Los barcos navegan en el agua y pueden llevarnos en emocionantes travesías por océanos y mares...", img: "/images/imgDescripciones/barco.jpg" },
        { palabra: "tren", categoria: "Transporte", descripcion: "Los trenes viajan sobre vías férreas y son geniales para explorar paisajes mientras se mueven sobre rieles...", img: "/images/imgDescripciones/tren.jpg" },
        { palabra: "bicicleta", categoria: "Transporte", descripcion: "Las bicicletas son divertidas y saludables, ideales para pasear al aire libre y explorar vecindarios...", img: "/images/imgDescripciones/bicicleta.jpg" },
        { palabra: "coche", categoria: "Transporte", descripcion: "Los coches nos llevan a todas partes por carreteras. Son rápidos y convenientes para viajar en familia...", img: "/images/imgDescripciones/coche.jpg" },
        { palabra: "camion", categoria: "Transporte", descripcion: "Los camiones son vehículos grandes que transportan mercancías por carretera. Son esenciales para el movimiento de bienes en todo el mundo...", img: "/images/imgDescripciones/camion.jpg" },
        { palabra: "helicoptero", categoria: "Transporte", descripcion: "Los helicópteros vuelan verticalmente y son útiles para misiones de rescate y transporte en lugares de difícil acceso...", img: "/images/imgDescripciones/helicoptero.jpg" },
        { palabra: "autobus", categoria: "Transporte", descripcion: "Los autobuses son medios de transporte colectivo que llevan a las personas a diferentes lugares en rutas planificadas...", img: "/images/imgDescripciones/autobus.jpg" },
        // Cultura
        { palabra: "traje", categoria: "Cultura", descripcion: "Los trajes representan la identidad cultural y la historia de un lugar. Cada país tiene trajes tradicionales únicos y coloridos...", img: "/images/imgDescripciones/traje.jpg" },
        { palabra: "idioma", categoria: "Cultura", descripcion: "Cada país tiene su propio idioma. Aprender diferentes idiomas nos ayuda a entender y apreciar diversas culturas...", img: "/images/imgDescripciones/idioma.jpg" },
        { palabra: "costumbre", categoria: "Cultura", descripcion: "Las costumbres son tradiciones especiales que la gente sigue, como saludar o celebrar festivales de manera única...", img: "/images/imgDescripciones/costumbre.jpg" },
        { palabra: "baile", categoria: "Cultura", descripcion: "Los bailes reflejan la alegría y la creatividad de una cultura. Cada país tiene danzas tradicionales emocionantes...", img: "/images/imgDescripciones/baile.jpg" },
        { palabra: "comida", categoria: "Cultura", descripcion: "La comida es una parte importante de la cultura. Cada país tiene platos deliciosos que cuentan historias sobre su gente y sus tradiciones...", img: "/images/imgDescripciones/comida.jpg" },
        { palabra: "festividad", categoria: "Cultura", descripcion: "Las festividades son celebraciones alegres que reúnen a la gente para compartir alegría y tradiciones únicas...", img: "/images/imgDescripciones/festividad.jpg" },
        { palabra: "mito", categoria: "Cultura", descripcion: "Los mitos son historias tradicionales que explican el origen de cosas o enseñan lecciones importantes...", img: "/images/imgDescripciones/mito.jpg" },
        { palabra: "religion", categoria: "Cultura", descripcion: "La religión es una parte importante de la cultura, con creencias espirituales y prácticas que guían la vida de las personas...", img: "/images/imgDescripciones/religion.jpg" },
        { palabra: "creencias", categoria: "Cultura", descripcion: "Las creencias son ideas fundamentales que la gente tiene sobre el mundo y la vida...", img: "/images/imgDescripciones/creencias.jpg" },
        { palabra: "leyendas", categoria: "Cultura", descripcion: "Las leyendas son historias fascinantes que han sido transmitidas a lo largo del tiempo y a menudo contienen elementos mágicos o heroicos...", img: "/images/imgDescripciones/leyendas.jpg" }
    ];
}

function timer() {
     tiempoTranscurrido = 0;
    let minutos = 0;

    temporizador = setInterval(() => {
        tiempoTranscurrido++;
        //guardar_localStorage();

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
    // Obtener un índice aleatorio de la array
    numeroRandom = Math.floor(Math.random() * arrayPalabras.length);


    // Obtener la palabra seleccionada
    palabraSeleccionada = arrayPalabras[numeroRandom].palabra;
    palabraDescripcion = arrayPalabras[numeroRandom].descripcion;
    palabraCategoria = arrayPalabras[numeroRandom].categoria;
    palabraImagen = arrayPalabras[numeroRandom].img;

    document.getElementById('categoria').innerHTML = "<strong>Categoría: </strong>" + palabraCategoria;
    localStorage.setItem('palabraSeleccionada',palabraSeleccionada );
    localStorage.setItem('palabraDescripcion',palabraDescripcion);
    localStorage.setItem('palabraCategoria', palabraCategoria);
    localStorage.setItem("palabraImagen", palabraImagen);
}



function crearGuionesPalabra(palabraSeleccionada) {
    //contar cuantas letras tiene
    longitudPalabra = palabraSeleccionada.length;  
        
    console.log("Longitud palabra: " + longitudPalabra);
    console.log('Palabra seleccionada: ', palabraSeleccionada);
  
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
        boton.id = 'botonLetras';
        boton.addEventListener("click", (function (letraClickeada, botonClickeado) {
            return function () {
                console.log("Letra seleccionada: " + letraClickeada);
                comprobarLetraDentroPalabra(letraClickeada, botonClickeado);
                printErrores(letraCorrecta); 
                comprobarVictoria();
            };
        })(letraActual, boton));
        

        contenedorBotones.appendChild(boton);
    }
}

function comprobarLetraDentroPalabra(letraClickeada, botonClickeado) {
     letras = palabraSeleccionada.split('');
    letraCorrecta = false;
    console.log("Letras: " + letras);
    console.log("Botón: " + letraClickeada.toLowerCase());

   // if (localStorage.getItem('arrayLetrasUsadas') == null) {
        for (let i = 0; i < letras.length; i++) {
            if (letraClickeada.toLowerCase() == letras[i]) {
                letraCorrecta = true;
                //HACER QUE NO SE COMA EL MARGIN CUANDO SE COMPLETE LA PALABRA

                guiones[i].style.fontSize = "50px";
                guiones[i].textContent = letraClickeada;
            }
        }

        arrayLetrasClickadas.push(letraClickeada);
        localStorage.setItem('arrayLetrasUsadas', arrayLetrasClickadas);
        // console.log("Letra correcta: " + letraCorrecta);
        // cambiarColorBotones(letraCorrecta, botonClickeado);
   // } else {
    //     for (let j = 0; j < arrayLetrasClickadas.length; j++) {
    //         const letraYaUsada = arrayLetrasClickadas[j];
    //         for (let i = 0; i < arrayLetrasClickadas.length; i++) {
    //             if (letraYaUsada.toLowerCase() == letras[i]) {
    //                 letraCorrecta = true;
    //                 //HACER QUE NO SE COMA EL MARGIN CUANDO SE COMPLETE LA PALABRA

    //                 guiones[i].style.fontSize = "50px";
    //                 guiones[i].textContent = letraYaUsada;
    //             }
    //         }
    //     }

    // }

    // arrayLetrasClickadas.push(letraClickeada);
    // localStorage.setItem('arrayLetrasUsadas', arrayLetrasClickadas);
    console.log("Letra correcta: " + letraCorrecta);
    cambiarColorBotones(letraCorrecta, botonClickeado);
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
        localStorage.removeItem('arrayLetrasCorrectas');
        localStorage.removeItem('arrayLetrasIncorrectas');
        localStorage.removeItem('arrayLetrasUsadas');
        //localStorage.setItem('arrayLetrasUsadas', null);
        popup('ganar');
        informacion();
    }
}

function cambiarColorBotones(letraCorrecta, botonClickeado) {
    botonClickeado.disabled = true;
    let letra0 =  botonClickeado.textContent;
    // arrayLetrasCorrectas = localStorage.getItem('letrasCorrectas');
    // arrayLetrasIncorrectas = localStorage.getItem('letrasIncorrectas');
    if (letraCorrecta == true) {
        // arrayLetrasCorrectas.push(botonClickeado);
       
        arrayLetrasCorrectas.push(letra0);
         localStorage.setItem('letrasCorrectas',arrayLetrasCorrectas);
        // console.log('LETRA CORRECTA: ' ,arrayLetrasCorrectas);
        botonClickeado.classList.remove("btn-light");
        botonClickeado.classList.add("btn-success");
    } else {
        arrayLetrasIncorrectas.push(letra0);
         localStorage.setItem('letrasIncorrectas',arrayLetrasIncorrectas);
        // console.log('LETRA INCORRECTA: ' ,arrayLetrasIncorrectas);
        botonClickeado.classList.remove("btn-light");
        botonClickeado.classList.add("btn-secondary");
    }
}

function printErrores(letraCorrecta) {
    if (!letraCorrecta) {
        errores++;
        localStorage.setItem('errores', errores);
        console.log("Nº Errores: " + errores);
        if (errores >= 9) {
            console.log("Has perdido");
            //localStorage.setItem('arrayLetrasUsadas', null);
            errores = 9;
            localStorage.removeItem('arrayLetrasCorrectas');
            localStorage.removeItem('arrayLetrasIncorrectas');
            localStorage.removeItem('arrayLetrasUsadas');
            popup('perder');
            informacion();
        }
        imagenDibujo();
    }
}


function createPopup(id) {
    let popupNode = document.querySelector(id);
    // let overlay = popupNode.querySelector(".overlay");
    //  let closeBtn = popupNode.querySelector(".close-btn");

    function openPopup(resultado) {
        // Juego en curso se establece como false
        clearInterval(temporizador);

        // Se muestra el popup
        popupNode.classList.add("active");

        // Se obtiene el contenido del popup
        const popupContent = popupNode.querySelector('.popup-content');

        console.log("resultado", resultado);

        // Se actualiza el contenido del popup según el resultado

        if (resultado === 'ganar') {
            tituloPopup.innerText = '¡Ganaste!';
        } else if (resultado === 'perder') {
            tituloPopup.innerText = '¡Perdiste!';
        }
        // Se añaden event listeners a los botones dentro del popup
        const botones = popupContent.querySelectorAll('button');
        botones.forEach((boton) => {
            boton.addEventListener('click', (event) => {
                const accion = event.target.getAttribute('data-action');
                if (accion === 'salir') {
                    window.location.href = 'index.html';
                   
                    // location.reload();
                } else if (accion === 'reiniciar') {
                   // iniciaJuego();
                 //  document.getElementById('index').style.display='none';
                   //document.getElementById('juego').style.display='block';
                   
                   localStorage.clear();
                   location.reload();
                }
            });
        });
    }

    return openPopup;
}

let popup = createPopup("#popup");

function informacion() {
    // Mostrar la categoría y la descripción asociada
    document.getElementById('palabra').innerHTML = "<strong>Palabra: </strong>" + palabraSeleccionada;
    document.getElementById('categoria1').innerHTML = "<strong>Categoría: </strong>" + palabraCategoria;
    document.getElementById('descripcion').innerHTML = "<strong>Descripción: </strong> " + palabraDescripcion;

    let imagenElement = document.getElementById('imagen');
    imagenElement.src = palabraImagen;
}

// //Local storage 
    // ESTADO GENERAL
    //    - palabra selecionada
    //    - letras ya usadas
    //    - el numero de errores 
    //    - si se ha ganado o perdido 
    //    - tiempo


