import * as THREE from "three";
import { OBJLoader } from "three-obj-loader-es6";
import { TrackballControls } from "three-trackballcontrols";
import srcModelsDefs from "./buildings.js";

const scene = new THREE.Scene();

// CAMERA
const aspect = window.innerWidth / window.innerHeight;
const d = 30;
const offsetX = 0;
const offsetY = 0;
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
plane.rotation.x = 1.5708;
plane.position.y = -0.1;

// LOADING MODELS
let originalModels = {};

const loadModel = (loader, modelDef) => {
  return new Promise(function(resolve, reject) {
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
        originalModels[modelDef.name] = object;
        resolve();
      },
      function(xhr) {
        console.log(xhr.loaded / xhr.total * 100 + "% loaded");
      },
      function(error) {
        console.log("An error happened");
        reject();
      }
    );
  });
};

const loadOriginalModels = () => {
  const loader = new OBJLoader();

  return new Promise(function(resolve, reject) {
    let load_promises = srcModelsDefs.map(modelDef =>
      loadModel(loader, modelDef)
    );

    Promise.all(load_promises).then(resolve);
  });
};

// BUILD STREET GRID
const buildStreetGrid = () => {
  const multiplier = 23.4;

  for (let x = -5; x < 5; x++) {
    for (let z = -5; z < 5; z++) {
      const intersection = originalModels["roadIntersection"].clone();
      intersection.position.set(x * multiplier, 0, z * multiplier);
      scene.add(intersection);

      const lane = originalModels["roadLane1"].clone();
      lane.position.set(x * multiplier + 0.2, 0, z * multiplier + 7.6);
      scene.add(lane);

      const laneRotated = originalModels["roadLane1"].clone();
      laneRotated.rotation.y += 1.5708;
      laneRotated.position.set(x * multiplier + 6.7, 0, z * multiplier - 0.1);
      scene.add(laneRotated);

      const lane2 = originalModels["roadLane3"].clone();
      lane2.position.set(x * multiplier + 0.7, 0, z * multiplier + 15);
      scene.add(lane2);

      const laneRoated2 = originalModels["roadLane3"].clone();
      laneRoated2.rotation.y += 1.5708;
      laneRoated2.position.set(x * multiplier + 14.1, 0, z * multiplier + -0.6);
      scene.add(laneRoated2);
    }
  }
};

loadOriginalModels().then(function() {
  console.log("PROMISES FULFILLED");
  buildStreetGrid();
});

const animate = function() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;

  renderer.render(scene, camera);
};

animate();
