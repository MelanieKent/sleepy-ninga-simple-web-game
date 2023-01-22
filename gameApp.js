// import * as PIXI from 'pixi.js';//comment this out to run

const Application = PIXI.Application;

// game sound
var sound = new Howl({
    src: ['sound/Yugen_-_Emotional_Ethnic_Music.mp3']
 });
 sound.play(); 

//CONSTANTS 
var localServerName = 'http://127.0.0.1:5500/';         //change this to local server address to run the game

// game variablees
var gameWidth = 1200;
var gameHeight = 645;
var lineY = 365;
var cooldown = -1;
var obstacleSpeed = 13;
var gameOver = false;
var counter = -1;
var finalScore = 0;
var hasGameStarted = false;
var ninjaNum = 0;
var ninja = 'purple.png';

//launching application
const app = new Application({
   width: gameWidth,
   height: gameHeight,
});
app.renderer.background.color = 0xFF1FFF;
const Graphics = PIXI.Graphics;
document.body.appendChild(app.view); // show the application

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
const trackSprite = new PIXI.TilingSprite(trackTexture,);
trackSprite.width = 2400;
trackSprite.height = 150;
trackSprite.tileScale.set(0.5, 0.5);
trackSprite._anchor.set(0.5, 0,5);
trackSprite.position.set(0,493);

// for the background frame to move
app.ticker.add(function() {
   trackSprite.tilePosition.x -= 6;
})
app.stage.addChild(trackSprite);


// obstacle ninja star
const ninjaStar = new Graphics();
ninjaStar.beginFill(0x888888);
ninjaStar.drawStar(0, 0, 8, 35);
ninjaStar.endFill();
app.stage.addChild(ninjaStar); 


// Score text
const style = new PIXI.TextStyle({
   fontFamily: 'Papyrus',
   fontSize: 50,
   fill: 0xf0960e
});

const myText = new PIXI.Text('Score: ' + counter, style);
myText.x = 940;
myText.y = 20;
app.stage.addChild(myText);


// Pause Screen
const pauseScreen = new Graphics();
pauseScreen.beginFill(0x000000)
.drawRect(0, 0, 1200, 645)
.endFill();

// Pause Text
const pauseText = new PIXI.Text('Game Paused');
pauseText.x = 320;
pauseText.y = 240;
pauseText.style.fill = 0xf0960e;
pauseText.style.fontSize = 100;
pauseText.style.fontFamily = 'Papyrus';

// Player and randomly choosing a player
var characterSelector = Math.floor(Math.random() * 4);
if (characterSelector == 0) {
   ninja = 'purple.png';
}
if (characterSelector == 1) {
   ninja = 'green.png';
}
if (characterSelector == 2) {
   ninja = 'red.png';
}
if (characterSelector == 3) {
   ninja = 'naruto.png';
}

var playerTexture = PIXI.Texture.from(localServerName + '//images/' + ninja);
var playerSprite = new PIXI.Sprite(playerTexture);
playerSprite.scale.set(1, 1);
playerSprite.x = 100;
playerSprite.y = 420;
app.stage.addChild(playerSprite);

const beginTexture = PIXI.Texture.from(localServerName + '//images/intro.png');
const beginSprite = new PIXI.Sprite(beginTexture);
beginSprite.width = 1300;
beginSprite.x = -60;
beginSprite.y = -20;
beginSprite.height = app.screen.height;
app.stage.addChild(beginSprite);


// Begin text
const beginText = new PIXI.Text('Welcome to Sleepy Ninja!');
beginText.x = 240;
beginText.y = 40;
beginText.style.fill = 0xf0960e;
beginText.style.align = 'center'
beginText.style.fontSize = 60;;
beginText.style.fontFamily = 'Papyrus';

app.stage.addChild(beginText);

// keyboard events
document.addEventListener('keydown', function(e) {

    if (e.key == ' ' && cooldown <= 0) {                      // space key to jump
        playerSprite.y -= 400;
        cooldown = 30;
    } else if (e.key == 'p') {                                // key: p to pause the game
         if (gameOver) {                                      //if paused, unpause
            gameOver = false;
            app.stage.removeChild(pauseScreen);
            app.stage.removeChild(pauseText);
            playerSprite.y = 400;
            obstacleSpeed = 13;
         } else {                                             // pauses game, if unpaused
            app.stage.addChild(pauseScreen);
            app.stage.addChild(pauseText);
            gameOver = true;
            playerSprite.y = 1000;
            obstacleSpeed = 0;
         }
   } 
   else if (!hasGameStarted && e.key == 'Enter') {             // Enter key to start the game
      hasGameStarted = true;
      app.stage.removeChild(beginSprite);
      app.stage.removeChild(instructions);
      app.stage.removeChild(storyText);
      app.stage.removeChild(beginText);
   }
})

