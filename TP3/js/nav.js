// Seleccionar el ícono de menú hamburguesa y el navbar
const hamburgerMenu = document.getElementById('hamburger-menu');
const navbar = document.getElementById('navbar');

// Agregar un evento de clic al ícono del menú hamburguesa
hamburgerMenu.addEventListener('click', function() {
    navbar.classList.toggle('desactivar');
});

function cerrarSesion() {
    // Aquí redireccionamos al otro HTML
    document.location.href = "index.html";
}

function irHome(){
    // Aquí redireccionamos al Home
    document.location.href = "home.html";
}