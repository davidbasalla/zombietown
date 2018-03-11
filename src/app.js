import * as THREE from "three";
import { OBJLoader } from "three-obj-loader-es6";
import { TrackballControls } from "three-trackballcontrols";
import React from "react";
import ReactDOM from "react-dom";

import srcModelsDefs from "./buildings.js";
import gridTiles from "./gridTiles";
import Menu from "./ReactComponents/Menu";

const DEGREES_90 = 1.5708;

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

let state = {
  turn: 1,
  selectedTile: null
};

camera.position.set(80, 60, 80); // all components equal
camera.lookAt(scene.position);

// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x888888);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

// LIGHTS
const light = new THREE.HemisphereLight(0xddddff, 0x775566, 1.5);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(60, 50, -20);
directionalLight.castShadow = true;

const targetObject = new THREE.Object3D();
scene.add(targetObject);
targetObject.position.set(0, 0, 0);
directionalLight.target = targetObject;

scene.add(directionalLight);

//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 4096; // default
directionalLight.shadow.mapSize.height = 4096; // default
directionalLight.shadow.camera.near = 0.1; // default
directionalLight.shadow.camera.far = 200; // default
directionalLight.shadow.camera.top = 200; // default
directionalLight.shadow.camera.right = 200; // default
directionalLight.shadow.camera.bottom = -200; // default
directionalLight.shadow.camera.left = -200; // default

// var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper);

// PLANE
const geometry = new THREE.PlaneGeometry(1000, 1000, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0x44bb44,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.x = DEGREES_90;
plane.position.y = -0.1;

// LOADING MODELS
let originalModels = {
  road: {},
  building: {}
};
let createdTiles = [];

const loadModel = (loader, modelDef) => {
  return new Promise(function(resolve, reject) {
    const material = new THREE.MeshStandardMaterial();
    // material.specular = 0x000000;
    material.map = new THREE.TextureLoader().load(modelDef.imgFilePath);

    loader.load(
      modelDef.objFilePath,
      function(object) {
        object.scale.set(...modelDef.scale);
        object.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = material;
          }
        });
        originalModels[modelDef.type][modelDef.name] = object;
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
  const roadModels = originalModels["road"];

  for (let x = -5; x < 5; x++) {
    for (let z = -5; z < 5; z++) {
      const intersection = roadModels["roadIntersection"].clone();
      intersection.position.set(x * multiplier, 0, z * multiplier);
      scene.add(intersection);

      const lane = roadModels["roadLane1"].clone();
      lane.position.set(x * multiplier + 0.2, 0, z * multiplier + 7.6);
      scene.add(lane);

      const laneRotated = roadModels["roadLane1"].clone();
      laneRotated.rotation.y += DEGREES_90;
      laneRotated.position.set(x * multiplier + 6.7, 0, z * multiplier - 0.1);
      scene.add(laneRotated);

      const lane2 = roadModels["roadLane3"].clone();
      lane2.position.set(x * multiplier + 0.7, 0, z * multiplier + 15);
      scene.add(lane2);

      const laneRotated2 = roadModels["roadLane3"].clone();
      laneRotated2.rotation.y += DEGREES_90;
      laneRotated2.position.set(
        x * multiplier + 14.1,
        0,
        z * multiplier + -0.6
      );
      scene.add(laneRotated2);
    }
  }
};

const createSelectableTile = (x, z) => {
  // CREATE SELECTABLE TILE
  const geometry = new THREE.PlaneGeometry(19, 19, 32);
  const material = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff,
    opacity: 0.0,
    transparent: true,
    side: THREE.DoubleSide
  });

  const tile = new THREE.Mesh(geometry, material);
  tile.castShadow = false;
  tile.receiveShadow = false;
  tile.rotation.x = DEGREES_90;
  tile.position.set(x + 11, 0.25, z - 11);
  scene.add(tile);

  return tile;
};

