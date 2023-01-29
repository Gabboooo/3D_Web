import './style.css';
import * as THREE from "three";

import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"


const clock = new THREE.Clock();
let scene, camera, light1, light2, object, renderer;

init();
animate();


function init(){
    scene = new THREE.Scene();
  
    //RENDERER
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x303030, 1);
    document.querySelector('.container-canvas').appendChild( renderer.domElement );

    //CAMERA
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0,0, 2)

    const loader = new GLTFLoader();
    loader.load("/first.glb", function(obj){
        object = obj.scene;
        console.log(object)
		scene.add( object );
    })

    //LIGHT1
    light1 = new THREE.PointLight( 0x000000, 4, 100 );
    light1.position.set( 10, 30, 10 );
    scene.add(light1);
    //LIGHT2
    light2 = new THREE.PointLight( 0xffffff, 1, 50);
    light2.position.set(-10, -11, 10);
    scene.add(light2);


    renderer.toneMapping = THREE.sRGBEncoding
    renderer.outputEncoding = THREE.sRGBEncoding
}


window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

};

function animate() {
    requestAnimationFrame( animate );

    const time = Date.now() * 0.0005;
    const delta = clock.getDelta();
    //animation color
    const hue = Math.sin(time*0.2)**2;
    //animate light movement
    light1.position.x = 10 * Math.cos(time )
    light1.position.z = 10 * Math.sin(time + 0.002231) + 6;
    //animate light color
    light1.color.setHSL(hue, 0.3, 0.6);
    //animate ball
    if(object){
        object.rotation.y -= 0.3 * delta;
        object.rotation.z -= 0.2 * delta;
    }


    renderer.render(scene, camera)
}
