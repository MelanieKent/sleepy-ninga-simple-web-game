// import * as PIXI from 'pixi.js';//comment this out to run

const Application = PIXI.Application;




//CONSTANTS
var localServerName = 'http://127.0.0.1:5500/';
var gameWidth = 1200;
var gameHeight = 645;
var lineY = 365;
var cooldown = -1;
var obstacleSpeed = 13;
var gameOver = false;
var counter = -1;
var finalScore = 0;


//launching application
const app = new Application({
   width: gameWidth,
   height: gameHeight,
});
app.renderer.background.color = 0xFF1FFF;


const Graphics = PIXI.Graphics;


// show the stuff
document.body.appendChild(app.view);


//the whole game area in which the game is played
const playArea = new Graphics();
playArea.beginFill(0x00008B);
playArea.drawRect(gameWidth/2 - 1200/2, gameHeight/2 - 1000/2, 1200, 1000);
playArea.endFill();

app.stage.addChild(playArea);

// background buidlings
const backTexture = PIXI.Texture.from(localServerName + '//images/back.jpg');
const backSprite = new PIXI.TilingSprite(
   backTexture,
   app.screen.width,
   app.screen.height,
   );
backSprite.tileScale.set(0.5, 0.5);




// for the background frame
app.ticker.add(function() {
   backSprite.tilePosition.x -= 0.5;
})


app.stage.addChild(backSprite);


// background track
const trackTexture = PIXI.Texture.from(localServerName + '//images/track.jpg');
const trackSprite = new PIXI.TilingSprite(
   trackTexture,
   );


trackSprite.width = 2400;
trackSprite.height = 150;
trackSprite.tileScale.set(0.5, 0.5);
trackSprite._anchor.set(0.5, 0,5);
trackSprite.position.set(0,493);


// for the background frame
app.ticker.add(function() {
   trackSprite.tilePosition.x -= 6;


})


app.stage.addChild(trackSprite);


//shape
var obstacle1position;
obstacle1position = 450;
var obstacle1position;
obstacle1position = 50;
var obstacle1position;
obstacle1position = 775;




const obstacle1 = new Graphics();
obstacle1.beginFill(0x1bcfcc)
.drawPolygon([
  obstacle1position, 450,
  obstacle1position + 150, 400,
  obstacle1position + 200, 500,
  obstacle1position - 50, 500
])
.endFill();


const obstacle2 = new Graphics();
obstacle2.beginFill(0x888888);
obstacle2.drawStar(0, 0, 8, 35);
obstacle2.endFill();


const obstacle3 = new Graphics();
obstacle3.beginFill(0x1bcfcc)
.drawEllipse(775, 500, 100, 50)
.endFill();


//player
const playerTexture = PIXI.Texture.from(localServerName + '//images/ninja.png');
const playerSprite = new PIXI.Sprite(playerTexture);
playerSprite.scale.set(1, 1);
playerSprite.x = 100;
playerSprite.y = 420;
app.stage.addChild(playerSprite);


playerSprite.interactive = true;



//Pause  Screen
const pauseScreen = new Graphics();
pauseScreen.beginFill(0x000000)
.drawRect(0, 0, 1200, 645)
.endFill();

//Pause Over Screen
const pauseText = new PIXI.Text('Game Paused');
pauseText.x = 320;
pauseText.y = 240;
pauseText.style.fill = 0xCD1515;
pauseText.style.fontSize = 100;
pauseText.style.fontFamily = 'Papyrus';

// keyboard events
document.addEventListener('keydown', function(e) {
    if (e.key == ' ' && cooldown <= 0) {
        playerSprite.y -= 400;
        cooldown = 30;
    }
    else if (e.key == 'p') {
      if (gameOver) {
         
         //if paused, unpause
         gameOver = false;
         app.stage.removeChild(pauseScreen);
         app.stage.removeChild(pauseText);
         //resets player and obstacle
         playerSprite.y = 400;
         obstacle2.x = 1500;
         
      } else {
         //pauses game, if unpaused
         app.stage.addChild(pauseScreen);
         app.stage.addChild(pauseText);
         gameOver = true;
         playerSprite.y = 1000;
      }
   }
   
})

const style = new PIXI.TextStyle({
   fontFamily: 'Papyrus',
   fontSize: 50,
   fill: 0xf0960e
});

const myText = new PIXI.Text('Score: ' + counter, style);
myText.x = 940;
myText.y = 20;
app.stage.addChild(myText);


//Game Over Screen
const ggText = new PIXI.Text('Game Over');
ggText.x = 320;
ggText.y = 200;
ggText.style.fill = 0xCD1515;
ggText.style.fontSize = 100;
ggText.style.fontFamily = 'Papyrus';


const gameOverScreen = new Graphics();
gameOverScreen.beginFill(0x000000)
.drawRect(0, 0, 1200, 645)
.endFill();
//


// gravity and jumping
app.ticker.add(() => {
    if (playerSprite.y < 420) {
        playerSprite.y += 15; // gravity, player.y falling down at speed 1;
    }


    // prevent double jump
    cooldown--;


    // making the box move left with speed between [15,25]
    obstacle2.x -= obstacleSpeed;


    if (obstacle2.x < -10 && !gameOver) {
      if (counter == -1) {
         obstacle2.x = 2000;
         counter += 1;
         myText.text = "Score: "+ counter;
         obstacle2.y = 550;
         return;
      }
      counter += 1;
      myText.text = "Score: "+ counter;
      obstacle2.x = 1300;
      var tmpRandom = Math.random();
      if (tmpRandom < 0.5) {
         obstacle2.y = 550;
      } else {
         obstacle2.y = 300;
      }
      obstacleSpeed = (Math.random() * 10) + 15;
      if (tmpRandom < 0.05) {
         obstacleSpeed = (Math.random() * 10) + 25;
      }
    }


   if (checkCollision(playerSprite, obstacle2)) {
     gameOver = true;
     finalScore = counter;
     app.stage.addChild(gameOverScreen);
     app.stage.addChild(ggText);

     const scoreText = new PIXI.Text('Your Score: ' + counter, style);
     scoreText.x = 440;
     scoreText.y = 360;
     app.stage.addChild(scoreText);

     const resetText = new PIXI.Text('Press r to restart');
     resetText.x = 510;
     resetText.y = 430;
     resetText.style.fontSize = 25;
     resetText.style.fontFamily = 'Papyrus';
     resetText.style.fill = 0xf0960e;
     app.stage.addChild(resetText);

     document.addEventListener('keydown', function(e) {
      if (e.key == 'r' && cooldown <= 0) {
          window.location.reload();
      }
     
  })


   }
});

/** #####################################################################
 * USED CHATGPT TO FIGURE OUT CODE FOR INTERSECTION OF RECTANGLE AND CIRCLE
 * ######################################################################
 **/


function checkCollision(rect, circle) {
   
   // Get the center coordinates of the circle
   var cx = circle.x;
   var cy = circle.y;


   // if (cx == rect.x && cy == rect.y) {
   //    return true;
   // }
   // Get the distance between the center of the circle and the rectangle
   var dx = Math.abs(cx - rect.x - rect.width / 2);
   var dy = Math.abs(cy - rect.y - rect.height / 2);
   // Check if the distance is less than the radius of the circle
   if (dx < rect.width / 2 + circle.width / 2 && dy < rect.height / 2 + circle.height / 2) {
       return true;
   }
   return false;
}

app.stage.addChild(obstacle2); 