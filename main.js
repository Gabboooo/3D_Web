import './style.css';
import * as THREE from "three";

import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const clock = new THREE.Clock();
let scene, camera, light1, light2, light3, object, renderer, text1, controls;

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
    camera.position.set(0,0, 10)

    const loader = new GLTFLoader();
    loader.load("/first.glb", function(obj){
        obj.scene.scale.set(6,6,6)
        object = obj.scene;
		scene.add( object );
    })

    const fontLoader = new FontLoader()
    fontLoader.load("./fonts/notosans.json", function(response){
        const textGeom = new TextGeometry('Hello world! \nMy name is Gabriele :)',{
            font: response,
			size: 1,
			height: 0.2,
			curveSegments: 3,
			bevelThickness: 0.03,
			bevelSize: 0.03,
			bevelEnabled: true
        })

        textGeom.computeBoundingBox();
        console.log(textGeom)

        const textMaterial = new THREE.MeshStandardMaterial({
            color:0xffffff,
            roughness:0.5,
            metalness: 0.8
        });
        text1 = new THREE.Mesh(textGeom, textMaterial);
        scene.add(text1);
        const midpoint = (textGeom.boundingBox.max.x - textGeom.boundingBox.min.x )/ 2
        text1.position.set(midpoint,0 ,-6);
        text1.rotateY(Math.PI);
    });

    //LIGHT1
    light1 = new THREE.PointLight( 0x000000, 4, 100 );
    light1.position.set( 10, 30, 10 );
    scene.add(light1);
    //LIGHT2
    light2 = new THREE.PointLight( 0xffffff, 1, 50);
    light2.position.set(-10, -11, 10);
    scene.add(light2);
    //LIGHT3
    light3 = new THREE.PointLight( 0xffffff, 1, 50);
    light3.position.set(0, 0, -20);
    scene.add(light3);

    renderer.outputEncoding = THREE.sRGBEncoding
    controls = new OrbitControls( camera, renderer.domElement );
    
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

    controls.update()
    renderer.render(scene, camera)
}
