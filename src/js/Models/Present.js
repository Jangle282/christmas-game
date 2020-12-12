import {ctx} from '../canvas.js';

export class Present {
    constructor(x,y, orientation = 270) {
        this.originalX = x;
        this.originalY = y;
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        this.dx = 2;
        this.dy = 2;
    }

    reset() {
        this.orientation =  90;
        this.x =  this.originalX;
        this.y =  this.originalY;
        this.dx = 2;
        this.dy = 2;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 50, 50);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
}