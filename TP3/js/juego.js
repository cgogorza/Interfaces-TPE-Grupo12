"use strict"

document.addEventListener('DOMContentLoaded', () => {
    // Espera 8 segundos y cambia el texto
    setTimeout(() => {
        const loadingText = document.getElementById('loadingText');
        
        loadingText.textContent = 'Cargado con Éxito';
        const imag = document.getElementById("seccion-juego");
        imag.classList.toggle("invisible");
        const tab = document.getElementById("juego");
        tab.classList.remove("invisible");
        //tablero.class = 'visible';
    }, 8000);  // 8 segundos
});

class Juego {
    constructor(jugadores, tablero, fichas, connect) {
        this.connect = connect;
        this.tablero = tablero;
        this.fichas = fichas;
        this.jugadores = jugadores.slice(0, 2);//Sólo puedo tener 2 players, establenciendo un mínimo y un máximo de valores
        this.currentTurn = 0; //Comienza con el primer jugador
        this.lastPlayed = 1;//El contrario del jugador actual
    }

    //Verifica el ganador, ejecuta una alerta que al clickearla reinicia la página
    winGame(){
        let cellsConnect = this.tablero.cellsConnect(this.connect);
        if(cellsConnect.length > 0){
            let n = this.jugadores[this.lastPlayedTurn()].getNombre()
            // Mostrar el modal y establecer el mensaje del ganador
            const modalJuego = document.getElementById("winnerModal");
            const winnerMessage = document.getElementById("winnerMessage");
            const closeModalBtn = document.getElementById("closeModalBtn");
            setTimeout(() => {
                winnerMessage.textContent = ¡Ganador ${n}!;
                modalJuego.classList.remove("oculto"); 
                // Muestra el modal
             }, 2000);
             
            // Evento para cerrar el modal y recargar la página
            closeModalBtn.addEventListener("click", () => {
                window.location.reload();  // Recarga la página
            });
        }
    }

    //Cambia el turno del jugador
    switchTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.jugadores.length;
    }

    //Obtiene el último jugador
    lastPlayedTurn(){
        return this.lastPlayed = (this.currentTurn + 1) % this.jugadores.length;
    }

    //Obtiene el jugador actual
    getCurrentPlayer() {
        return this.jugadores[this.currentTurn];
    }
}
