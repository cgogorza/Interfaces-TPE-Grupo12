class Tablero {
    constructor(rows, cols, cellSize, startX, startY) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.startX = startX;
        this.startY = startY;
        this.matrix = new Array(rows);

        // Cargar las dos imágenes
        this.img1 = new Image();
        this.img1.src = './images/CuadradoAzul.jpg';
        this.img2 = new Image();
        this.img2.src = './images/CuadradoCeleste.jpg';

        // Inicializar como no cargadas
        this.img1Loaded = false;
        this.img2Loaded = false;

        // Establecer manejadores de carga de imágenes
        this.img1.onload = () => {
            this.img1Loaded = true;
            this.checkImagesLoaded();
        };
        this.img2.onload = () => {
            this.img2Loaded = true;
            this.checkImagesLoaded();
        };

        for (let row = 0; row < rows; row++) {
            this.matrix[row] = new Array(cols).fill(null);
        }
    }

     // Dibuja el tablero solo si ambas imágenes están cargadas
     checkImagesLoaded() {
        if (this.img1Loaded && this.img2Loaded && this.ctx) {
            this.draw(this.ctx);
        }
    }

    //Dibuja el tablero
    draw(ctx, column) {
        this.ctx = ctx; // Guardar el contexto para poder usarlo en checkImagesLoaded()
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = this.startX + col * this.cellSize;
                const y = this.startY + row * this.cellSize;

                // Dibuja la imagen correspondiente
                const img = (col % 2 === 0) ? (row % 2 === 0 ? this.img1 : this.img2) : (row % 2 === 0 ? this.img2 : this.img1);
                ctx.drawImage(img, x, y, this.cellSize, this.cellSize);

                // Dibujar el círculo blanco con borde negro centrado en el cuadrado
                ctx.beginPath();
                ctx.arc(
                    x + this.cellSize / 2,   // Posición X del centro del círculo
                    y + this.cellSize / 2,   // Posición Y del centro del círculo
                    this.cellSize / 3,       // Radio del círculo
                    0,                       // Ángulo inicial
                    2 * Math.PI              // Ángulo final
                );
                ctx.fillStyle = 'white';
                ctx.fill();                 // Rellenar el círculo de blanco
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.stroke();               // Dibujar el borde negro
            }
        }

        // Les pone un lineado negro alrededor del tablero
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        for (let row = 0; row <= this.rows; row++) {
            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY + row * this.cellSize);
            ctx.lineTo(this.startX + this.cols * this.cellSize, this.startY + row * this.cellSize);
            ctx.stroke();
        }

        for (let col = 0; col <= this.cols; col++) {
            if (column != null && (col === column || col === column + 1)) {
                ctx.strokeStyle = '#F8FFB5';// Ilumina la columna
                ctx.lineWidth = 3;
            } else {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
            }
            ctx.beginPath();
            ctx.moveTo(this.startX + col * this.cellSize, this.startY);
            ctx.lineTo(this.startX + col * this.cellSize, this.startY + this.rows * this.cellSize);
            ctx.stroke();
        }
    }


    //Hace la conexión de fichas en el tablero, verificando cómo se va ganando
    cellsConnect(connect) {
        let connectedCells = this.connectHorizontal(connect);
        //Verifica si no hubo coincidencias de alineamientos para llamar al siguiente método de chequeo
        if(connectedCells.length === 0){
           connectedCells = this.connectVertical(connect);
        }
        if(connectedCells.length === 0) {
           connectedCells = this.connectDiagonal(connect);
        }
        if(connectedCells.length === 0) {
            connectedCells = this.connectAntiDiagonal(connect);
         }
        return connectedCells;
    }

    connectHorizontal(connect) {
        const connectedCells = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col <= this.cols - connect; col++) {
                //Verifica que la posición consultada no esté vacía
                if (this.matrix[row][col] !== null) {
                    //Recuerda la primer posición de la ficha de 4,5,6,7 en linea
                    let firstCircle = this.matrix[row][col];
                    const inLineCells = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        //Compara la posición de esa ficha, que termina siendo la última, 
                        //y va recorriendo la matriz, buscando coincidencias
                        if (this.matrix[row][col + i] !== null) {
                            if (firstCircle.compareTo(this.matrix[row][col + i])) {
                                inLineCells.push(this.matrix[row][col + i]);
                            } else {
                                break;
                            }
                        }
                    }
                    //Si las coincidencias dentro del arreglo son igual 4, gana por ese método
                    if (inLineCells.length === connect) {
                        connectedCells.push(...inLineCells);
                    }
                }
            }
        }
        return connectedCells;
    }

    //Se repiten las explicación para las siguientes, 
    //sólo cambia el recorrido de las matrices dependiendo del caso
    connectVertical(connect) {
        const connectedCells = [];
        for (let row = 0; row <= this.rows - connect; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.matrix[row][col] !== null) {
                    let firstCircle = this.matrix[row][col];
                    const inLineCells = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        if (this.matrix[row + i][col] !== null) { 
                            if (firstCircle.compareTo(this.matrix[row + i][col])) {
                                inLineCells.push(this.matrix[row + i][col]);
                            } else {
                                break;
                            }
                        }
                    }
                    if (inLineCells.length === connect) {
                        connectedCells.push(...inLineCells);
                    }
                }
            }
        }
        return connectedCells;
    }

    connectDiagonal(connect) {
        const connectedCells = [];
        for (let row = 0; row <= this.rows - connect; row++) {
            for (let col = 0; col <= this.cols - connect; col++) {
                if (this.matrix[row][col] !== null) {
                    let firstCircle = this.matrix[row][col];
                    const inLineCells = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        if (this.matrix[row + i][col - i] !== null) {
                            if (firstCircle.compareTo(this.matrix[row + i][col - i])) {
                                inLineCells.push(this.matrix[row + i][col - i]);
                            } else {
                                break;
                            }
                        }
                    }
                    if (inLineCells.length === connect) {
                        connectedCells.push(...inLineCells);
                    }
                }
            }
        }
        return connectedCells;
    }

    connectAntiDiagonal(connect) {
        const connectedCells = [];
        for (let row = 0; row <= this.rows - connect; row++) {
            for (let col = 0; col <= this.cols - connect; col++) {
                if (this.matrix[row][col] !== null) {
                    let firstCircle = this.matrix[row][col];
                    const inLineCells = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        console.log(row, col)
                        console.log(row + i, col + i)
                        if (this.matrix[row + i][col + i] !== null) {
                            if (firstCircle.compareTo(this.matrix[row + i][col + i])) {
                                inLineCells.push(this.matrix[row + i][col + i]);
                            } else {
                                break;
                            }
                        }
                    }
                    if (inLineCells.length === connect) {
                        connectedCells.push(...inLineCells);
                    }
                }
            }
        }
        return connectedCells;
    }

    //Obtiene las coordenadas de la celda
    coordCell(row, col) {
        const x = this.startX + col * this.cellSize + this.cellSize / 2;
        const y = this.startY + row * this.cellSize + this.cellSize / 2;
        return { x, y };
    }

    //Va llenando la columna con el objeto ficha
    fillCol(col, circle) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.matrix[row][col]) {
                this.matrix[row][col] = circle;
                return this.coordCell(row, col);
            }
        }
    }

    //Se fija la distancia de lanzamiento de la ficha, y si es posible hacerlo
    isDropeable(circulo, col) {

        const circuloX = circulo.getPosX();
        const circuloY = circulo.getPosY();

        //FIja la pos X desde donde puede caer la ficha
        const cellX = this.startX + col * this.cellSize + this.cellSize / 2;
        //Fija desde donde puede caer la ficha
        const cellY = this.startY;

        const distance = Math.sqrt((circuloX - cellX) ** 2 + (circuloY - cellY) ** 2);
        
        return distance < circulo.getRadius();
    }


    //Determina la columna donde la ficha puede ser tirada
    getCol(circulo) {
        let col = 0;
        let cond = false;
        while (col < this.cols && cond === false) {
            if (this.isDropeable(circulo, col)) {
                cond = true;
                break;
            }
            col++;
        }
        if (col != this.cols) {
            return col;
        } else {
            return null;
        }

    }

    //Obtiene el tamaño de la matriz
    getSize() {
        const filas = this.matrix.length;
        const columnas = this.matrix[0].length;
        return filas * columnas;
    }

    //Ancho de la matriz
    getWidth() {
        return this.cols * this.cellSize;
    }

    //Alto de la matriz
    getHeight() {
        return this.rows * this.cellSize;
    }


    //Getters y Setters
    getRows() {
        return this.rows;
    }

    setRows(value) {
        this.rows = value;
    }

    getCols() {
        return this.cols;
    }

    setCols(value) {
        this.cols = value;
    }
    getCellSize() {
        return this.cellSize;
    }
    setCellSize(value) {
        this.cellSize = value;
    }
    getStartX() {
        return this.startX;
    }
    setStartX(value) {
        this.startX = value;
    }
    getStartY() {
        return this.startY;
    }
    setStartY(value) {
        this.startY = value;
    }
}