// import {getUsers} from "./firebase.js";
import {ctx, canvas} from './canvas.js';
import {Rudolf} from './Models/Rudolf.js';
import {Sprout} from './Models/Sprout.js';
import {Present} from './Models/Present.js';

let ru;
let sproutCount = 8;
let presentCount = 8;
let sprouts = [];
let presents = [];
let play = false;
let interval;
const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const stopButton = document.getElementById('stopBtn');
const wrapper = document.getElementById('main-wrapper');
let canvasOriginX;
let canvasOriginY;
let touchX;
let touchY;
let canvasWidth = 350;
let canvasHeight = 600;
//images
let sproutImage;
let presentImage;
let rudolfRight;
let rudolfLeft;
let rudolfFartRight;
let rudolfFartLeft;
let fartRight;
let fartLeft;
let background


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground() {
    ctx.drawImage(background, 0,0)
}

function draw() {
    drawBackground()
    ru.draw()
    drawSprouts()
    drawPresents()
    drawTouch()
}

function drawSprouts() {
    sprouts.forEach((sprout) => {
        sprout.draw();
    })
}

function drawPresents() {
    presents.forEach((present) => {
        present.draw();
    })
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
        }, 10);
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
    createCanvasElements()
    clearCanvas()
    draw()
}


function setCanvasOriginPoints() {
    const canvasBoundingRect = canvas.getBoundingClientRect()
    canvasOriginX = canvasBoundingRect.x;
    canvasOriginY = canvasBoundingRect.y;
    console.log(canvasOriginX, canvasOriginY)
}

function drawTouch() {
    ctx.strokeStyle = "blue"
    ctx.strokeRect(touchX, touchY, 1, 1)
}

function createCanvasElements() {
    sprouts = []
    presents = []
    ru = new Rudolf(
        rudolfRight,
        rudolfFartRight,
        fartRight,
        rudolfLeft,
        rudolfFartLeft,
        fartLeft
    );
    let sproutDim = 20
    for (let i = 0; i < sproutCount; i++) {
        let x = Math.floor(Math.random()*(canvasWidth - sproutDim))
        let y = Math.floor(Math.random()*(canvasHeight - sproutDim))
        sprouts.push(new Sprout(x, y, sproutDim, sproutImage))
    }
    let presentDim = 20
    for (let i = 0; i < presentCount; i++) {
        let x = Math.floor(Math.random()*(canvasWidth - presentDim))
        let y = Math.floor(Math.random()*(canvasHeight - presentDim))
        presents.push(new Present(x, y, presentDim, presentImage))
    }
}

function loadImages() {
    background = new Image()
    background.src = './assets/background.png'

    sproutImage = new Image();
    sproutImage.src = './assets/sprout.png'

    presentImage = new Image();
    presentImage.src = './assets/present.png'

    rudolfFartRight = new Image();
    rudolfFartRight.src = './assets/rudolfFartRight.png'

    rudolfFartLeft = new Image();
    rudolfFartLeft.src = './assets/rudolfFartLeft.png'

    rudolfLeft = new Image();
    rudolfLeft.src = './assets/rudolfLeft.png'

    rudolfRight = new Image();
    rudolfRight.src = './assets/rudolfRight.png'

    fartRight = new Image();
    fartRight.src = './assets/fartRight.png'

    fartLeft = new Image();
    fartLeft.src = './assets/fartLeft.png'
}



window.onload = function () {
    console.log("on load")
    loadImages()
    createCanvasElements()
    draw()

    startButton.addEventListener("click", () => {startInterval()});
    stopButton.addEventListener("click", () => {stopInterval()});
    // resetButton.addEventListener("click", () => {stopAndReset()});

    // create "routing"
    wrapper.addEventListener('click', (e) => {
        console.log(e)
        if (e.target.nodeName === 'BUTTON') {
            document.getElementById(e.target.value).style.display = ''
            e.target.closest("div[id^='wrapper']").style.display = 'none';
            if (e.target.value === 'wrapper-game') {
                setCanvasOriginPoints()
            }
        }
    })
    canvas.addEventListener("touchstart", (e) => {
        if (play) {
            touchX = e.changedTouches[0].pageX - canvasOriginX
            touchY = e.changedTouches[0].pageY - canvasOriginY
            ru.setTarget(touchX, touchY)
            drawTouch()
        }
    });
}







// import {Sprout} from './Models/Sprout.js';
// import {Present} from './Models/Present.js';
// import {getUsers} from "./firebase.js";
//
//
// let fartInterval


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
