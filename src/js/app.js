import {db} from './firebase.js';
import {Rudolf} from  './Models/Rudolf.js'
import {Sprout} from  './Models/Sprout.js'
import {Present} from  './Models/Present.js'

function getUsers() {
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });
}

getUsers();


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const ru = new Rudolf(100,100)
const sprout = new Sprout(200, 200)
const present = new Present(300, 300)

ctx.beginPath();
ctx.rect(ru.x, ru.y, 50, 50);
ctx.rect(sprout.x, sprout.y, 50, 50);
ctx.rect(present.x, present.y, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();