import {ctx} from '../canvas.js';

export class Rudolf {
    constructor(x = 0, y = 0, width = 50, height = 50) {
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.dx = 1;
        this.dy = 1;
        this.width = width;
        this.height = height
        this.centreX = this.x + 0.5 * this.width
        this.centreY = this.y + 0.5 * this.height
        this.xFrames = 100;
        this.xFrame = 0;
        this.yFrames = 100;
        this.yFrame = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.newTarget = false
    }

    setTargets(x, y) {
        this.newTarget = true
        this.targetX = x - this.width / 2;
        this.targetY = y - this.height / 2;
        console.log("targets", this.targetX, this.targetY)
        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.targetX, this.targetY, 1, 1);

        // this.dy = (this.targetY - this.y) / this.steps
        // this.frame = 0;
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.dx = 1;
        this.dy = 1;
        this.newTarget = false
    }

    changeX() {
        let distance = this.targetX - this.startX
        this.x = (distance / this.xFrames) * this.xFrame + this.startX
        console.log("changeX")

        // let currentXFrame = this.xFrame / (this.xFrames/2)
        // let distance = this.targetX - this.startX
        // if (currentXFrame < 1) {
        //     this.x = (distance/2)*(Math.pow(currentXFrame, 3)) + this.startX;
        // }
        // currentXFrame -= 2;
        // this.x = distance/2*(Math.pow(currentXFrame,3)+2) + this.startX
        if(this.xFrame < this.xFrames) {
            this.xFrame++
        }

        // set what dx shoudl be - to get a nice animation this needs to be different according to the
        // this.dx = (this.targetX - this.x) / this.steps
        // this.x += this.dx;
        // let distance = this.targetX - this.width / 2 - this.x;
        // let steps = this.frames;
        // let progress = this.frame;
        // return distance / steps * progress;
    }

    changeY() {
        let distance = this.targetY - this.startY
        this.y = (distance / this.yFrames) * this.yFrame + this.startY
        console.log("changeY")
        // let currentYFrame = this.yFrame / (this.yFrames/2)
        // let distance = this.targetY - this.startY
        // if (currentYFrame < 1) {
        //     this.y = (distance/2)*(Math.pow(currentYFrame, 3)) + this.startY;
        // }
        // currentYFrame -= 2;
        // this.y = distance/2*(Math.pow(currentYFrame,3)+2) + this.startY
        if(this.yFrame < this.yFrames) {
            this.yFrame++
        }

        // this.y += this.dy;
        // let distance = this.targetY - this.height / 2 - this.y;
        // let steps = this.frames;
        // let progress = this.frame;
        // return distance / steps * progress;
    }

    draw() {
        console.log("drawing ru: ", this.x, this.y)
        console.log("frames ru: ", this.xFrame, this.yFrame)
        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        // if (this.newTarget) {
        //     console.log("new Target: ", this.targetX - this.width/2, this.targetY - this.height/2)
        //     if (this.frame < this.frames) {
        //         // console.log("frame less than", this.frame)
        //         ctx.strokeStyle = "blue";
        //         console.log("X", this.moveX())
        //         console.log("Y", this.moveY())
        //         ctx.strokeRect(this.moveX(), this.moveY(), this.width, this.height);
        //         this.frame += 1;
        //         // window.requestAnimationFrame(drawCanvas);
        //         // window.requestAnimationFrame(addImage.bind(null, params))
        //     } else {
        //         // console.log("else")
        //         this.x = this.targetX - this.width / 2;
        //         this.y = this.targetY - this.height / 2;
        //         this.newTarget = false
        //         // ctx.strokeStyle = "blue"
        //         // ctx.strokeRect(this.x, this.y, this.width, this.height)
        //     }
        // } else {
        //     ctx.strokeStyle = "red"
        //     ctx.strokeRect(this.x, this.y, this.width, this.height)
        // }

        // console.log("thisX: ", this.x)
        // console.log("thisY: ", this.y)
        // console.log("targetx: ", this.targetX)
        // console.log("targety: ", this.targetY)
    }

    update() {
        if (this.newTarget) {
            this.changeX()
            this.changeY()
        }

        if (this.xFrame === this.xFrames && this.yFrame === this.yFrames) {
            this.startX = this.targetX
            this.startY = this.targetY
            this.xFrame = 0
            this.yFrame = 0
            this.newTarget = false
        }
    }

    // draw image at correct rotation
    // ctx.save()
    // ctx.translate(this.centreX, this.centreY);
    // ctx.rotate(rotation);
    // ctx.translate(-this.centreX, -this.centreY)

    // ctx.restore()

// move() {
//     this.x += this.dx;
//     this.y += this.dy;
// }

    rotate(rotation) {
        ctx.save()
        ctx.translate(this.centreX, this.centreY);
        ctx.rotate(rotation);
        ctx.translate(-this.centreX, -this.centreY)
        ctx.restore()
        // this.orientation += 5
    }
}