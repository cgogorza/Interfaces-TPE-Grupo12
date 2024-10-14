document.addEventListener('DOMContentLoaded', () => {
    // Espera 8 segundos y cambia el texto
    setTimeout(() => {
        const loadingText = document.getElementById('loadingText');
        
        loadingText.textContent = 'Cargado con Éxito';
    }, 8000);  // 8 segundos
});