let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let turn = document.getElementById('turn');
const tipoJuego = document.getElementById('opciones');
const play = document.getElementById('play');
const formulario = document.getElementById('selector');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let ficha = null;
let terminado = false;
let tiempoRestante = 300; // Tiempo en segundos
let jugadores = [];
let figures = [];
let fichasA = [];
let fichasB = [];

//Creo mi juego, tablero ,jugadores y fichas tomando lo que me pase el usuario desde el DOM
let tablero = new Tablero(6, 7, 60, 390, 50);//tablero por default
let CANT_FIG = tablero.getSize();
tablero.draw(ctx);

//Crear los jugadores, y les asigna un array específico de fichas, y un nombre que luego se redefine
let jugador1 = new Jugador("blue", fichasA);
let jugador2 = new Jugador("red", fichasB);
jugadores.push(jugador1, jugador2);

//Crea el objeto juego
let juego = new Juego(jugadores, tablero, figures);

let lastClickedFigure = null;
let isMouseDown = false;

function crearJuego() {
    //Creo el juego inicializando cada método necesario (tablero, juego, fichas, etc...)
    clearCanvas();
    iniciarConteo();
    //Asigna tamaño de la celda
    let cellSize = 60;
    let valor = tipoJuego.value;
    //Creo el tablero ahora sí con el número en linea que ha sido seleccionado
    let rows = parseInt(valor) + 2;
    let cols = (parseInt(valor) * 2 )-1;
    let tableroWidth = cols * cellSize;
    let startX = (canvasWidth - tableroWidth) / 2;
    let startY = 50;
    tablero = new Tablero(rows, cols, cellSize, startX, startY);
    juego = new Juego(jugadores, tablero, figures,parseInt(valor));
    addFigures();
    tablero.draw(ctx);
    CANT_FIG = tablero.getSize();
}

function dibujarTemporizador() {
    // Definir el área específica del temporizador
    let anchoTemporizador = 130; // Ancho deseado para el temporizador
    let posX = (canvasWidth - anchoTemporizador) / 2; // Posición X centrada

    // Limpiar solo el área del temporizador
    ctx.clearRect(posX, 0, anchoTemporizador, 40); // Ajustar altura si es necesario

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center'; // Alineación centrada para el temporizador

    // Dibujar el tiempo restante en el canvas
    ctx.fillText(`Tiempo: ${tiempoRestante}`, canvasWidth / 2, 30);
}



//Se manda al nuevo tablero lo que el usuario pase por parametro 
formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Formulario capturado, sin recargar");
    let e = document.querySelector(".botones");
    let btr = document.querySelector(".oculto-btn");
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    name1 = document.getElementById('jugador-1').value;
    name2 = document.getElementById('jugador-2').value;
    //Obtiene los nombres de los jugadores por parámetros,
    //ordena los botones, ocultando los de jugar, y poniendo la linea de los turnos
    //y el botón de reiniciar
    jugador1.setNombre(name1);
    jugador2.setNombre(name2);
    e.classList.toggle("invisible");
    turn.classList.toggle("invisible");
    btr.classList.add("boton-de-reinicio");
    //Si se aprieta el botón de reinicio, se recarga la página
    btr.addEventListener("click", () => {
        window.location.reload();
    });
    //Llama a la función crearJuego para crear el 4, 5, 6, 7 en línea
    crearJuego();

});

let currentColor = 'blue';
//Se añaden las figuras
function addFigure() {
    //Chequea el color adecuado para agregarlo en la figura
    if (currentColor === 'blue') {
        addCircle('blue');
        currentColor = 'red';
    } else {
        addCircle('red');
        currentColor = 'blue';
    }
    update();
}


function update(c) {
    // Limpia el canvas
    clearCanvas();
    //Dibuja el tablero
    tablero.draw(ctx,c);

    dibujarTemporizador();

    // Dibujar las figuras
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }

    let jugador = juego.getCurrentPlayer();
    turn.textContent = 'Es el turno de: ' + jugador.getNombre();
    ctx.fillRect(200, 630, 200, 20);
}

