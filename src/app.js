import * as THREE from "three";
import { OBJLoader } from "three-obj-loader-es6";
import { TrackballControls } from "three-trackballcontrols";
import srcModelsDefs from "./buildings.js";

const scene = new THREE.Scene();

// CAMERA
const aspect = window.innerWidth / window.innerHeight;
const d = 20;
const offsetX = -18;
const offsetY = -5;
const camera = new THREE.OrthographicCamera(
  -d * aspect + offsetX,
  d * aspect + offsetX,
  d + offsetY,
  -d + offsetY,
  1,
  1000
);

camera.position.set(40, 30, 40); // all components equal
camera.lookAt(scene.position);

// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x888888);
document.body.appendChild(renderer.domElement);

// LIGHTS
const light = new THREE.HemisphereLight(0xddddff, 0x556655, 1.75);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

const targetObject = new THREE.Object3D();
scene.add(targetObject);
targetObject.position.set(-5, 0, 0);
directionalLight.target = targetObject;

// PLANE
const geometry = new THREE.PlaneGeometry(1000, 1000, 32);
const material = new THREE.MeshBasicMaterial({
  color: 0x44bb44,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.x += 1.5708;

// LOADING MODELS
const loadOriginalModels = () => {
  const loader = new OBJLoader();

  srcModelsDefs.map(modelDef => {
    const material = new THREE.MeshStandardMaterial();
    material.map = new THREE.TextureLoader().load(modelDef.imgFilePath);

    loader.load(
      modelDef.objFilePath,
      function(object) {
        object.scale.set(...modelDef.scale);
        object.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
          }
        });

        // scene.add(object);
        const newObject = object.clone();
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

const animate = function() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;

  renderer.render(scene, camera);
};

animate();
