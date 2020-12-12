import {ctx} from '../canvas.js';

export class Rudolf {
    constructor(x = 175, y = 300, width = 50, height = 50) {
        this.orientation = 10;
        this.x = x;
        this.y = y;
        this.dx = 1;
        this.dy = 1;
        this.width = width;
        this.height = height
        this.centreX = this.x + 0.5 * this.width
        this.centreY = this.y + 0.5 * this.height
    }

    reset() {
        this.orientation =  90;
        this.x = 175;
        this.y = 300;
        this.dx = 1;
        this.dy = 1;
    }

    draw(rotation = null) {
        if (rotation) {
            ctx.save()
            ctx.translate(this.centreX,this.centreY);
            ctx.rotate(rotation);
            ctx.translate(-this.centreX,-this.centreY)
            ctx.strokeStyle = "blue"
            ctx.strokeRect(this.x, this.y, this.width, this.height)
            ctx.restore()
        } else {
            ctx.strokeStyle = "blue"
            ctx.strokeRect(this.x, this.y, this.width, this.height)
        }

        // ctx.beginPath();

        // ctx.strokeStyle = "red";
        // ctx.moveTo(this.x, this.y)
        // ctx.lineTo(this.x + this.width, this.y);
        // ctx.stroke();
        // ctx.fill();
        // ctx.moveTo(this.x + this.width, this.y +5);
        // ctx.lineTo(this.x + this.width, this.y -5);
        // ctx.stroke();
        // ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    rotate(rotation) {
        ctx.save()
        ctx.translate(this.centreX,this.centreY);
        ctx.rotate(rotation);
        ctx.translate(-this.centreX,-this.centreY)
        ctx.restore()
        // this.orientation += 5
    }
}