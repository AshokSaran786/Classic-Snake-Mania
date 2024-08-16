const foodEatSound = new Audio("FoodEat.wav");
const dirChangeSound = new Audio("DirChange.wav");
const inGameMusic = new Audio("Music.mp3");
const gameOverSound = new Audio("GameOver.wav");
let speed;
let score = 0;
localStorage.setItem("hiScore", 0)
let lastDisplayTime = 0;
let velocity = { x: 0, y: 0 }
let snakeArr = [{ x: 10, y: 10 }];
let a;
let b;
let level = prompt("Select Level(Easy, Medium, Hard, God)", "Medium");
if (level == "Easy") {
    speed = 6;
    a = 3;
    b = 17;
}
if (level == "Medium") {
    speed = 9;
    a = 2;
    b = 18
}
if (level == "Hard") {
    speed = 12;
    a = 1;
    b = 19;
}
if (level == "God") {
    speed = 20;
    a = 0;
    b = 20
}
let food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastDisplayTime) / 1000 < 1 / speed) {
        return;
    }
    lastDisplayTime = ctime;
    engine();
}
function gameOver(sa) {
    if (sa[0].x > 20 || sa[0].x <= 0 || sa[0].y > 20 || sa[0].y <= 0) {
        return true;
    }
    for (let i = 1; i < sa.length; i++) {
        if (sa[i].x === sa[0].x && sa[i].y === sa[0].y) {
            return true;
        }

    }
}
function engine() {
    inGameMusic.play();
    // display snake, score and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeBody = document.createElement('div');
        if (index === 0) {
            snakeBody.classList.add('snakeHead')
        }
        else {
            snakeBody.classList.add('snakeBody');
        }
        snakeBody.style.gridRowStart = e.y;
        snakeBody.style.gridColumnStart = e.x;
        board.appendChild(snakeBody);
    })
    foodBody = document.createElement('div');
    foodBody.classList.add('food');
    foodBody.style.gridRowStart = food.y;
    foodBody.style.gridColumnStart = food.x;
    board.appendChild(foodBody);
    if (score > localStorage.getItem("hiScore")) {
        localStorage.setItem("hiScore", score);
    }
    scoreDisplay.innerHTML = "Score: " + score + "<br>Hi-Score:" + localStorage.getItem("hiScore");
    // update snake, score and food
    if (gameOver(snakeArr)) {
        gameOverSound.play();
        inGameMusic.pause();
        if (score == localStorage.getItem("hiScore")){
            alert("Game Over!\n" + "Congratulations!\nNew High Score: " + score);
        }
        else {
            alert("Game Over!\n" + "Your Score: " + score);
        }
        snakeArr = [{ x: 10, y: 10 }];
        velocity = { x: 0, y: 0 }
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score = 0;
    }
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodEatSound.play();
        score++;
        snakeArr.unshift({ x: snakeArr[0].x + velocity.x, y: snakeArr[0].y + velocity.y });
        let a = 2;
        let b = 18;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += velocity.x;
    snakeArr[0].y += velocity.y;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    velocity = { x: 0, y: 1 }
    dirChangeSound.play();
    switch (e.key) {
        case "ArrowUp":
            velocity.x = 0;
            velocity.y = -1;
            break;
        case "ArrowDown":
            velocity.x = 0;
            velocity.y = 1;
            break;
        case "ArrowRight":
            velocity.x = 1;
            velocity.y = 0;
            break;
        case "ArrowLeft":
            velocity.x = -1;
            velocity.y = 0;
            break;

        default:
            break;
    }
})