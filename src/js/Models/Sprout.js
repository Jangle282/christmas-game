import {ctx} from '../canvas.js';

export class Sprout {
    constructor(x,y, orientation = 90) {
        this.originalX = x
        this.originalY = y
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        this.dx = -1;
        this.dy = -1;
    }

    reset() {
        this.orientation = this.originalOrientation;
        this.x = this.originalX;
        this.y = this.originalY;
        this.dx = -1;
        this.dy = -1;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 50, 50);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
}