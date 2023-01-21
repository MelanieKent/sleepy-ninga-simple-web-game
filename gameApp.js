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

//the whole game area in which the game is played
const playArea = new Graphics();
playArea.beginFill(0x00008B);
playArea.drawRect(gameWidth/2 - 1200/2, gameHeight/2 - 1000/2, 1200, 1000);
playArea.endFill();
// playArea.position(200, 200);

app.stage.addChild(playArea);

document.body.appendChild(app.view);


//player
const playerTexture = PIXI.Texture.from(localServerName + '//images/player.png');
const playerSprite = new PIXI.Sprite(playerTexture);
playerSprite.scale.set(0.05, 0.05);
playerSprite.x = 100;
playerSprite.y = 300
app.stage.addChild(playerSprite);

//obstacles
const obstacle1 = new Graphics();
obstacle1.beginFill(0xFFFFFF)
.drawPolygon([
   450, 450,
   600, 400,
   650, 500,
   400, 500
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


//line
const line =  new Graphics();
line.lineStyle(20, 0x000000,1)
.moveTo(0,lineY)
.lineTo(gameWidth,lineY);

app.stage.addChild(obstacle1);
app.stage.addChild(obstacle2);
app.stage.addChild(obstacle3);

app.stage.addChild(line);

playerSprite.interactive = true;

playerSprite.on('pointerdown', function() {
    playerSprite.scale.x += 0.1;
    playerSprite.scale.y += 0.1;
});

// app.stage.addChild(playArea);

// app.stage.addChild(obstacle1);

// app.stage.addChild(obstacle2);

// app.stage.addChild(obstacle3); 





// document.body.appendChild(playerSprite);

