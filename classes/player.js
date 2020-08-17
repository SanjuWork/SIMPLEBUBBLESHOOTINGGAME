class Player {
    constructor(x, y) {
        this.sprite = createSprite(x, y, 50, 50);
        this.sprite.friction = 0.1;
        this.sprite.addImage('normal', playerImg);
        this.sprite.addAnimation('thrust', playerAnim);
        this.sprite.setCollider("circle");
    }
    update() {

        if (keyDown('a'))
            this.sprite.rotation -= 4;
        else if (keyDown('d'))
            this.sprite.rotation += 4;
        if (keyDown('w')) {
            this.sprite.addSpeed(.9, this.sprite.rotation);
            this.sprite.changeAnimation('thrust');
        } else this.sprite.changeAnimation('normal');

        this.sprite.limitSpeed(10);

        if (this.sprite.position.x < -80)
            this.sprite.position.x = width + 80;
        if (this.sprite.position.x > width + 80)
            this.sprite.position.x = -80;
        if (this.sprite.position.y < -80)
            this.sprite.position.y = height + 80;
        if (this.sprite.position.y > height + 80)
            this.sprite.position.y = -80;
    }
}