function addCircle(color) {
    // Define el radio de la ficha y las posiciones iniciales
    let circleRadius = 20;
    const image = new Image();
    let posX, posY;

    // Configuración de la altura máxima disponible y el número máximo de fichas permitidas
    const maxWaitHeight = 400; // Altura máxima de la columna de espera (ajusta según tu tablero)
    const maxFichas = parseInt(tipoJuego.value) * parseInt(tipoJuego.value); // Ajuste del número máximo de fichas visibles en espera

    // Calcula el espaciado inicial de manera uniforme para el número máximo de fichas
    let dynamicSpacing = Math.max(circleRadius / maxFichas, maxWaitHeight / maxFichas);


    // Determina la posición X y Y inicial de la ficha, sin recalcular el espaciado dinámico
    if (color === 'blue') {
        posX = 98; // Posición en X de la columna de espera para el jugador azul
        posY = 51 + fichasA.length * dynamicSpacing; // Aplica el espaciado inicial uniforme

        // Carga la imagen de la ficha
        image.src = "fichas/" + jugadores[0].getNombre() + ".png";

        // Crea la ficha original y la agrega al array de fichas del jugador azul
        let circle = new Ficha(posX, posY, color, circleRadius, ctx, image);
        fichasA.push(circle);
        figures.push(circle);

    } else if (color === 'red') {
        posX = 1100; // Posición en X de la columna de espera para el jugador rojo
        posY = 51 + fichasB.length * dynamicSpacing;

        image.src = "fichas/" + jugadores[1].getNombre() + ".png";

        // Crea la ficha original y la agrega al array de fichas del jugador rojo
        let circle = new Ficha(posX, posY, color, circleRadius, ctx, image);
        fichasB.push(circle);
        figures.push(circle);
    }
}




function actualizarTemporizador() {
    if(!terminado){
        if (tiempoRestante <= 0) {
            // Si el tiempo se acaba, termina el juego
            terminado = true;
            // Mostrar el modal y establecer el mensaje de empate
            const modalJuego = document.getElementById("empateModal");
            const winnerMessage = document.getElementById("empateMessage");
            const closeModalBtn = document.getElementById("closeModalEmpateBtn");
            winnerMessage.textContent = `¡ Empate !`;
            modalJuego.classList.remove("oculto");  // Muestra el modal
            // Evento para cerrar el modal y recargar la página
            closeModalBtn.addEventListener("click", () => {
                window.location.reload();  // Recarga la página
            });
        }
        dibujarTemporizador();
    }
}

//Inicia el conteo del juego de 300 a 0
function iniciarConteo() {
    const intervalId = setInterval(function () {
        if(terminado){
            clearInterval(intervalId);
        }else{
            tiempoRestante--;

            if (tiempoRestante <= 0) {
                actualizarTemporizador();
                clearInterval(intervalId); // Detiene el intervalo cuando llegues a 0 o menos
            }else{
                actualizarTemporizador();
            }
            
        }
    }, 1000);
}

function onMouseDown(e) {
    //Chequea que el cursor izquierdo se esté presionando
    isMouseDown = true;

    if (lastClickedFigure != null) {
        lastClickedFigure = null;
    }
    let jugador = juego.getCurrentPlayer();
    let clickFig = findClickedFigure(e.layerX, e.layerY);
    if (clickFig != null && jugador.fichasContains(clickFig)) {
        lastClickedFigure = clickFig;
    }
    update();
}

function onMouseUp(e) {
    //Chequea que el cursor izquierdo sea soltado
    isMouseDown = false;
    ficha = lastClickedFigure;
    if(ficha != null){
        var col = tablero.getCol(ficha);
    }

    if (ficha != null && col != null) {
        let jugador = juego.getCurrentPlayer();

        jugador.dropFicha(col, ficha, tablero, juego);
        //Chequea si ganaron el juego, sino lanza la ficha en la posición donde se le indica
        juego.winGame();
        
    } else if(ficha != null && col === null) {
        ficha.posOriginal();
    }

}

function onMouseMove(e) {
    //Mueve el objeto a la posición deseada
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        let col = tablero.getCol(lastClickedFigure);
        update(col);
    }
}

function clearCanvas() {
    //Borra el objeto anterior para dar paso al que se mueve, lo borra y dibuja continuamente
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function addFigures() {
    //Añade fichas mientras sea menor que la variable CANT_FIG
    addFigure();
    if (figures.length < CANT_FIG) {
        setTimeout(addFigures, 33);
    }
}



function findClickedFigure(x, y) {
    //Busca el objeto seleccionado
    for (let i = 0; i < figures.length; i++) {
        const element = figures[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
