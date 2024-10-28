//flechas logica
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const menuLateral = document.getElementById('menu-lateral');

    // Función para mostrar/ocultar el menú
    hamburgerMenu.addEventListener('click', function() {
        menuLateral.classList.toggle('desactivarNav');
        menuLateral.classList.toggle('activarNav');
    });
});

//corazon logica
function toggleLike(element) {
    // Cambia el ícono a lleno o vacío
    element.classList.toggle("bi-heart-fill");
    element.classList.toggle("bi-heart");

    // Cambia el color del ícono
    if (element.classList.contains("bi-heart-fill")) {
        element.style.color = "red"; // Cambia el color a rojo si está lleno
    } else {
        element.style.color = "white"; // Cambia el color a blanco si está vacío
    }
}

//carrusel logica
document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.carrusel');
    const desplazarIzq = document.getElementById('desplazarIzq');
    const desplazarDer = document.getElementById('desplazarDer');

    // Función para determinar el desplazamiento
    function getDesplazamiento() {
        if (window.innerWidth < 768) { // Móvil
            return 210;
        } else { // PC
            return 1200;
        }
    }

    // Verificar si estamos en una pantalla de móvil
    function esPantallaMovil() {
        return window.innerWidth < 768;
    }

    // Desplazar a la izquierda
    desplazarIzq.addEventListener('click', function() {
        carrusel.scrollBy({
            left: -getDesplazamiento(), // Desplaza a la izquierda
            behavior: 'smooth' // Hace el desplazamiento suave
        });

        // Solo agregar animaciones en pantallas más grandes
        if (!esPantallaMovil()) {
            carrusel.classList.add('mover-izquierda');
            setTimeout(() => {
                carrusel.classList.remove('mover-izquierda');
            }, 500); // Coincide con la duración de la animación
        }
    });

    // Desplazar a la derecha
    desplazarDer.addEventListener('click', function() {
        carrusel.scrollBy({
            left: getDesplazamiento(), // Desplaza a la derecha
            behavior: 'smooth' // Hace el desplazamiento suave
        });

        // Solo agregar animaciones en pantallas más grandes
        if (!esPantallaMovil()) {
            carrusel.classList.add('mover-derecha');
            setTimeout(() => {
                carrusel.classList.remove('mover-derecha');
            }, 500); // Coincide con la duración de la animación
        }
    });
});

//card logica

document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todas las tarjetas de juego que tienen un carrito
    const cards = document.querySelectorAll('.cardJuego');

    cards.forEach(card => {
        const carrito = card.querySelector('.car'); // Selecciona el carrito en la tarjeta actual

        // Verifica si el carrito existe antes de continuar
        if (carrito) {
            const like = card.querySelector('.iconoComprado'); // Selecciona el like en la tarjeta actual
            const closeIcono = card.querySelector('.closeIcono'); // Selecciona la cruz en la tarjeta actual

            // Al hacer clic en el carrito
            carrito.addEventListener('click', function() {
                carrito.style.display = 'none';  // Ocultar carrito
                like.style.display = 'inline-block';  // Mostrar like verde
            });

            // Al hacer clic en la cruz
            closeIcono.addEventListener('click', function() {
                like.style.display = 'none';  // Ocultar like verde
                carrito.style.display = 'inline-block';  // Mostrar carrito
            });
        }
    });
});

function AbrirJuego4EnLinea() {
    // Aquí redireccionamos al otro HTML
    document.location.href = "juego.html";
}