import { drawGame, keyDown } from "./utils.js";

const snake = document.getElementById('play');
const onClick = () => {
    snake.outerHTML = '';
    drawGame();
}

document.body.addEventListener('keydown', keyDown);
snake.addEventListener('click', onClick);
reload.addEventListener('click', () => location.reload());