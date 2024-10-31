class Jugador{
    
    constructor(nombre, arr) {
        this.nombre = nombre
        this.ganador = false;
        this.fichas = arr || [];
    }

    //Obtiene un arreglo de fichas que muestra por consola
    getFichas(){
        console.log(this.fichas)
    }

    //Verifica la ficha que se está moviendo
    fichasContains(ficha){
        for(const elem of this.fichas){
            if(elem.compareTo(ficha)){
                return true;
            }
        }
        return false;
    }

    // Lanza la ficha con una animación de caída
    dropFicha(col, ficha, board, game) {
        // Determina la posición final en la columna y mueve la ficha hacia abajo
        let cord = board.fillCol(col, ficha);

        // Inicia la posición de la ficha desde arriba del tablero
        ficha.setPositionAnimacion(cord.x, 0); // Empieza desde la parte superior (y=0)

        // Mueve la ficha hacia abajo gradualmente hasta alcanzar su posición final
        this.animateFall(cord, ficha, game);
    }

    // Animación de caída
    animateFall(cord, ficha, game) {
        const targetY = cord.y;

        const animate = () => {
            update(); // Actualiza el tablero (asegúrate de tener esta función implementada)

            // Si la ficha ha llegado a la posición final, termina la animación
            if (ficha.getPosY() >= targetY) {
                ficha.setPositionAnimacion(cord.x, targetY);
                ficha.draw();
                game.switchTurn(); // Cambia el turno al final de la animación
                return;
            }

            // Mueve la ficha hacia abajo
            ficha.setPositionAnimacion(ficha.getPosX(), ficha.getPosY() + 5); // Ajusta la velocidad aumentando el valor (5)
            ficha.draw();

            // Llama a requestAnimationFrame para continuar la animación
            requestAnimationFrame(animate);
        };

        // Inicia la animación
        animate();
    }
    
    getNombre(){
        return this.nombre;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }
}