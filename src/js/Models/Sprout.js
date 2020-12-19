import {ctx} from '../canvas.js';

export class Sprout {
    constructor(x,y, dimension = 10, image) {
        this.originalX = x
        this.originalY = y
        this.dimension = dimension;
        this.x = x;
        this.y = y;
        this.dx = -1;
        this.dy = -1;
        this.image = image
    }

    reset() {
        this.x = this.originalX;
        this.y = this.originalY;
        this.dx = -1;
        this.dy = -1;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y )


        // ctx.beginPath();
        // ctx.rect(this.x, this.y, this.dimension, this.dimension);
        // ctx.fillStyle = "green";
        // ctx.fill();
        // ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
}