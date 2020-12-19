import {ctx, canvas} from './canvas.js';
import {Rudolf} from './Models/Rudolf.js';

const ru = new Rudolf()
let play = false;
let interval;
const startButton = document.getElementById('startBtn')
const resetButton = document.getElementById('resetBtn')
const stopButton = document.getElementById('stopBtn')
let canvasOriginX;
let canvasOriginY;
let touchX;
let touchY;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    ru.draw()
    drawTouch()
}

function update() {
    ru.update()
}

function playGame() {
    clearCanvas()
    draw()
    update()
}

function startInterval() {
    if (!play) {
        play = true
        interval = setInterval(() => {
            playGame()
        }, 20);
    }
}

function stopInterval() {
    if (play) {
        clearInterval(interval);
        play = false
    }
}

function stopAndReset() {
    stopInterval();
    ru.reset();
    clearCanvas()
    draw()
}


function setCanvasOriginPoints() {
    const canvasBoundingRect = canvas.getBoundingClientRect()
    canvasOriginX = canvasBoundingRect.x;
    canvasOriginY = canvasBoundingRect.y;
}

function drawTouch() {
    ctx.strokeStyle = "blue"
    ctx.strokeRect(touchX, touchY, 1, 1)
}

window.onload = function () {
    console.log("on load")
    startButton.addEventListener("click", () => {startInterval()});
    resetButton.addEventListener("click", () => {stopAndReset()});
    stopButton.addEventListener("click", () => {stopInterval()});
    setCanvasOriginPoints()
    canvas.addEventListener("touchstart", (e) => {
        touchX = e.changedTouches[0].pageX - canvasOriginX
        touchY = e.changedTouches[0].pageY - canvasOriginY
        ru.setTargets(touchX, touchY)
        drawTouch()
    });
    ru.draw()
}







// import {Sprout} from './Models/Sprout.js';
// import {Present} from './Models/Present.js';
// import {getUsers} from "./firebase.js";
//
//
// let fartInterval

// const sprout = new Sprout(200, 200)
// const present = new Present(250, 250)
// const startButton = document.getElementById('startBtn')
// const resetButton = document.getElementById('resetBtn')
// const stopButton = document.getElementById('stopBtn')
// const fartButton = document.getElementById('fartBtn')
// let canvasOriginX;
// let canvasOriginY;
// let touchX = 0;
// let touchY = 0;
// let touchStart;
// let touchEnd;
// let touchAngle = 0;
// let fart = 500;
//
// function clearCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }
//
// function drawEverything() {
//     ru.draw()
//     // ctx.strokeStyle = "blue"
//     // ctx.strokeRect(touchX, touchY, 1, 1)
//     // sprout.draw()
//     // present.draw()
// }
//
// function updateEverything() {
//     // ru.move()
//     // sprout.move()
//     // present.move()
// }
//
// function playGame() {
//     clearCanvas()
//     drawEverything()
//     updateEverything()
// }
//
// function start() {
//     if (!play) {
//         play = true
//         interval = setInterval(() => {
//             console.log("interval", ru.frame)
//             console.log("x", ru.getX())
//             playGame()
//         }, 500);
//     }
// }
//
// function stop() {
//     if (play) {
//         clearInterval(interval);
//         play = false
//     }
// }
//
// function resetGlobals() {
//     touchAngle = 0
// }
//
// function reset() {
//     stop();
//     resetGlobals()
//     ru.reset();
//     // sprout.reset();
//     // present.reset();
//     clearCanvas()
//     drawEverything()
// }
//
// function setCanvasOriginPoints() {
//     const canvasBoundingRect = canvas.getBoundingClientRect()
//     canvasOriginX = canvasBoundingRect.x;
//     canvasOriginY = canvasBoundingRect.y;
// }
//
// function calculateRotationAngle() {
//     console.log("rotate")
//     return Math.atan((touchY - ru.centreY - canvasOriginY) / (touchX - ru.centreX - canvasOriginX))
//     // console.log("touch angle: ", touchAngle)
//     // console.log("ru centre x", ru.centreX + canvasOriginX)
//     // console.log("ru centre y", ru.centreY + canvasOriginY)
//     // console.log("touch x ", touchX)
//     // console.log("touch y ", touchY)
// }
//
//
// window.onload = function () {
//     console.log("on load")
//     startButton.addEventListener("click", () => {start()});
//     resetButton.addEventListener("click", () => {reset()});
//     stopButton.addEventListener("click", () => {stop()});
//     // fartButton.addEventListener("click", () => {move()});
//     setCanvasOriginPoints()
//     canvas.addEventListener("touchstart", (e) => {
//     //     // touchEnd = null
//     //     // fart = false
//     //     // start a timer that check the time since the timestamp
//     //     // when the diff is over 250ms set fart to true to start moving
//     //     // console.log("start", e.timeStamp)
//         ru.setTargets(e.changedTouches[0].pageX - canvasOriginX, e.changedTouches[0].pageY - canvasOriginY)
//
//         ctx.strokeStyle = "blue"
//         ctx.strokeRect(touchX, touchY, 1, 1)
//
//     //     touchAngle = calculateRotationAngle()
//     //
//     //     clearCanvas()
//     //     ru.draw(touchAngle)
//     //     // touchStart = Date.now()
//     //
//     //     // timeInterval = setInterval(() => {
//     //     //     // console.log("1", fart)
//     //     //     // console.log("2", Date.now(), touchStart)
//     //     //     if ((Date.now() - touchStart) > 500 && !touchEnd) {
//     //     //         clearInterval(timeInterval)
//     //     //         fart = true
//     //     //     } else {
//     //     //         move()
//     //     //     }
//     //     //     // console.log("4", fart)
//     //     // }, 10);
//     //
//     //
//     });
//     // canvas.addEventListener("touchend", (e) => {
//     //     // console.log("end", e.timeStamp)
//     //     // touchEnd = e.timeStamp
//     //     // // clearInterval(timeInterval);
//     //     // if (fart) {
//     //     //     // move()
//     //     // } else {
//     //     //
//     //     // }
//     //     // touchX = e.changedTouches[0].pageX
//     //     // touchY = e.changedTouches[0].pageY
//     //     // console.log(canvasOriginX)
//     //     // console.log(canvasOriginY)
//     // });
//     drawEverything();
// }
//
//
//
