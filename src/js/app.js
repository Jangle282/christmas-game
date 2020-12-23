import {savePlayer, updatePlayer, leaderboardStats, getLeaderboard} from "./firebase.js";
import {ctx, canvas} from './canvas.js';
import {Rudolf} from './Models/Rudolf.js';
import {Sprout} from './Models/Sprout.js';
import {Present} from './Models/Present.js';

let ru;
let player = {
    name: '',
    level: 1,
    finished: false,
    gas_used: 0,
};
let levelSproutCount = [15, 12, 10, 8, 6, 5, 4, 3, 2, 1];
let sproutCount = levelSproutCount[player.level - 1];
let presentCount = 8;
let sprouts = [];
let presents = [];
let play = false;
let interval;
let playerRef = null;
const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const stopButton = document.getElementById('stopBtn');
const wrapper = document.getElementById('main-wrapper');
let overlay = document.getElementById('game-overlay')
const gameWrapper = document.getElementById('wrapper-game')
const leaderBoardWrapper = document.getElementById('wrapper-leaderboard')
const homeScreenError = document.getElementById('home-error')
let canvasOriginX;
let canvasOriginY;
let touchX;
let touchY;
let canvasWidth = 350;
let canvasHeight = 600;
let startGasVolume = 500;
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
let home;
//sounds
let shortFart
let mediumFart
let farts = []
let longFart01
let longFart02
let longFart03
let longFart04
let longFart05
let longFart06
let crunch
let successSound
let jingleBells


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground() {
    ctx.drawImage(background, 0, 0)
}

function draw() {
    drawBackground()
    ru.draw()
    drawSprouts()
    drawPresents()
    drawTouch()
}

function drawSprouts() {
    sprouts.forEach((sprout, index) => {
        let [x, y, width, height] = ru.getCoords();
        if (sprout.doesIntersectWithRudolf(x, y, width, height)) {
            if (crunch.duration > 0 ) {
                crunch.pause();
                crunch.currentTime = 0;
            }
            crunch.play()
            sprouts.splice(index, 1)
            ru.increaseGasMeter()
        } else {
            sprout.draw();
        }
    })
}

function drawPresents() {
    presents.forEach((present, index) => {
        let [x, y, width, height] = ru.getCoords();
        if (present.doesIntersectWithRudolf(x, y, width, height)) {
            if (successSound.duration > 0 ) {
                successSound.pause()
                successSound.currentTime = 0
            }
            successSound.play()
            presents.splice(index, 1)
            ru.increasePresentCount()
        } else {
            present.draw();
        }
    })
}

function update() {
    // collected all presents, not completed all levels, finished movement, update level
    if (presents.length === 0 && player.level < levelSproutCount.length && !ru.isMoving) {
        player.level++
        // set gas Used
        stopInterval()
        showOverlay('level')
        // finished all levels
    } else if (presents.length === 0 && player.level === levelSproutCount.length && !ru.isMoving) {
        player.finished = true
        stopInterval()
        // set gas Used
        updatePlayer(player)
        showOverlay('finish')
        // run out of gas
    } else if (ru.getGasVolume() === 0 && !ru.isMoving) {
        stopInterval()
        updatePlayer(player)
        showOverlay('lost');
    }
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
    // console.log(canvasOriginX, canvasOriginY)
}

function drawTouch() {
    ctx.strokeStyle = "blue"
    ctx.strokeRect(touchX, touchY, 1, 1)
}

function createCanvasElements() {
    sprouts = []
    presents = []
    sproutCount = levelSproutCount[player.level - 1];
    ru = new Rudolf(
        rudolfRight,
        rudolfFartRight,
        fartRight,
        rudolfLeft,
        rudolfFartLeft,
        fartLeft,
        startGasVolume,
    );
    let sproutDim = 20
    for (let i = 0; i < sproutCount; i++) {
        let x = Math.floor(Math.random() * (canvasWidth - sproutDim))
        let y = Math.floor(Math.random() * (canvasHeight - sproutDim))
        sprouts.push(new Sprout(x, y, sproutDim, sproutImage))
    }
    let presentDim = 20
    for (let i = 0; i < presentCount; i++) {
        let x = Math.floor(Math.random() * (canvasWidth - presentDim))
        let y = Math.floor(Math.random() * (canvasHeight - presentDim))
        presents.push(new Present(x, y, presentDim, presentImage))
    }
}