const createDisplayTile = (x, z) => {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(0, -5, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, 0, 0),
    new THREE.Vector3(5, -5, 0),
    new THREE.Vector3(18, -5, 0),
    new THREE.Vector3(18, 0, 0),
    new THREE.Vector3(23, 0, 0),
    new THREE.Vector3(23, -5, 0),
    new THREE.Vector3(23, -18, 0),
    new THREE.Vector3(18, -18, 0),
    new THREE.Vector3(23, -23, 0),
    new THREE.Vector3(18, -23, 0),
    new THREE.Vector3(5, -23, 0),
    new THREE.Vector3(5, -18, 0),
    new THREE.Vector3(0, -23, 0),
    new THREE.Vector3(0, -18, 0)
  );

  const faces = [
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(0, 2, 3),
    new THREE.Face3(2, 3, 4),
    new THREE.Face3(2, 4, 5),
    new THREE.Face3(4, 5, 7),
    new THREE.Face3(5, 6, 7),
    new THREE.Face3(5, 6, 8),
    new THREE.Face3(5, 8, 9),
    new THREE.Face3(8, 9, 10),
    new THREE.Face3(9, 10, 11),
    new THREE.Face3(9, 11, 12),
    new THREE.Face3(9, 12, 13),
    new THREE.Face3(12, 13, 14),
    new THREE.Face3(13, 14, 15),
    new THREE.Face3(0, 13, 15),
    new THREE.Face3(0, 3, 13)
  ];
  faces.forEach(x => geometry.faces.push(x));

  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    opacity: 0.0,
    transparent: true,
    side: THREE.DoubleSide
  });

  const tile = new THREE.Mesh(geometry, material);
  tile.castShadow = false;
  tile.receiveShadow = false;
  tile.rotation.x = DEGREES_90;
  tile.position.set(x + 0.5, 0.5, z + 1);
  scene.add(tile);

  return tile;
};

const createTile = (gridTileName, x, z) => {
  // const rotations = [0, DEGREES_90, 3.14159, 4.71239];

  let assets = [];
  gridTiles[gridTileName].assets.forEach(asset => {
    const obj = originalModels["building"][asset.name].clone();

    asset.scale &&
      obj.scale.set(asset.scale[0], asset.scale[1], asset.scale[2]);

    obj.position.set(
      x + asset.offset[0],
      0 + asset.offset[1],
      z + asset.offset[2]
    );
    // obj.rotation.y = rotations[Math.floor(Math.random() * 4)];
    scene.add(obj);
    assets.push(obj);
  });
  return assets;
};

const placeTiles = () => {
  const multiplier = 23.4;
  const keys = Object.keys(gridTiles);

  for (let x = -5; x < 5; x++) {
    for (let z = -5; z < 5; z++) {
      // pick a random tile
      const randomIndex = Math.floor(Math.random() * keys.length);
      const tileName = keys[randomIndex];

      createdTiles.push({
        name: gridTiles[tileName].name,
        displayName: gridTiles[tileName].displayName,
        tile: createSelectableTile(x * multiplier, z * multiplier),
        displayTile: createDisplayTile(x * multiplier, z * multiplier),
        assets: createTile(tileName, x * multiplier, z * multiplier)
      });
    }
  }
};

loadOriginalModels().then(function() {
  console.log("PROMISES FULFILLED");
  buildStreetGrid();
  placeTiles();
});

document.addEventListener("mousedown", onDocumentMouseDown);

function onDocumentMouseDown(event) {
  event.preventDefault();
  const mouse3D = new THREE.Vector3(
    event.clientX / window.innerWidth * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse3D, camera);

  const intersects = raycaster.intersectObjects(createdTiles.map(x => x.tile));

  if (intersects.length > 0) {
    intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    const gridTile = createdTiles.find(x => x.tile == intersects[0].object);
    console.log(gridTile);
    console.log("Selected " + gridTile.displayName);
    state.selectedTile = gridTile.displayName;

    createdTiles.forEach(x => (x.displayTile.material.opacity = 0));

    gridTile.displayTile.material.opacity = 0.5;
    renderMenu();
  }
}

const nextTurn = function() {
  state.turn += 1;
  renderMenu();
};

const renderMenu = function() {
  ReactDOM.render(
    <Menu state={state} nextTurn={nextTurn} />,
    document.getElementById("controls")
  );
};

const animate = function() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;

  renderer.render(scene, camera);
};

animate();
renderMenu();
