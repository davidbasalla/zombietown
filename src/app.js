import * as THREE from "three";
import { OBJLoader } from "three-obj-loader-es6";
import { TrackballControls } from "three-trackballcontrols";
import srcModelsDefs from "./buildings.js";

var scene = new THREE.Scene();

// CAMERA
var aspect = window.innerWidth / window.innerHeight;
var d = 2000;
var offsetX = -3000;
var offsetY = -1000;
var camera = new THREE.OrthographicCamera(
  -d * aspect + offsetX,
  d * aspect + offsetX,
  d + offsetY,
  -d + offsetY,
  0.01,
  10000
);

camera.position.set(5000, 3500, 5000); // all components equal
camera.lookAt(0, 0, 0); // or the origin

// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x888888);
document.body.appendChild(renderer.domElement);

// LIGHTS
var light = new THREE.HemisphereLight(0xddddff, 0x556655, 1.75);
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

var targetObject = new THREE.Object3D();
scene.add(targetObject);
targetObject.position.set(-5, 0, 0);
directionalLight.target = targetObject;

// PLANE
var geometry = new THREE.PlaneGeometry(100000, 100000, 32);
var material = new THREE.MeshBasicMaterial({
  color: 0x44bb44,
  side: THREE.DoubleSide
});
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.x += 1.5708;

// LOADING MODELS
var loadOriginalModels = () => {
  const loader = new OBJLoader();

  srcModelsDefs.map(modelDef => {
    const material = new THREE.MeshStandardMaterial();
    material.map = new THREE.TextureLoader().load(modelDef.imgFilePath);

    loader.load(
      modelDef.objFilePath,
      function(object) {
        object.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
          }
        });

        // scene.add(object);
        var newObject = object.clone();
        newObject.position.set(...modelDef.position);
        scene.add(newObject);
      },
      function(xhr) {
        console.log(xhr.loaded / xhr.total * 100 + "% loaded");
      },
      function(error) {
        console.log("An error happened");
      }
    );
  });
};

loadOriginalModels();

camera.position.z = 10;

var animate = function() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;

  renderer.render(scene, camera);
};

animate();
