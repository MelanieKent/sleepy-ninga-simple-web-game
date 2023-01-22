const Application = PIXI.Application;

const app = new Application({
    width: 1000,
    height: 1000,
    // transparent: false,
    antialias: true
});

app.renderer.background.color = 0x7984d1;

// remove line below to render height and width 1000px
app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

// rectangle is just the name given to the object, can be anything
const rectangle = new Graphics();
rectangle.beginFill(0x411e85);
rectangle.lineStyle(4, 0xa330c9, 1); // add outline
rectangle.drawRect(200, 200, 100, 120); // x and y position of the rectangle, folloed by the width and height, 200 200 is top left point of rectangle
rectangle.endFill();

// to display rectangle on canvas
app.stage.addChild(rectangle);


const poly = new Graphics();
poly.beginFill(0x30c994);
poly.drawPolygon([
    600, 50, 
    800, 150, 
    900, 300, 
    400, 400
]) // each pair of points represents the coordinates of one of the corners of the polygon
poly.endFill();

app.stage.addChild(poly);

const circle = new Graphics();

circle.beginFill(0xde9910)
.drawCircle(440, 200, 80)
.endFill(); // coordinates above represent the x and y coordinates as well as the radius

app.stage.addChild(circle);
// the order in which you put the shapes on the stage determines how they overlay

const line = new Graphics();
line.lineStyle(5, 0xdec610, 1)
.moveTo(1500, 100)
.lineTo(1500, 800); // moveTo specifies the first coordinate of the line, lineTo specifies the last coordinate

app.stage.addChild(line);

const torus = new Graphics();
torus.beginFill(0x0a1461)
.drawTorus(100, 700, 80, 100, 0, Math.PI / 2)
.endFill();

app.stage.addChild(torus);
// first few arguments are centre of torus, last two are the inner and outer radius of the circle (can add another couple arguments are the end which represent
// the start and end of the arch to draw)

const star = new Graphics();
star.beginFill(0xd6ab0f)
.drawStar(900, 700, 30, 80)
.endFill();
// third coordinate is number of points, last coordinate is radius

app.stage.addChild(star);

const style = new PIXI.TextStyle({
    fontFamily: 'Montserrat',
    fontSize: 48,
    fill: 'deepskyblue',
    stroke: '#ffffff',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowDistance: 10,
    dropShadowAngle: Math.PI / 2,
    dropShadowColor: '#000000'
});

const myText = new PIXI.Text('Hello User! Welcome!', style);

app.stage.addChild(myText);

// update the value of the text property
myText.text = 'Hello Again!'
// or update the text style
myText.style.wordWrap = true;
myText.style.wordWrapWidth = 100;
myText.style.align = 'center';

// to add and animate elements automatically, in this case, randomly add rectangles to screen
app.ticker.add(delta=>loop(delta));

function loop(delta) {
    const rect = new Graphics();
    rect.beginFill(0x411e85)
    .drawRect(Math.random() * app.screen.width, Math.random() * app.screen.height, 20, 20)
    .endFill();

    app.stage.addChild(rect);
}


// Does not work from here onwards!! (need to set up a local server to test code locally)

// to add an image (not functional)
//  const duckTexture = PIXI.Texture.from('./Duck.png');
//  const duckSprite = new PIXI.Sprite(duckTexture);

// app.stage.addChild(duckSprite);

// duckSprite.width = 500;
// duckSprite.height = 500;

// to make the sprite move across the screen horizontally
//  function loop(delta) {
//      duckSprite.x += 1; 
//  }

// To make it rotate around its centre, add the following before the function below
//  duckSprite.position.set(800, 400);
//  duckSprite.anchor.x = 0.5;
//  duckSprite.anchor.y = 0.5;
// // to make the sprite rotate around the upper left corner a certain number of radians per second
//  function loop(delta) {
//      duckSprite.rotation += 0.01;
// }
