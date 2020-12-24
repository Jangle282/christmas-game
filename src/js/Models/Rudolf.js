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
        this.fartCount = 0
    }

    getGasUsed() {
        return this.fartCount
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
        const gasMeter = document.getElementById('js-gas-meter');
        gasMeter.innerHTML= `Farts:${this.gasVolume > 0 ? this.gasVolume : 0 }`;

        const gasChange = document.getElementById('js-gas-change');

        if (change && change === 'add') {
            gasChange.innerHTML= '';
            gasChange.style.color = 'green';
            gasChange.innerHTML= '+1';
        }

        if (change && change === 'hide') {
            gasChange.style.color = 'firebrick';
        }


    }

    increasePresentCount(){
        this.presentCount++
        this.updatePresentCountDisplay()
    }

    updatePresentCountDisplay(change) {
        const presentCount = document.getElementById('js-present-count');
        presentCount.innerHTML= `Gifts:${this.presentCount}`;

        const presentChange = document.getElementById('js-present-change');

        presentChange.style.color = 'green'
        presentChange.innerHTML = '+1'

        let flashInterval = setInterval(() => {
            presentChange.style.color = 'firebrick';
            clearInterval(flashInterval)
        }, 500)
    }

    setTarget(x, y) {
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
            if (hypotenuseToTouch > this.gasPower) {
                // if it is further than the gaspower allows. Restrict the targets to the maximum
                // get the angle
                let angleToTouch = Math.atan((ty/tx))
                // find mx using cos
                let mx = Math.cos(angleToTouch) * this.gasPower
                // find my with pythag
                let my = Math.sqrt((this.gasPower**2 - mx**2))
                // adjust for image
                this.targetX = this.x + mx*directionX
                this.targetY = this.y + my*directionY
                this.gasVolume = this.gasVolume > this.sproutGas ? this.gasVolume - this.sproutGas : 0;
                this.fartCount++
                this.updateGasMeter('remove')
                return 'long'
            } else {
                // set the target as the touchpoint. Adjust for image
                this.targetX = x - this.width*0.5;
                this.targetY = y - this.height*0.5
                this.gasVolume = this.gasVolume > this.sproutGas ? this.gasVolume - this.sproutGas : 0;
                this.updateGasMeter('remove')
                this.fartCount++
                return 'short'
            }
        }
    }

    changeX() {
        let distance = this.targetX - this.startX
        this.x = (distance / this.xFrames) * this.xFrame + this.startX
        if(this.xFrame < this.xFrames) {
            this.xFrame++
        }
    }

    changeY() {
        let distance = this.targetY - this.startY
        this.y = (distance / this.yFrames) * this.yFrame + this.startY
        if(this.yFrame < this.yFrames) {
            this.yFrame++
        }
    }

    draw() {
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
                this.updateGasMeter('hide')
                clearInterval(gaugeInterval)
            },700)

        }
    }
}