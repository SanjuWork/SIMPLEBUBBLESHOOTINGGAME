var bubbles, player, bullets;
var playerImg, playerAnim;
var score;
var hue, gamefont;
function preload() {
    gamefont = loadFont('font2.ttf');
    let link = 'https://raw.githubusercontent.com/molleindustria/p5.play/master/examples/assets/';
    playerImg = loadImage(link + 'asteroids_ship0001.png');
    playerAnim = loadAnimation(link + 'asteroids_ship0002.png', link + 'asteroids_ship0003.png', link + 'asteroids_ship0004.png', link + 'asteroids_ship0005.png', link + 'asteroids_ship0006.png', link + 'asteroids_ship0007.png');
}
function setup() {
    createCanvas(700, 700);

    bubbles = createGroup();
    bullets = createGroup();
    player = new Player(width / 2, height / 2);

    createBubbles();

    score = 0;
    hue = 0;
}
function draw() {
    background(0);
    hue++;

    player.update();
    player.sprite.bounceOff(bubbles);

    Bubble.update();

    drawSprites();

    textSize(15);
    textFont(gamefont);
    fill(255);
    text("Score: " + floor(score), 10, 22);
    text("Controls: w + a + d", width - 200, 22);
    text("Space to shoot", width - 160, 52);

    if (hue > 360)
        hue = 0;

    if (score % 10 == 0 && score != 0) {
        createBubbles();
        score += .5;
    }
}
function keyPressed() {
    if (keyCode == 32) {
        bullets.add(createBullet(player.sprite.position.x, player.sprite.position.y))
        return false;
    }
}
function createBullet(x, y) {
    let s = createSprite(x, y, 10, 10);
    s.draw = () => {
        push();
        colorMode(HSB);
        stroke(hue, 100, 100);
        noFill();
        rect(0, 0, s.width, s.height);
        pop();
    }
    s.rotation = player.sprite.rotation + 90;
    s.setSpeed(player.sprite.getSpeed() + 10, player.sprite.rotation);
    s.life = 75;
    return s;
}
function createBubbles() {
    for (let i = 0; i < 10; i++) {
        let bubble = new Bubble(random(width), random(height));
        bubble.sprite.setCollider("circle", 0, 0, 20);
        bubbles.add(bubble.sprite);
    }
}