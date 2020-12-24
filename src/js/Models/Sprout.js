import {ctx} from '../canvas.js';

export class Sprout {
    constructor(x, y, dimension = 10, image) {
        this.originalX = x
        this.originalY = y
        this.dimension = dimension;
        this.x = x;
        this.y = y;
        this.dx = -1;
        this.dy = -1;
        this.image = image;
        this.eaten = false;
    }

    doesIntersectWithRudolf(ruX, ruY, ruWidth, ruHeight) {
        //define border for rudolf and sprout and check if any overlap
        let [ruTop, ruBottom, ruLeft, ruRight] = [ruY, ruY + ruHeight, ruX, ruX + ruWidth]
        let [sprTop, sprBottom, sprLeft, sprRight] = [this.y, this.y + this.dimension, this.x, this.x + this.dimension]
        if (!(ruRight < sprLeft || ruBottom < sprTop || ruLeft > sprRight || ruTop > sprBottom)) {
            this.eaten = true
            return true
        }
        return false
    }

    draw() {
        if (!this.eaten) {
            ctx.drawImage(this.image, this.x, this.y)
        }
    }
}