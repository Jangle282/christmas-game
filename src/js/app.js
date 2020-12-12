import {ctx, canvas} from './canvas.js';
import {Rudolf} from './Models/Rudolf.js';
import {Sprout} from './Models/Sprout.js';
import {Present} from './Models/Present.js';
import {getUsers} from "./firebase.js";

let interval;
let timeInterval
const ru = new Rudolf()
const sprout = new Sprout(200, 200)
const present = new Present(250, 250)
const startButton = document.getElementById('startBtn')
const resetButton = document.getElementById('resetBtn')
const stopButton = document.getElementById('stopBtn')
let canvasOriginX;
let canvasOriginY;
let play = false;
let touchX;
let touchY;
let touchStart;
let touchEnd;
let fart = false;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawEverything() {
    ru.draw()
    sprout.draw()
    present.draw()
}

function updateEverything() {
    ru.move()
    sprout.move()
    present.move()
}

function playGame() {
    clearCanvas()
    drawEverything()
    updateEverything()
}

function start() {
    if (!play) {
        play = true
        interval = setInterval(() => {
            playGame()
        }, 10);
    }
}

function stop() {
    if (play) {
        clearInterval(interval);
        play = false
    }
}

function reset() {
    stop();
    ru.reset();
    sprout.reset();
    present.reset();
    clearCanvas()
    drawEverything()
}

function setCanvasOriginPoints() {
    const canvasBoundingRect = canvas.getBoundingClientRect()
    canvasOriginX = canvasBoundingRect.x;
    canvasOriginY = canvasBoundingRect.y;
}

function calculateRotationAngle() {
    console.log("rotate")
    const touchAngle = Math.atan((touchY - ru.centreY - canvasOriginY) / (touchX - ru.centreX - canvasOriginX))
    // console.log("touch angle: ", touchAngle)
    // console.log("ru centre x", ru.centreX + canvasOriginX)
    // console.log("ru centre y", ru.centreY + canvasOriginY)
    // console.log("touch x ", touchX)
    // console.log("touch y ", touchY)
    clearCanvas()
    ru.draw(touchAngle)
    sprout.draw()
    present.draw()
    // drawEverything()
}

function move() {
    console.log("fart")
}


window.onload = function () {
    startButton.addEventListener("click", () => {start()});
    resetButton.addEventListener("click", () => {reset()});
    stopButton.addEventListener("click", () => {stop()});
    setCanvasOriginPoints()
    canvas.addEventListener("touchstart", (e) => {
        touchEnd = null
        fart = false
        // start a timer that check the time since the timestamp
        // when the diff is over 250ms set fart to true to start moving
        // console.log("start", e.timeStamp)
        touchX = e.changedTouches[0].pageX
        touchY = e.changedTouches[0].pageY
        touchStart = Date.now()

        timeInterval = setInterval(() => {
            // console.log("1", fart)
            // console.log("2", Date.now(), touchStart)
            if ((Date.now() - touchStart) > 500 && !touchEnd) {
                clearInterval(timeInterval)
                fart = true
            } else {
                move()
            }
            // console.log("4", fart)
        }, 10);


    });
    canvas.addEventListener("touchend", (e) => {
        // console.log("end", e.timeStamp)
        touchEnd = e.timeStamp
        clearInterval(timeInterval);
        if (fart) {
            // move()
        } else {
            calculateRotationAngle()
        }
        // touchX = e.changedTouches[0].pageX
        // touchY = e.changedTouches[0].pageY
        // console.log(canvasOriginX)
        // console.log(canvasOriginY)
    });
    drawEverything();
}



