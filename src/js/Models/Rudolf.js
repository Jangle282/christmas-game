import {ctx} from '../canvas.js';

export class Rudolf {
    constructor(standingRight, flyingRight, fartRight, standingLeft, flyingLeft, fartLeft, startGasVolume, x = 150, y = 285) {
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50
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
        this.sproutGas = 1;
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
        this.updateGasMeter('add')
    }

    updateGasMeter(change) {
        console.log("updategas meter: ", change)
        const gasMeter = document.getElementById('js-gas-meter');
        gasMeter.innerHTML= `Gas: ${this.gasVolume > 0 ? this.gasVolume : 0 }`;

        const gasChange = document.getElementById('js-gas-change');

        // if (change && change === 'remove') {
        //     gasChange.style.color = 'red';
        //     gasChange.innerHTML= '- 1';
        // }

        if (change && change === 'add') {
            gasChange.innerHTML= '';
            gasChange.style.color = 'green';
            gasChange.innerHTML= '+ 1';
        }

        if (change && change === 'hide') {
            gasChange.style.color = 'white';
        }


    }

    increasePresentCount(){
        this.presentCount++
        this.updatePresentCountDisplay()
    }

    updatePresentCountDisplay(change) {
        console.log("update present count: ")
        const presentCount = document.getElementById('js-present-count');
        presentCount.innerHTML= `Presents: ${this.presentCount}`;

        const presentChange = document.getElementById('js-present-change');

        presentChange.style.color = 'green'
        presentChange.innerHTML = '+ 1'

        let flashInterval = setInterval(() => {
            presentChange.style.color = 'white';
            clearInterval(flashInterval)
        }, 500)
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
                this.updateGasMeter('remove')
                return 'long'
                // console.log("target restricted", this.targetX, this.targetY);
            } else {
                // set the target as the touchpoint. Adjust for image
                this.targetX = x - this.width*0.5;
                this.targetY = y - this.height*0.5
                this.gasVolume = this.gasVolume > this.sproutGas ? this.gasVolume - this.sproutGas : 0;
                this.updateGasMeter('remove')
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
            let gaugeInterval = setInterval(() => {
                console.log("guage interval")
                this.updateGasMeter('hide')
                clearInterval(gaugeInterval)
            },700)

        }
    }
}