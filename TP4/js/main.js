document.addEventListener('DOMContentLoaded', function() {
    // Animación del loader: oculta el contenedor del loader después de 10 segundos (10000 ms) y muestra el contenido
    setTimeout(function() {
        const loaderContainer = document.getElementById('loader-container');
        const contenido = document.getElementById('contenido');

        if (loaderContainer) {
            loaderContainer.style.display = 'none';
        }

        if (contenido) {
            contenido.style.display = 'block';
        }
    }, 10000);


//Animación y efectos del header

// Cuando el usuario hace scroll, se activa la función
window.onscroll = function() {myFunction()};

// Obtengo los contenidos del header
var header = document.querySelector(".header");
var header_img = document.querySelector("#logoHead");
var logo = document.querySelector("#keyart-7");

// Obtiene la posición offset del header
var sticky = header.offsetTop;

// Añade el atributo sticky del header cuando se aleja de él, y lo desactiva cuando vuelve
function myFunction() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
    header_img.classList.remove("oculto");
    logo.classList.add("oculto");
  } else {
    header.classList.remove("sticky");
    header_img.classList.add("oculto");
    logo.classList.remove("oculto");
  }
}


// Obtengo los contenidos del menú
let cambiarMenuElement = document.querySelector(".btn-ham");
let hamMenuElement = document.querySelector("#menu-ham");
let imgHam = document.querySelector(".hambur")


//Los voy agregando uno por uno cuando el usuario hace click sobre el logo del menú
cambiarMenuElement.addEventListener("click", () => {
  for (let i = 0; i < hamMenuElement.children.length; i++) {
    hamMenuElement.children[i].classList.toggle("menu-oculto");
  }
  if(hamMenuElement.children[0].classList.contains("menu-oculto")){
    toggleMenu();
  } else{
    //Se cambia el logo del menú a una cruz cuando está abierto con la animación cambio
    toggleMenu();
    
  }
  //Se van agregando de a poco
  setTimeout(cambio, 1010);
});

function toggleMenu() {
  const menu = document.getElementById('menu-ham');
  const btnHam = document.querySelector('.btn-ham');
  btnHam.classList.toggle('active');
  menu.classList.toggle('active');
}



//Función parallax    
// Selecciona todas las capas con la clase 'parallax' dentro del contenedor '#parallax'
const parallaxLayers = document.querySelectorAll('.keyart_layer.parallax');

// Agrega un evento de desplazamiento (scroll) a la ventana
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    parallaxLayers.forEach(layer => {
        // Obtiene la velocidad de la capa del atributo data-speed
        const speed = layer.getAttribute('data-speed');
        
        // Calcula la posición de desplazamiento en función de la velocidad
        const yPos = -scrollY * (speed / 110); // Ajuste suave con división entre 100

        // Aplica la transformación en el eje Y
        layer.style.transform = `translateY(${yPos}px)`;
    });
});


document.body.onload = castParallax();

});

const sectionCards = document.querySelector(".seccion-datos");
let seccion1 = document.querySelector(".panel-1");
let seccion2 = document.querySelector(".panel-2");
let seccion3 = document.querySelector(".panel-3");
let texto1 = document.querySelector(".texto-1");
let texto2 = document.querySelector(".texto-2");
let texto3 = document.querySelector(".texto-3");

//Digo que cuando el usuario scrolleé, y que la posición del usuario 
//se vaya acercando al alto y posición e Y de la cards, aparezcan
document.addEventListener("scroll", function () {
  const clientHeight = document.documentElement.clientHeight;
  const sectionCardsY = sectionCards.getBoundingClientRect().y;
  const sectionCardsHeight = sectionCards.getBoundingClientRect().height;
  //Se añaden a poco
  if (clientHeight > sectionCardsY + (sectionCardsHeight * 2) / 15) {
    setTimeout(aniadir1,100);
    setTimeout(aniadir2, 500);
    setTimeout(aniadir3,900);
}});



function aniadir1(){
  seccion1.classList.add("mostrar");
  texto1.classList.add("mostrar");
}

function aniadir2(){
  seccion2.classList.add("mostrar");
  texto2.classList.add("mostrar");
}

function aniadir3(){
  seccion3.classList.add("mostrar");
  texto3.classList.add("mostrar");
}

