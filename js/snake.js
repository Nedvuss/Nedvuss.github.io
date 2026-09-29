window.snakeData = [];
window.food = {};
window.dx = 20;
window.dy = 0;
window.score = 0;
window.gameLoop = null;
window.gameSpeed = 100;

function initSnakeEvents() {
    const snakeModal = document.getElementById('snake-modal');
    const closeSnakeBtn = document.getElementById('close-snake');
    
    let secretCode = ['s', 'n', 'a', 'k', 'e'];
    let currentCodePosition = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === secretCode[currentCodePosition]) {
            currentCodePosition++;
            if (currentCodePosition === secretCode.length) {
                window.initSnakeGame();
                currentCodePosition = 0;
            }
        } else {
            currentCodePosition = 0;
        }

        if (snakeModal && !snakeModal.classList.contains('modal-hidden')) {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault(); 
            }

            const goingUp = window.dy === -20;
            const goingDown = window.dy === 20;
            const goingRight = window.dx === 20;
            const goingLeft = window.dx === -20;

            if (e.key === 'ArrowLeft' && !goingRight) { window.dx = -20; window.dy = 0; }
            if (e.key === 'ArrowUp' && !goingDown) { window.dx = 0; window.dy = -20; }
            if (e.key === 'ArrowRight' && !goingLeft) { window.dx = 20; window.dy = 0; }
            if (e.key === 'ArrowDown' && !goingUp) { window.dx = 0; window.dy = 20; }
        }
    });

    if (closeSnakeBtn) {
        closeSnakeBtn.addEventListener('click', closeSnakeGame);
    }
}

window.initSnakeGame = function() {
    const snakeModal = document.getElementById('snake-modal');
    const scoreElement = document.getElementById('snake-score');
    
    snakeModal.classList.remove('modal-hidden');
    snakeModal.classList.add('modal-active');

    window.snakeData = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];
    window.score = 0;
    window.dx = 20;
    window.dy = 0;
    if(scoreElement) scoreElement.innerText = window.score;
    createFood();

    if (window.gameLoop) clearInterval(window.gameLoop);
    window.gameLoop = setInterval(runSnakeGame, window.gameSpeed);
}

function closeSnakeGame() {
    const snakeModal = document.getElementById('snake-modal');
    snakeModal.classList.add('modal-hidden');
    snakeModal.classList.remove('modal-active');
    clearInterval(window.gameLoop);
}

function runSnakeGame() {
    const canvas = document.getElementById('snake-game');
    const ctx = canvas ? canvas.getContext('2d') : null;
    
    if (hasGameEnded(canvas)) {
        clearInterval(window.gameLoop);
        ctx.fillStyle = 'red';
        ctx.font = '30px "Share Tech Mono"';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        return;
    }

    clearCanvas(canvas, ctx);
    drawFood(ctx);
    advanceSnake();
    drawSnake(ctx);
}

function clearCanvas(canvas, ctx) {
    ctx.fillStyle = '#0a0a0a';
    ctx.strokeStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(ctx) {
    window.snakeData.forEach(part => drawSnakePart(part, ctx));
}

function drawSnakePart(snakePart, ctx) {
    ctx.fillStyle = '#00ff41';
    ctx.strokeStyle = '#008f11';
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function advanceSnake() {
    const head = { x: window.snakeData[0].x + window.dx, y: window.snakeData[0].y + window.dy };
    window.snakeData.unshift(head);

    const hasEatenFood = window.snakeData[0].x === window.food.x && window.snakeData[0].y === window.food.y;
    if (hasEatenFood) {
        window.score += 10;
        const scoreElement = document.getElementById('snake-score');
        if(scoreElement) scoreElement.innerText = window.score;
        createFood();
    } else {
        window.snakeData.pop();
    }
}

function drawFood(ctx) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';
    ctx.fillRect(window.food.x, window.food.y, 20, 20);
    ctx.strokeRect(window.food.x, window.food.y, 20, 20);
}

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function createFood() {
    const canvas = document.getElementById('snake-game');
    let onSnake;
    do {
        onSnake = false;
        window.food.x = randomTen(0, canvas.width - 20);
        window.food.y = randomTen(0, canvas.height - 20);
        for (let i = 0; i < window.snakeData.length; i++) {
            if (window.snakeData[i].x === window.food.x && window.snakeData[i].y === window.food.y) {
                onSnake = true;
                break;
            }
        }
    } while (onSnake);
}

function hasGameEnded(canvas) {
    for (let i = 4; i < window.snakeData.length; i++) {
        if (window.snakeData[i].x === window.snakeData[0].x && window.snakeData[i].y === window.snakeData[0].y) return true;
    }
    const hitLeftWall = window.snakeData[0].x < 0;
    const hitRightWall = window.snakeData[0].x >= canvas.width;
    const hitTopWall = window.snakeData[0].y < 0;
    const hitBottomWall = window.snakeData[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}
