const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 5;

let tileCount = 20;
let tileSize = canvas.width/ tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2
let score = 0;
let time = 0
let appleX = 5;
let appleY = 5;
let xSpeed = 0;
let ySpeed = 0;

function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    checkAppleCollison();
    drawApple();
    drawSnake();
    drawScore();
    drawSpeed();
    setTimeout(drawGame, 1000/ speed);
}

function drawSpeed(){
    ctx.fillStyle = "white"
    ctx.font = "10px Verdana"
    ctx.fillText("Speed " + speed, canvas.width-390, 10);
}

function isGameOver(){
    let gameOver = false;
    
    if(ySpeed ===0 && xSpeed ===0){
        return false;
    }
    
    if(headX < 0){
        gameOver = true;
    }
    else if(headX>=tileCount){
        gameOver = true
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY>=tileCount){
        gameOver = true
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        if(part.x === headX && part.y ===headY){
            gameOver = true;
            break;
        }
    }
    if(gameOver){
        ctx.fillStyle = "White"
        ctx.font = "50px Verdana"

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop("0", "orange")
        gradient.addColorStop("0.5", "red")
        gradient.addColorStop("1","black")

        ctx.fillStyle = gradient;

        ctx.fillText("You Suck!!!!",canvas.width/6.5, canvas.height/2);
    }
    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "white"
    ctx.font = "10px Verdana"
    ctx.fillText("Score " + score, canvas.width-50, 10);
}

function clearScreen(){
    ctx.fillStyle = 'Navy';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function drawSnake(){
    ctx.fillStyle = 'MediumBlue'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
    ctx.fillStyle = 'MidnightBlue'
    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new snakePart(headX, headY));
    while(snakeParts.length > tailLength)
    {
        snakeParts.shift();
    }
}

function changeSnakePosition(){
    headX = headX + xSpeed;
    headY = headY + ySpeed;
    if(ySpeed == 0 && xSpeed == 0)
    return;
    speed += 0.01
}

function drawApple(){
    ctx.fillStyle = "Indigo";
    ctx.fillRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize)
}

function checkAppleCollison(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++;
        score++;
        speed += .1;
    }
}

document.body.addEventListener('keydown', keydown)

function keydown(event){
    if (event.keyCode == 38){
        if(ySpeed == 1)
        return;
        ySpeed = -1;
        xSpeed = 0;
        speed += 0.05;
    }
    if (event.keyCode == 40){
        if(ySpeed == -1)
        return;
        ySpeed = 1;
        xSpeed = 0;
        speed += 0.05;
    }
    if (event.keyCode == 37){
        if(xSpeed == 1)
        return;
        ySpeed = 0;
        xSpeed = -1;
        speed += 0.05;
    }
    if (event.keyCode == 39){
        if(xSpeed == -1)
        return;
        ySpeed = 0;
        xSpeed = 1;
        speed += 0.05;
    }
}

drawGame();