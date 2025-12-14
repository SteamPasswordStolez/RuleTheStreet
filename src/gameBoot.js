import * as THREE from "three";
import {loadPlayer,savePlayer} from "./playerData.js";
import {cars} from "./cars.js";

const player=loadPlayer();
const car=cars[player.car];

const scene=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,0.1,1000);
cam.position.set(0,5,10);

const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

const geo=new THREE.PlaneGeometry(200,200);
const mat=new THREE.MeshBasicMaterial({color:0x333333});
const ground=new THREE.Mesh(geo,mat);
ground.rotation.x=-Math.PI/2;
scene.add(ground);

const box=new THREE.Mesh(new THREE.BoxGeometry(1,0.5,2),new THREE.MeshBasicMaterial({color:0xff5500}));
scene.add(box);

let speed=0;
let last=performance.now();

function loop(t){
  const dt=(t-last)/1000; last=t;
  speed=Math.min(car.maxSpeed,speed+car.acceleration*dt*2);
  box.position.z-=speed*dt*0.02;
  player.distance+=speed*dt*0.02;
  player.quest+=speed*dt*0.02;

  if(player.quest>=1000){
    player.quest=0;
    player.credits+=500;
  }
  savePlayer(player);
  document.getElementById("hud").innerText=
    `Speed ${Math.round(speed)} km/h | Dist ${Math.floor(player.distance)} m | Credits ${player.credits}`;
  renderer.render(scene,cam);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
