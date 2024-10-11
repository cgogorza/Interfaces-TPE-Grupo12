document.querySelector(".scroll-to-top").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Esto ya aplica un desplazamiento suave
    });
});
function scrollToTop(duration) {
    const start = window.scrollY;
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Asegúrate de que no supere 1

        window.scrollTo(0, start * (1 - progress)); // Desplazamiento gradual

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

document.querySelector(".scroll-to-top").addEventListener("click", function() {
    scrollToTop(2000); // 1000 ms = 1 segundo
});
