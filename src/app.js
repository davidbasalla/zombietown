import * as THREE from "three";
import { OBJLoader } from "three-obj-loader-es6";
import { TrackballControls } from "three-trackballcontrols";

var scene = new THREE.Scene();

var aspect = window.innerWidth / window.innerHeight;
var d = 20;
var camera = new THREE.OrthographicCamera(
  -d * aspect,
  d * aspect,
  d,
  -d,
  1,
  1000
);

camera.position.set(20, 15, 20); // all components equal
camera.lookAt(scene.position); // or the origin

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x888888);
document.body.appendChild(renderer.domElement);

var light = new THREE.PointLight(0xffffff, 10, 100);
light.position.set(50, 50, 50);
scene.add(light);

// var geometry = new THREE.BoxGeometry(1, 10, 1);

var material = new THREE.MeshStandardMaterial();
material.map = new THREE.TextureLoader().load(
  "../assets/Building_Super_Market.png"
);

// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

var texture = new THREE.TextureLoader().load(
  "../assets/Building_Super_Market.png"
);

// instantiate a loader
const loader = new OBJLoader();

// load a resource
loader.load(
  // resource URL
  "../assets/Building_Super_Market.obj",
  // called when resource is loaded
  function(object) {
    object.scale.set(0.01, 0.01, 0.01);
    object.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    scene.add(object);
  },
  // called when loading is in progresses
  function(xhr) {
    console.log(xhr.loaded / xhr.total * 100 + "% loaded");
  },
  // called when loading has errors
  function(error) {
    console.log("An error happened");
  }
);

camera.position.z = 10;

var animate = function() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;

  renderer.render(scene, camera);
};

animate();