// Game Over Text
const ggText = new PIXI.Text('Game Over');
ggText.x = 320;
ggText.y = 200;
ggText.style.fill = 0xCD1515;
ggText.style.fontSize = 100;
ggText.style.fontFamily = 'Papyrus';

// Game Over Screen
const gameOverScreen = new Graphics();
gameOverScreen.beginFill(0x000000)
.drawRect(0, 0, 1200, 645)
.endFill();


//Begin story text
const storyText = new PIXI.Text('Thrice upon a time, our incredible ninjas decided to attend a hackathon.' + 
' After winning, some other salty ninjas decide to take them out. In order to \n get home and sleep after' + 
' a long night of coding, our heroic ninjas must dodge \n incoming attacks to escape.');
storyText.x = 190;
storyText.y = 150;
storyText.style.fontSize = 22;
storyText.style.align = "center";
storyText.style.fill = 0xf0960e;
storyText.style.wordWrap = true;
storyText.style.wordWrapWidth = 900;
storyText.style.fontFamily = 'Papyrus';
app.stage.addChild(storyText);

//Begin story Instructions
const instructions = new PIXI.Text('Press \'Enter\' to start playing.\nPress \'P\' to pause the game.\nPress \'Space bar\' to jump.');
instructions.x = 490;
instructions.y = 300;
instructions.style.align = "center";
instructions.style.fill = 0xf0960e;
instructions.style.fontSize = 16;
instructions.style.wordWrap = true;
instructions.style.wordWrapWidth = 900;
instructions.style.fontFamily = 'Papyrus';
app.stage.addChild(instructions);


// making player interactive
playerSprite.interactive = true;


// loop for the game
app.ticker.add(() => {
   if (!hasGameStarted) {
      return;
   }
   
    if (playerSprite.y < 420) {
        playerSprite.y += 15;           // gravity, player.y falling down at speed 15;
    }

    // prevent double jump
    cooldown--;

    // making the box move left with speed between [15,25]
    ninjaStar.x -= obstacleSpeed;

    // rotate the obstacle
    ninjaStar.rotation += -0.1;

    // ninja jumps over ninja star
    if (ninjaStar.x < -10 && !gameOver) {
      if (counter == -1) {
         ninjaStar.x = 2000;
         counter += 1;
         myText.text = "Score: " + counter;
         ninjaStar.y = 550;
         return;
      }
      counter += 1;                                // increment the score
      myText.text = "Score: " + counter;
      ninjaStar.x = 1300;
      var tmpRandom = Math.random();
      if (tmpRandom < 0.8) {
         ninjaStar.y = 550;
      } else {
         ninjaStar.y = 300;
      }
      if (counter <= 15) {
         obstacleSpeed = (Math.random() * 15) + 15;        // random obstacle speed
         if (tmpRandom < 0.05) {
            obstacleSpeed = (Math.random() * 20) + 30;
         }
      }

      if (counter > 15) {
         obstacleSpeed = (Math.random() * 15) + 25;        // when reach 15 obstacle speed faster
         if (tmpRandom < 0.05) {
            obstacleSpeed = (Math.random() * 20) + 40;
         }
      }

    }

   if (checkCollision(playerSprite, ninjaStar)) {        // checking collision
     gameOver = true;
     finalScore = counter;
     app.stage.addChild(gameOverScreen);
     app.stage.addChild(ggText);

     const scoreText = new PIXI.Text('Your Score: ' + counter, style);
     scoreText.x = 440;
     scoreText.y = 360;
     app.stage.addChild(scoreText);

     const resetText = new PIXI.Text('Press \'r\' to restart');
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

// checks overlapping for rectangle and circle
function checkCollision(rect, circle) {
   
   // Get the center coordinates of the circle
   var cx = circle.x;
   var cy = circle.y;

   // Get the distance between the center of the circle and the rectangle
   var dx = Math.abs(cx - rect.x - rect.width / 2);
   var dy = Math.abs(cy - rect.y - rect.height / 2);
   // Check if the distance is less than the radius of the circle
   if (dx < rect.width / 2 + circle.width / 2 && dy < rect.height / 2 + circle.height / 2) {
       return true;
   }
   return false;
}


