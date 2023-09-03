//Game constants & variable
let inputDir= {x:0,y:0}; //origin top left x+=->, y+=downwards
const foodSound= new Audio("music/food.mp3");
const gameOverSound= new Audio("music/gameover.mp3");
const moveSound= new Audio("music/move.mp3");
const musicSound= new Audio("music/music.mp3");
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr=[
    {x: 13, y: 15}
]// snake head location
food = {x: 6, y: 7} //food is an object

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main); 
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    } //to make fps slow i.e. av render nii chaihye
    lastPaintTime=ctime;  // jb condition false
    // av do your work
    gameEngine();
}

function isCollide(snake){
    //If you bump into youself
    for(let i=1; i< snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //If you bump into wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
}

function gameEngine()
{
    //Part 1: Updating the snake array & food i.e. changing positoin of snake
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over, press any key to play again");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            HighScoreBox.innerHTML = "High Score: " + highscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2: Render/(Display as html element) the snake 
      board.innerHTML="";
     //snake array mein jitte v objects hain
      snakeArr.forEach((e,index)=>{
           snakeElement=document.createElement('div'); //initial object head mein as it eats food , head mein ek ek element add hota , thus create new element
           snakeElement.style.gridRowStart= e.y;       // place element in row . Now, .y becoz upr se distance is y (konse row no pe daaln , we count upr se 1,2,3,4...) , therefore NOT.x
           snakeElement.style.gridColumnStart=e.x;
           if(index === 0){
            snakeElement.classList.add('head');
           }
           else{
            snakeElement.classList.add('snake'); //snakeelement ko class mein daal diya coz hr element mein css add krne se better class mein add krdo
           }
           board.appendChild(snakeElement);
        })
    //Part 3: Display the food
           foodElement=document.createElement('div'); //initial object head mein as it eats food , head mein ek ek element add hota , thus create new element
           foodElement.style.gridRowStart= food.y;       // place element in row . Now, .y becoz upr se distance is y (konse row no pe daaln , we count upr se 1,2,3,4...) , therefore NOT.x
           foodElement.style.gridColumnStart=food.x;
           foodElement.classList.add('food'); //snakeelement ko class mein daal diya coz hr element mein css add krne se better class mein add krdo
           board.appendChild(foodElement);         

}






//main logic starts here
musicSound.play();
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    HighScoreBox.innerHTML = "High Score: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
      inputDir={x:0 , y:1} //Start the game
      moveSound.play();
      switch(e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        
        default:
            break;
                
      }
});