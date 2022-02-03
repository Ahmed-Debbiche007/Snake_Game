const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const div = document.getElementById('div');
const reload = document.createElement("button");

const Sound = new Audio('src/assets/Sound/sound.mp3');
const Sound1 = new Audio('src/assets/Sound/glup.mp3');

class SnakePart {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

let speed = 8

let tileCount = 20
let tileSize = canvas.width / tileCount - 2

let headX = 9
let headY = 9
const snakeParts = []
let tailLength = 1

let appleX = Math.floor(Math.random() * tileCount)
let appleY = Math.floor(Math.random() * tileCount)

let inputsXVelocity = 0
let inputsYVelocity = 0

let xVelocity = 0
let yVelocity = 0

let score = 0
let r = 0;

export const drawGame = () => {
    xVelocity = inputsXVelocity
    yVelocity = inputsYVelocity

    changeSnakePosition();

    let result = isGameOver()
    if (result) return;


    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    if (score > 5) speed = 9;

    if (score > 10) speed = 15;


    setTimeout(drawGame, 1000 / speed)
}

function isGameOver() {
    let gameOver = false

    if (yVelocity === 0 && xVelocity === 0) {
        return false
    }

    //walls
    if (headX < 0) {
        gameOver = true
    } else if (headX === tileCount) {
        gameOver = true
    } else if (headY < 0) {
        gameOver = true
    } else if (headY === tileCount) {
        gameOver = true
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        if (part.x === headX && part.y === headY) {
            gameOver = true
            break
        }
    }

    if (gameOver) {
        ctx.fillStyle = 'black'
        ctx.font = '50px Verdana'

        if (gameOver) {
            r = 1;
            reload.innerHTML = ' <h1>Reload</h1>';
            div.appendChild(reload);
            ctx.fillStyle = 'black'
            ctx.font = '50px Verdana'
            ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2)
            Sound.play()
        }

        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2)
    }

    return gameOver
}

function drawScore() {
    ctx.fillStyle = 'black'
    ctx.font = '20px Verdana'
    ctx.fillText('Score ' + score, canvas.width - 80, 15)
}

function clearScreen() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake() {
    ctx.fillStyle = 'black'
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY))
    while (snakeParts.length > tailLength) {
        snakeParts.shift()
    }

    ctx.fillStyle = 'black'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition() {
    headX = headX + xVelocity
    headY = headY + yVelocity
}

function drawApple() {
    ctx.fillStyle = 'green'
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if (appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++
        score++
        Sound1.play()
    }
}


export const keyDown = (event) => {
    if (event.keyCode == 38 || event.keyCode == 90) {
        if (inputsYVelocity == 1) return
        inputsYVelocity = -1
        inputsXVelocity = 0
    }

    if (event.keyCode == 40 || event.keyCode == 83) {
        if (inputsYVelocity == -1) return
        inputsYVelocity = 1
        inputsXVelocity = 0
    }

    if (event.keyCode == 37 || event.keyCode == 81) {
        if (inputsXVelocity == 1) return
        inputsYVelocity = 0
        inputsXVelocity = -1
    }

    if (event.keyCode == 39 || event.keyCode == 68) {
        if (inputsXVelocity == -1) return
        inputsYVelocity = 0
        inputsXVelocity = 1
    }
}
reload.addEventListener('click', () => location.reload());
