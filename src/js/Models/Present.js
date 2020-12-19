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
    }

    reset() {
        this.x =  this.originalX;
        this.y =  this.originalY;
        this.dx = 2;
        this.dy = 2;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y)

    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
}