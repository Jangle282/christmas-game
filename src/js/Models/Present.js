import {ctx} from '../canvas.js';

export class Present {
    constructor(x,y, dimension = 10, image) {
        this.originalX = x;
        this.originalY = y;
        this.dimension = dimension;
        this.x = x;
        this.y = y;
        this.dx = 2;
        this.dy = 2;
        this.image = image;
        this.collected = false;
    }

    reset() {
        this.x =  this.originalX;
        this.y =  this.originalY;
        this.dx = 2;
        this.dy = 2;
    }

    doesIntersectWithRudolf(ruX, ruY, ruWidth, ruHeight) {
        //define border for rudolf and sprout and check if any overlap
        let [ruTop, ruBottom, ruLeft, ruRight] = [ruY, ruY + ruHeight, ruX, ruX + ruWidth]
        let [presTop, presBottom, presLeft, presRight] = [this.y, this.y + this.dimension, this.x, this.x + this.dimension]
        if (!(ruRight < presLeft || ruBottom < presTop || ruLeft > presRight || ruTop > presBottom)) {
            this.collected = true
            return true
        }
        return false
    }

    draw() {
        if (!this.collected) {
            ctx.drawImage(this.image, this.x, this.y)
        }

    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
}