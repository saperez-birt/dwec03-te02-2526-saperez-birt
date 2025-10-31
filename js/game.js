'use strict'

/* Constante para limitar el tamaño de la cuadricula */
const GRID_SIZE = 600;

/* Constante que almacena las diferentes configuraciones de los niveles de 
dificultad del juego. */
const GAME_CONFIG = {
    difficulties: {
        easy: {
            name: 'Fácil',
            gridSize: {rows: 8, cols: 8},
            time: 300,
            showNumbers: true,
            showGrid: true
        },
        medium: {
            name: 'Medio',
            gridSize: {rows: 12, cols: 12},
            time: 240,
            showNumbers: false,
            showGrid: true
        },
        hard: {
            name: 'Difícil',
            gridSize: {rows: 16, cols: 16},
            time: 180,
            showNumbers: false,
            showGrid: false
        },
    }
};

/* Constante que almacena los datos de los distintos niveles de cada 
dificultad. Desde aqui se cargan las figuras de referencia*/
const LEVELS_DATA = {
    easy: [
        {
            id: 1,
            name: 'Corazón',
            colors: ['#FF0000', '#FFFFFF'],
            pattern: [
                [0,1,1,0,0,1,1,0],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [0,1,1,1,1,1,1,0],
                [0,0,1,1,1,1,0,0],
                [0,0,0,1,1,0,0,0],
                [0,0,0,0,0,0,0,0]
            ]
        },
        {
            id: 2,
            name: 'Estrella',
            colors: ['#FFD700', '#FFFFFF'],
            pattern: [
                [0,0,0,1,1,0,0,0],
                [0,0,1,1,1,1,0,0],
                [0,1,1,1,1,1,1,0],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [0,1,1,1,1,1,1,0],
                [0,0,1,1,1,1,0,0],
                [0,0,0,1,1,0,0,0]
            ]
        }
    ],
    medium: [
        {
            id: 1,
            name: 'Corazón Mediano',
            colors: ['#FF0000', '#FFFFFF'],
            pattern: [
                [0,1,1,1,0,0,0,0,1,1,1,0],
                [1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1],
                [0,1,1,1,1,1,1,1,1,1,1,0],
                [0,1,1,1,1,1,1,1,1,1,1,0],
                [0,0,0,1,1,1,1,1,1,0,0,0],
                [0,0,0,0,1,1,1,1,0,0,0,0],
                [0,0,0,0,1,1,1,1,0,0,0,0],
                [0,0,0,0,0,1,1,0,0,0,0,0],
            ]
        },
        {
            id: 2,
            name: 'Estrella Mediana',
            colors: ['#FFD700', '#FFFFFF'],
            pattern: [
                [0,0,0,0,1,1,1,1,0,0,0,0],
                [0,0,0,0,1,1,1,1,0,0,0,0],
                [0,0,0,0,1,1,1,1,0,0,0,0],
                [0,1,1,1,1,1,1,1,1,1,1,0],
                [1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1],
                [0,1,1,1,1,1,1,1,1,1,1,0],
                [0,0,0,1,1,1,1,1,1,1,0,0],
                [0,0,0,1,1,0,0,1,1,1,0,0],
                [0,0,1,1,0,0,0,0,1,1,0,0],
                [0,1,1,0,0,0,0,0,0,1,1,0],
                [0,0,0,0,0,0,0,0,0,0,0,0]
            ]
        }
    ],
    hard: [
        {
            id: 1,
            name: 'Corazón Grande',
            colors: ['#FF0000', '#FFFFFF'],
            pattern: [
                [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
                [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
                [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
                [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
                [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
                [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            ]
        },
        {
            id: 2,
            name: 'Estrella Grande',
            colors: ['#FFD700', '#FFFFFF'],
            pattern: [
                [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
                [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
                [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0],
                [1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ]
        }
    ]
};
/* Variable que contiene toda la informacion que se quiere recopilar de una
partida. */
let gameState = {
    difficulty: '',
    currentLevel: 0,
    totalScore: 0,
    levelScore: 0,
    errors: 0,
    timer: 0,
    timerInterval: null,
    isPaused: false,
    isDrawing: false,
    selectedColor: null,
    bonusTime: 0,
    playerGrid: [],
    referencePattern: [],
    levelColors: []
};

$(document).ready(function() {
    iniciarJuego();
})

function iniciarJuego() {
    gameState.difficulty = localStorage.getItem('Nivel Dificultad') || 'easy';
    cargarNivel(0);
    configurarEventos();
    empezarCuentaAtras();
}

function cargarNivel(levelIndex) {
    /* Se obtienen los niveles disponibles en la dificultad elegida */
    const levels = LEVELS_DATA[gameState.difficulty];

    /* Si ya no hay mas niveles se muestra la interfaz de victoria */
    if (levelIndex >= levels.length) {
        mostrarPanelVictoria();
        return;
    }

    /* Si no, se recogen el nivel a cargar y la configuracion de su dificultad*/
    const level = levels[levelIndex];
    const config = GAME_CONFIG.difficulties[gameState.difficulty];
    const rows = config.gridSize.rows;
    const cols = config.gridSize.cols;

    /* Se actualizan las variables de estado de la partida */
    gameState.currentLevel = levelIndex;
    gameState.referencePattern = level.pattern;
    gameState.levelColors = level.colors;
    gameState.levelScore = 0;
    gameState.errors = 0;

    /* Inicializamos el tablero a colorear */
    inicializarTablero(rows, cols);
    renderizarTablero(rows, cols);
    renderizarPaletaColores(level.colors, config.showNumbers);
    renderizarImagenEjemplo(level.pattern, level.colors, config, rows, cols);
    actualizarPuntuacion();
}

/* Funcion que limpia e inicializa el tablero */
function inicializarTablero(rows, cols) {
    gameState.playerGrid = [];
    for (let i = 0; i < rows; i++) {
        gameState.playerGrid[i] = [];
        for (let j = 0; j < cols; j++) {
            gameState.playerGrid[i][j] = null;
        }
    }
}

function renderizarTablero(rows, cols) {
    /* Accedemos al elemento del DOM y limpiamos su contenido */
    const $board = $('#game-board');
    $board.empty();

    /* Se asigna el tamaño de las celdas y del tablero dinamicamente */
    const cellSize = GRID_SIZE / cols;
    const boardSize = cellSize * cols;

    $board.css({
        'width': boardSize + 'px',
        'height': boardSize + 'px'
    });

    const $table = $('<table class="pixel-grid"></table>')
        .css('width', '100%')
        .css('height', '100%');

    for (let i = 0; i < rows; i++) {
        const $row = $('<tr></tr>');
        
        for (let j = 0; j < cols; j++) {
            const $cell = $('<td></td>')
                .addClass('pixel-cell')
                .attr('data-row', i)
                .attr('data-col', j)
                .css('width', (100 / cols) + '%')
                .css('height', (100 / rows) + '%');
            
            $row.append($cell);
        }
        $table.append($row);
    }
    $board.append($table);
}

function renderizarPaletaColores(colors, showNumbers) {
    /* Accedemos al elemento del DOM y limpiamos su contenido */
    const $colors = $('#color-palette');
    $colors.empty();

    colors.forEach((color, index) => {
        const $colorBtn = $('<div></div>')
            .addClass('color-swatch')
            .css('background-color', color)
            .attr('data-color-index', index)
            .attr('data-color', color);
        
        if (showNumbers) {
            $colorBtn.append(`<span class="color-number">${index + 1}</span>`);
        }
        
        $colors.append($colorBtn);
    });
}

function renderizarImagenEjemplo(pattern, colors, config, rows, cols) {
    /* Accedemos al elemento del DOM y limpiamos su contenido */
    const $container = $('#reference-image-container');
    $container.empty();

    /* Se asigna el tamaño de las celdas y del tablero dinamicamente */
    const cellSize = GRID_SIZE / cols;
    const boardSize = cellSize * cols;
    
    /* Se establece el tamaño del contenedor y se crea la tabla */
    $container.css({
        'width': boardSize + 'px',
        'height': boardSize + 'px'
    });
    const $table = $('<table class="reference-grid"></table>')
        .css('width', '100%')
        .css('height', '100%');

    for (let i = 0; i < rows; i++) {
        const $row = $('<tr></tr>');
        
        for (let j = 0; j < cols; j++) {
            const colorIndex = pattern[i][j];
            const color = colors[colorIndex];
            
            const $cell = $('<td></td>')
                .addClass('reference-cell')
                .css('background-color', color)
                .css('width', (100 / cols) + '%')
                .css('height', (100 / rows) + '%');

            if (config.showGrid) {
                $cell.css('border', '1px solid #000');
            }
            
            if (config.showNumbers) {
                $cell.html(`<span class="ref-number">${colorIndex + 1}</span>`);
            }
            
            $row.append($cell);
        }
        
        $table.append($row);
    }
    
    $container.append($table);
}

function pintarCelda($cell) {
    const row = parseInt($cell.attr('data-row'));
    const col = parseInt($cell.attr('data-col'));
    const colorIndex = gameState.selectedColor.index;
    const colorHex = gameState.selectedColor.hex;
    
    if (gameState.playerGrid[row][col] === colorIndex) return;
    
    const correctColor = gameState.referencePattern[row][col];
    const wasCorrect = gameState.playerGrid[row][col] === correctColor;
    const isCorrect = colorIndex === correctColor;
    
    if (isCorrect && !wasCorrect) {
        gameState.levelScore++;
    } else if (!isCorrect && wasCorrect) {
        gameState.levelScore--;
    } else if (!isCorrect) {
        gameState.levelScore--;
        gameState.errors++;
    }
    
    gameState.playerGrid[row][col] = colorIndex;
    $cell.css('background-color', colorHex);
    actualizarPuntuacion();
    comprobarNivelCompletado();
}

/* EVENTOS */

function configurarEventos() {
    $(document).on('click', '.color-swatch', function() {
        $('.color-swatch').removeClass('selected');
        $(this).addClass('selected');
        
        gameState.selectedColor = {
            index: parseInt($(this).attr('data-color-index')),
            hex: $(this).attr('data-color')
        };
    });
    
    $(document).on('click', '.pixel-cell', function() {
        if (!gameState.selectedColor || gameState.isPaused) return;
        pintarCelda($(this));
    });
    
    $(document).on('mousedown', '.pixel-cell', function(e) {
        if (!gameState.selectedColor || gameState.isPaused) return;
        gameState.isDrawing = true;
        pintarCelda($(this));
        e.preventDefault();
    });
    
    $(document).on('mouseenter', '.pixel-cell', function() {
        if (gameState.isDrawing && gameState.selectedColor && !gameState.isPaused) {
            pintarCelda($(this));
        }
    });
    
    $(document).on('mouseup', function() {
        gameState.isDrawing = false;
    });
    
    $(document).on('keydown', function(e) {
        if (e.key === 'p' || e.key === 'P') {
            menuPausa();
        }
    });
    
    $('#next-level-btn').click(siguienteNivel);
    $('#retry-level-btn').click(reintentarNivel);
    $('#menu-btn, #menu-gameover-btn, #menu-victory-btn').click(irAlMenu);
    $('#restart-game-btn, #restart-victory-btn').click(reiniciarJuego);
}

function comprobarNivelCompletado() {
    const rows = gameState.playerGrid.length;
    const cols = gameState.playerGrid[0].length;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (gameState.playerGrid[i][j] !== gameState.referencePattern[i][j]) {
                return false;
            }
        }
    }
    
    nivelCompletado();
}

function nivelCompletado() {
    pararCuentaAtras();
    
    if (gameState.errors === 0 && GAME_CONFIG.difficulties[gameState.difficulty].timeBonus) {
        gameState.bonusTime = gameState.timer;
        $('#bonus-message').removeClass('hidden');
    } else {
        $('#bonus-message').addClass('hidden');
    }
    
    gameState.totalScore += Math.max(0, gameState.levelScore);
    mostarPanelNivelCompletado();
}

function empezarCuentaAtras() {
    const config = GAME_CONFIG.difficulties[gameState.difficulty];
    
    if (gameState.timer === 0) {
        gameState.timer = config.time;
    }
    
    gameState.timerInterval = setInterval(function() {
        if (!gameState.isPaused) {
            gameState.timer--;
            actualizarCuentaAtras();
            
            if (gameState.timer <= 0) {
                gameOver();
            }
        }
    }, 1000);
}

function pararCuentaAtras() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

function actualizarCuentaAtras() {
    const minutes = Math.floor(gameState.timer / 60);
    const seconds = gameState.timer % 60;
    $('#timer').text(`${minutes}:${seconds.toString().padStart(2, '0')}`);
}


function actualizarPuntuacion() {
    $('#score').text(gameState.totalScore + Math.max(0, gameState.levelScore));
}

function menuPausa() {
    gameState.isPaused = !gameState.isPaused;
    
    if (gameState.isPaused) {
        $('#pause-overlay').removeClass('hidden');
    } else {
        $('#pause-overlay').addClass('hidden');
    }
}

function mostarPanelNivelCompletado() {
    const maxPoints = gameState.referencePattern.length * gameState.referencePattern[0].length;
    
    $('#level-points').text(Math.max(0, gameState.levelScore));
    $('#max-points').text(maxPoints);
    $('#time-remaining').text(gameState.timer);
    $('#errors-count').text(gameState.errors);
    
    $('#level-complete-modal').removeClass('hidden');
}

function mostarPanelGameOver() {
    const levels = LEVELS_DATA[gameState.difficulty];
    
    $('#final-score').text(gameState.totalScore);
    $('#levels-completed').text(gameState.currentLevel);
    $('#best-level').text(gameState.currentLevel + 1);
    
    $('#game-over-modal').removeClass('hidden');
}

function mostarPanelVictoria() {
    $('#victory-score').text(gameState.totalScore);
    $('#total-time').text(formatearTiempoTotal());
    $('#total-errors').text(gameState.errors);
    
    $('#victory-modal').removeClass('hidden');
}

function formatearTiempoTotal() {
    const config = GAME_CONFIG.difficulties[gameState.difficulty];
    const totalTime = (config.timeLimit * LEVELS_DATA[gameState.difficulty].length) - gameState.timer;
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function siguienteNivel() {
    $('#level-complete-modal').addClass('hidden');
    cargarNivel(gameState.currentLevel + 1);
}

function reintentarNivel() {
    $('#level-complete-modal').addClass('hidden');
    gameState.timer = GAME_CONFIG.difficulties[gameState.difficulty].timeLimit;
    cargarNivel(gameState.currentLevel);
}

function reiniciarJuego() {
    $('.modal').addClass('hidden');
    gameState.currentLevel = 0;
    gameState.totalScore = 0;
    gameState.timer = 0;
    gameState.bonusTime = 0;
    
    cargarNivel(0);
    empezarCuentaAtras();
}

function irAlMenu() {
    pararCuentaAtras();
    window.location.href = 'menu.html';
}

function gameOver() {
    pararCuentaAtras();
    mostarPanelGameOver();
}