function loadImages() {
    home = new Image()
    home.src = './assets/home.png'

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

function loadAudio(){
    shortFart = new Audio();
    shortFart.src = './assets/short-fart.mp3'

    mediumFart = new Audio();
    mediumFart.src = './assets/medium-fart.mp3'

    longFart01 = new Audio();
    longFart01.src = './assets/long-fart-01.mp3'

    longFart02 = new Audio();
    longFart02.src = './assets/long-fart-02.mp3'

    longFart03 = new Audio();
    longFart03.src = './assets/long-fart-03.mp3'

    longFart04 = new Audio();
    longFart04.src = './assets/long-fart-04.mp3'

    longFart05 = new Audio();
    longFart05.src = './assets/long-fart-05.mp3'

    farts.push(longFart01, longFart02, longFart03, longFart04, longFart05, longFart06)

    crunch = new Audio();
    crunch.src = './assets/crunch.mp3'

    successSound = new Audio();
    successSound.src = './assets/success.mp3'

    jingleBells = new Audio();
    jingleBells.src = './assets/jingle.wav'
}

function setBackground() {
    const wrapperHome = document.getElementById('wrapper-home');
    wrapperHome.style.backgroundImage = "url(./assets/home.png)"
}

function showLeaderboardData() {
    // console.log(leaderboardStats)
    const tableWrapper = document.getElementById('table-wrapper')

    let previousTable = tableWrapper.children.length > 0 ? tableWrapper.children[0] : null;
    if (previousTable) previousTable.remove();

    let tableHeaders = ['Rank', 'Name', 'Level', 'Gas Used']

    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    const headerRow = document.createElement('tr')
    tableHeaders.forEach((title) => {
        let header = document.createElement('th')
        header.appendChild(document.createTextNode(title))
        headerRow.appendChild(header);
    })
    tblBody.appendChild(headerRow)

    leaderboardStats.forEach((player, index) => {
        let row = document.createElement("tr");

        let rankCell = document.createElement('td');
        rankCell.appendChild(document.createTextNode(`${index + 1}`))

        let nameCell = document.createElement('td');
        nameCell.appendChild(document.createTextNode((player.name)))

        let levelCell = document.createElement('td');
        levelCell.appendChild(document.createTextNode((player.level)))

        let gasCell = document.createElement('td');
        gasCell.appendChild(document.createTextNode((player.gas_used)))

        row.append(rankCell, nameCell, levelCell, gasCell)
        tblBody.appendChild(row)
    })
    tbl.appendChild(tblBody);
    tableWrapper.appendChild(tbl);
    tbl.setAttribute("border", "1px grey solid");
}

function showOverlay(type) {
    switch (type) {
        case 'level':
            overlay.firstElementChild.innerHTML = "Nice!!! On to the next space sector"
            overlay.lastElementChild.innerHTML = `Start space sector: ${player.level}`
            overlay.lastElementChild.id = 'game-overlay-btn'
            break;
        case'finish':
            overlay.firstElementChild.innerHTML = "Wow you collected allll the presents. you show off."
            overlay.lastElementChild.innerHTML = 'Go to leaderboard';
            overlay.lastElementChild.id = 'game-overlay-btn-complete'
            break;
        case 'lost':
            overlay.firstElementChild.innerHTML = "Awwwwww you're out of gas!"
            overlay.lastElementChild.innerHTML = 'Go to leaderboard';
            overlay.lastElementChild.id = 'game-overlay-btn-complete'
            break;
        case 're-start':
            overlay.firstElementChild.innerHTML = "Ok here we go again"
            overlay.lastElementChild.innerHTML = `Start space sector: ${player.level}`
            overlay.lastElementChild.id = 'game-overlay-btn'
            break;
    }
    overlay.style.display = '';
}

function startNextLevel() {
    createCanvasElements()
    startInterval()
    ru.updateGasMeter()
    ru.updatePresentCountDisplay()
}

function resetPlayer() {
    player.level = 1;
    player.finished = false;
    savePlayer(player.name)
    createCanvasElements()
    draw()
    showOverlay('re-start')
}

function checkName(name) {
    if (name.length > 10 || name.length < 2) {
        homeScreenError.innerHTML = 'please enter a name between 2 and 10 characters long'
        console.log("length", homeScreenError)
        return false
    }
    const regex = /[\/,<,>,{,},/\[,/\],(,),%,&,$,#,/\*,\^,@]/g;
    const matches = name.match(regex);
    if (matches && matches.length) {
        console.log("chars", matches)
        homeScreenError.innerHTML = 'No special characters please'+matches.join('')
        return false
    }
    return true
}


window.onload = function () {
    getLeaderboard()
    // console.log("on load")
    loadImages()
    setBackground()
    loadAudio()
    createCanvasElements()
    draw()
    ru.updateGasMeter()
    ru.updatePresentCountDisplay()

    startButton.addEventListener("click", () => {
        startInterval()
    });
    stopButton.addEventListener("click", () => {
        stopInterval()
    });
    // resetButton.addEventListener("click", () => {stopAndReset()});
    wrapper.addEventListener('click', (e) => {
        // console.log("event:", e)
        switch (e.target.id) {
            case 'game-overlay-btn':
                overlay.style.display = 'none';
                startNextLevel()
                shortFart.play()
                jingleBells.play()
                break;
            case 'game-overlay-btn-complete':
                overlay.style.display = 'none';
                gameWrapper.style.display = 'none'
                showLeaderboardData()
                leaderBoardWrapper.style.display = ''
                shortFart.play()
                break;
            case 'leaderboard-btn':
                gameWrapper.style.display = ''
                leaderBoardWrapper.style.display = 'none'
                resetPlayer()
                shortFart.play()
                break;
        }
    })

    canvas.addEventListener("touchstart", (e) => {
        if (play) {
            touchX = e.changedTouches[0].pageX - canvasOriginX
            touchY = e.changedTouches[0].pageY - canvasOriginY
            let type = ru.setTarget(touchX, touchY)
            console.log(type)

            if (type === 'long') {
                let num = Math.floor((Math.random()*5))
                console.log("number: ", num)
                farts[num].play()
            } else {
                mediumFart.play()
            }
            drawTouch()
        }
    });

    // events for getting name data
    const nameForm = document.getElementById('home-form')
    nameForm.addEventListener('submit', (e) => {
        shortFart.play();
        e.preventDefault();
        let formData = new FormData(nameForm);
        if (checkName(formData.get('name'))) {
            console.log("Name OK")
            player.name = formData.get('name')
            savePlayer(player.name)
            document.getElementById('wrapper-home').style.display = 'none'
            document.getElementById('wrapper-game').style.display = ''
            setCanvasOriginPoints()
        }
    })


    // console.log(savePlayer())
    // console.log(updatePlayer())
    // console.log(getLeaderboard())

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
