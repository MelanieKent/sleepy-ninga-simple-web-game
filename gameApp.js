const Application = PIXI.Application;


//CONSTANTS
var localServerName = 'http://127.0.0.1:5500';
var gameWidth = 1200;
var gameHeight = 645;
var lineY = 365;


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


// background
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





// background
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
   trackSprite.tilePosition.x -= 2.5;

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
obstacle1.beginFill(0xFFFFFF)
.drawPolygon([
  obstacle1position, 450,
  obstacle1position + 150, 400,
  obstacle1position + 200, 500,
  obstacle1position - 50, 500
])
.endFill();


const obstacle2 = new Graphics();
obstacle2.beginFill(0xFFFFFF);
obstacle2.drawRect(50, 400, 100, 100);
obstacle2.endFill();


const obstacle3 = new Graphics();
obstacle3.beginFill(0xFFFFFF)
.drawEllipse(775, 500, 100, 50)
.endFill();


//player
const playerTexture = PIXI.Texture.from(localServerName + '//images/player.png');
const playerSprite = new PIXI.Sprite(playerTexture);
playerSprite.scale.set(1, 1);
playerSprite.x = 100;
playerSprite.y = 300
app.stage.addChild(playerSprite);


playerSprite.interactive = true;


app.ticker.add(delta => loop(delta));


function loop(delta) {
   playerSprite.y -= 1;
   if (playerSprite.y >= 200) {
       playerSprite.y == 200;
   }
}


// document.addEventListener('keydown', function(e) {
//     if (e.key == 'ArrowUp') {
//         while (playerSprite.y >= 200) {
//             playerSprite.y -= 10;
//             //need buffer
//         }
//         // player.y is at 195 right here


//         if (playerSprite.y <= 200) {
//             while (playerSprite.y <= 200) {
//                 playerSprite.y += 10;
//                 if(playerSprite.y >= 365) {
//                     break;
//                 }
//             }
//         }
//     }
// })





