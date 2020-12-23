import {ctx} from '../canvas.js';

export class Rudolf {
    constructor(standingRight, flyingRight, fartRight, standingLeft, flyingLeft, fartLeft, startGasVolume, x = 150, y = 285) {
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50
        this.centreX = this.x + 0.5 * this.width
        this.centreY = this.y + 0.5 * this.height
        this.xFrames = 100;
        this.xFrame = 0;
        this.yFrames = 100;
        this.yFrame = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.isMoving = false
        this.images = {
            standing : {
                left : standingLeft,
                right: standingRight
            },
            flying : {
                left: flyingLeft,
                right: flyingRight
            },
            fart: {
                left: fartLeft,
                right: fartRight
            }
        }
        this.direction = 'right';
        this.gasPower = 200;
        this.sproutGas = 100;
        // player Stats
        this.presentCount = 0;
        this.gasVolume = startGasVolume;
    }

    getGasVolume() {
        return this.gasVolume;
    }

    getCoords(){
        return [this.x, this.y, this.width, this.height]
    }

    increaseGasMeter() {
        this.gasVolume += this.sproutGas
        this.updateGasMeter()
    }

    updateGasMeter() {
        const gasMeter = document.getElementById('gas-meter');
        // return this.gasVolume;
        gasMeter.innerHTML= `Gas: ${this.gasVolume > 0 ? this.gasVolume : 0 }`;
    }

    increasePresentCount(){
        this.presentCount++
        this.updatePresentCountDisplay()
    }

    updatePresentCountDisplay() {
        const presentCount = document.getElementById('present-count');
        presentCount.innerHTML= `Presents Collected: ${this.presentCount}`;
    }

    setTarget(x, y) {
        // console.log("x and y", x,y )
        // console.log("thisxy", this.x,this.y )
        if (!this.isMoving && this.gasVolume > 0) {
            this.direction = x > this.x + 0.5*this.width ? 'right' : 'left'
            let directionX = x > this.x ? 1 : -1
            let directionY = y > this.y ? 1 : -1
            this.isMoving = true
            // find vector distances from current location to touch
            let tx =  x - this.x - this.width*0.5;
            let ty =  y - this.y - this.height*0.5;
            // use pythag to get the direct distance to the touch
            let hypotenuseToTouch = Math.sqrt((tx**2 + ty**2))
            // console.log("hyp", hypotenuseToTouch)
            if (hypotenuseToTouch > this.gasPower) {
                // if it is further than the gaspower allows. Restrict the targets to the maximum
                // get the angle
                let angleToTouch = Math.atan((ty/tx))
                // console.log("angle", angleToTouch)
                // find mx using cos
                let mx = Math.cos(angleToTouch) * this.gasPower
                // console.log("cos of angle",  Math.cos(angleToTouch));
                // find my with pythag
                let my = Math.sqrt((this.gasPower**2 - mx**2))
                // console.log("target restricted1:", mx, my);
                // adjust for image
                this.targetX = this.x + mx*directionX
                this.targetY = this.y + my*directionY
                this.gasVolume = this.gasVolume > this.sproutGas ? this.gasVolume - this.sproutGas : 0;
                this.updateGasMeter()
                return 'long'
                // console.log("target restricted", this.targetX, this.targetY);
            } else {
                // set the target as the touchpoint. Adjust for image
                this.targetX = x - this.width*0.5;
                this.targetY = y - this.height*0.5
                this.gasVolume = this.gasVolume > this.sproutGas ? this.gasVolume - this.sproutGas : 0;
                this.updateGasMeter()
                return 'short'
                // console.log("target within", this.targetX, this.targetY);
            }

            // console.log("direction", this.direction)
            // console.log("targets", this.targetX, this.targetY)
            // ctx.strokeStyle = "blue";
            // ctx.strokeRect(this.targetX, this.targetY, 1, 1);
        }
    }

    changeX() {
        let distance = this.targetX - this.startX
        this.x = (distance / this.xFrames) * this.xFrame + this.startX
        // console.log("changeX")
        if(this.xFrame < this.xFrames) {
            this.xFrame++
        }
    }

    changeY() {
        let distance = this.targetY - this.startY
        this.y = (distance / this.yFrames) * this.yFrame + this.startY
        // console.log("changeY")
        if(this.yFrame < this.yFrames) {
            this.yFrame++
        }
    }

    draw() {
        // console.log("drawing ru: ", this.x, this.y)
        // console.log("frames ru: ", this.xFrame, this.yFrame)
        let x = this.direction === 'right' ? this.x - 25 : this.x + 25;
        if (this.isMoving) {
            ctx.drawImage(this.images['fart'][this.direction], x, this.y)
            ctx.drawImage(this.images['flying'][this.direction], this.x, this.y)
        } else {
            ctx.drawImage(this.images['standing'][this.direction], this.x, this.y)
        }
    }

    update() {
        if (this.isMoving) {
            this.changeX()
            this.changeY()
        }

        if (this.xFrame === this.xFrames && this.yFrame === this.yFrames) {
            this.startX = this.targetX;
            this.startY = this.targetY;
            this.x = this.targetX;
            this.y = this.targetY;
            this.xFrame = 0;
            this.yFrame = 0;
            this.isMoving = false;
        }
    }

    rotate(rotation) {
        ctx.save()
        ctx.translate(this.centreX, this.centreY);
        ctx.rotate(rotation);
        ctx.translate(-this.centreX, -this.centreY)
        ctx.restore()
    }
}



// this.images = {
//     standing : {
//         left : standingLeft,
//         right: standingRight
//     },
//     flying : {
//         left: flyingLeft,
//         right: flyingRight
//     },
//     fart: {
//         left: fartLeft,
//         right: fartRight
//     }
// }
// ctx.drawImage(this.standingRight, this.x, this.y)

// this.fartRight = fartRight;
// this.standingRight = standingRight;
// this.flyingRight = flyingRight
// this.fartLeft = fartLeft;
// this.standingLeft = standingLeft;
// this.flyingLeft = flyingLeft

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

// let currentXFrame = this.xFrame / (this.xFrames/2)
// let distance = this.targetX - this.startX
// if (currentXFrame < 1) {
//     this.x = (distance/2)*(Math.pow(currentXFrame, 3)) + this.startX;
// }
// currentXFrame -= 2;
// this.x = distance/2*(Math.pow(currentXFrame,3)+2) + this.startX
// set what dx shoudl be - to get a nice animation this needs to be different according to the
// this.dx = (this.targetX - this.x) / this.steps
// this.x += this.dx;
// let distance = this.targetX - this.width / 2 - this.x;
// let steps = this.frames;
// let progress = this.frame;
// return distance / steps * progress;

// let currentYFrame = this.yFrame / (this.yFrames/2)
// let distance = this.targetY - this.startY
// if (currentYFrame < 1) {
//     this.y = (distance/2)*(Math.pow(currentYFrame, 3)) + this.startY;
// }
// currentYFrame -= 2;
// this.y = distance/2*(Math.pow(currentYFrame,3)+2) + this.startY
// this.y += this.dy;
// let distance = this.targetY - this.height / 2 - this.y;
// let steps = this.frames;
// let progress = this.frame;
// return distance / steps * progress;