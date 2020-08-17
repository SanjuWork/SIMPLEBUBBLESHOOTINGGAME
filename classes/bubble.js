class Bubble {
    constructor(x, y) {
        this.sprite = createSprite(x, y, 50, 50);
        this.sprite.draw = () => {
            push();
            colorMode(HSB);
            fill(hue, 100, 100);
            ellipse(0, 0, this.sprite.width, this.sprite.height);
            pop();
        }
        this.sprite.setSpeed(random(2, 4), random(360));
    }
    static update() {
        bubbles.bounce(bubbles);
        bullets.overlap(bubbles, (e, f) => {
            e.remove();
            f.remove();
            score++;
        });

        for (let i = bubbles.length; i > 0; i--) {
            let s = bubbles.get(i - 1);
            if (s.x < -80)
                s.x = width + 80;
            if (s.x > width + 80)
                s.x = -80;
            if (s.y < -80)
                s.y = height + 80;
            if (s.y > height + 80)
                s.y = -80;
        }
    }
}