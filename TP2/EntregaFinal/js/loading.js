document.addEventListener('DOMContentLoaded', function() {
    let loadingText = document.getElementById('loading-text');
    let progress = 0;
    setInterval(() => {
        progress += 1;
        loadingText.textContent = progress + '%';
    }, 50); // 5000ms / 100 steps = 50ms per step

    setTimeout(callBack_func, 5000);
    function callBack_func() {
        document.location.href = "index.html";// Llamamos a la función con un pequeño retraso de 2 segundos
    }
});
