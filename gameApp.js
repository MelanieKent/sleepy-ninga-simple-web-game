const Application = PIXI.Application;

//CONSTANTS
var localServerName = 'http://127.0.0.1:5500';
var gameWidth = 1200;
var gameHeight = 500;
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

// bakcground
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
