import './style.css';
import * as THREE from "three";

const scene = new THREE.Scene();

//CAMERA
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0, 10)

//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.querySelector('.container-canvas').appendChild( renderer.domElement );

//ball -> todo cube
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial( { color: 0xab31ff } );
const palla = new THREE.Mesh( geometry, material );
palla.position.set(0,0,0)
scene.add(palla);

//AXES HELPER
const axisHelp = new THREE.AxesHelper(2);
scene.add(axisHelp);

//LIGHT
const light = new THREE.PointLight( 0xff0000, 30, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};

function animate() {
    requestAnimationFrame( animate );

    const time = Date.now();
    const rComp = Math.sin(time * 0.002 + 0.4)  
    const gComp = Math.sin(time * 0.004 + 0.11) 
    const bComp = Math.cos(time * 0.001 + 0.13) 

    light.color.setRGB( rComp, gComp, bComp);
    renderer.render(scene, camera)
}
animate();