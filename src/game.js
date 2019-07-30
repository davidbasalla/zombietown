import * as THREE from "three";
import { OBJLoader } from "three-obj-loader-es6";
import { TrackballControls } from "three-trackballcontrols";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer, { processSelectTile } from "./reducers";
import { addTiles, selectTile, updateMaxPopulation } from "./actions";

import srcModelsDefs from "./srcModelsDefs.js";
import people from "./people";
import gridTiles from "./gridTiles";
import { createOutlineTile } from "./models";
import MenuContainer from "./ReactComponents/MenuContainer";

const COLOR_GREEN = 0x00ff00;
const COLOR_GRASS_GREEN = 0x44bb44;
const COLOR_GREY_DARK = 0x404040;
const COLOR_GREY_MID = 0x888888;
const COLOR_GREY_GREEN = 0x556655;
const COLOR_WHITE = 0xffffff;
const COLOR_BLACK = 0x000000;
const DEGREES_90 = 1.5708;
const GRID_WIDTH = 12;
const GRID_DEPTH = 12;

export default class Game {
  constructor() {
    this.scene = new THREE.Scene();
    this.defaultState = {
      turn: 1,
      foodAmount: 5,
      selectedTile: {
        displayName: "Nothing selected",
        resourceAttributes: {}
      },
      tiles: [],
      people: [...people],
      missions: [],
      displayConquerForm: false,
      ui: {
        conquerFormState: {
          selectedPeople: [],
          error: undefined
        },
        eventMessages: [
          // "Welcome to Zombietown!"
        ]
      }
    };

    this.originalModels = {
      road: {},
      building: {}
    };
    this.createdTiles = [];

    // Function bindings to 'this'
    this.processCanvasClick = this.processCanvasClick.bind(this);

    //Redux store
    this.store = createStore(
      rootReducer,
      this.defaultState,
      applyMiddleware(thunk)
    );
    this.store.subscribe(() => this.processStateUpdate());
  }

  start() {
    this.camera = this.setupCamera();
    this.renderer = this.setupRenderer();
    this.setupLights();
    this.loadOriginalModels().then(() => {
      this.buildStreetGrid();
      this.placeTiles();
    });
    this.setupClickHandler();

    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };

    animate();
    this.renderMenu();
  }

  setupRenderer() {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(COLOR_GREY_MID);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    return renderer;
  }

  setupCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    const d = 45;
    const offsetX = 8;
    const offsetY = 8;
    const camera = new THREE.OrthographicCamera(
      -d * aspect + offsetX,
      d * aspect + offsetX,
      d + offsetY,
      -d + offsetY,
      1,
      1000
    );

    camera.position.set(80, 60, 80); // all components equal
    camera.lookAt(this.scene.position);
    return camera;
  }

  setupLights() {
    const light = new THREE.HemisphereLight(0xddddff, 0x775566, 1.5);
    this.scene.add(light);

    const directionalLight = new THREE.DirectionalLight(COLOR_WHITE, 1.5);
    directionalLight.position.set(60, 50, -20);
    directionalLight.castShadow = true;

    const targetObject = new THREE.Object3D();
    this.scene.add(targetObject);
    targetObject.position.set(0, 0, 0);
    directionalLight.target = targetObject;

    this.scene.add(directionalLight);

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
    // this.scene.add(helper);
  }

  loadModel(loader, modelDef) {
    return new Promise((resolve, reject) => {
      const material = new THREE.MeshStandardMaterial();
      material.map = new THREE.TextureLoader().load(modelDef.imgFilePath);

      loader.load(
        modelDef.objFilePath,
        object => {
          object.scale.set(...modelDef.scale);
          object.traverse(child => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.material = material;
            }
          });
          this.originalModels[modelDef.type][modelDef.name] = {
            mesh: object,
            material: material
          };
          resolve();
        },
        xhr => {
          console.log(xhr.loaded / xhr.total * 100 + "% loaded");
        },
        error => {
          console.log("An error happened");
          reject();
        }
      );
    });
  }

  loadOriginalModels() {
    const loader = new OBJLoader();

    return new Promise((resolve, reject) => {
      let loadPromises = srcModelsDefs.map(modelDef =>
        this.loadModel(loader, modelDef)
      );

      Promise.all(loadPromises).then(resolve);
    });
  }

  buildStreetGrid() {
    const multiplier = 23.4;
    const roadModels = this.originalModels["road"];

    for (let x = -GRID_WIDTH / 2; x < GRID_WIDTH / 2; x++) {
      for (let z = -GRID_DEPTH / 2; z < GRID_DEPTH / 2; z++) {
        const intersection = roadModels["roadIntersection"]["mesh"].clone();
        intersection.position.set(x * multiplier, 0, z * multiplier);
        this.scene.add(intersection);

        const lane = roadModels["roadLane1"]["mesh"].clone();
        lane.position.set(x * multiplier + 0.2, 0, z * multiplier + 7.6);
        this.scene.add(lane);

        const laneRotated = roadModels["roadLane1"]["mesh"].clone();
        laneRotated.rotation.y += DEGREES_90;
        laneRotated.position.set(x * multiplier + 6.7, 0, z * multiplier - 0.1);
        this.scene.add(laneRotated);

        const lane2 = roadModels["roadLane3"]["mesh"].clone();
        lane2.position.set(x * multiplier + 0.7, 0, z * multiplier + 15);
        this.scene.add(lane2);

        const laneRotated2 = roadModels["roadLane3"]["mesh"].clone();
        laneRotated2.rotation.y += DEGREES_90;
        laneRotated2.position.set(
          x * multiplier + 14.1,
          0,
          z * multiplier + -0.6
        );
        this.scene.add(laneRotated2);
      }
    }
  }

  placeTiles() {
    const multiplier = 23.4;
    const keys = Object.keys(gridTiles);

    const coordinates = [];
    for (let x = -GRID_WIDTH / 2; x < GRID_WIDTH / 2; x++) {
      for (let z = -GRID_DEPTH / 2; z < GRID_DEPTH / 2; z++) {
        const index = Math.floor(Math.random() * keys.length);
        const tileName = keys[index];
        coordinates.push([x, z, tileName]);
      }
    }

    // Filter out middle 4 tiles
    const filteredCoords = coordinates.filter(coord => {
      return (
        (coord[0] != 0 || coord[1] != 0) &&
        (coord[0] != -1 || coord[1] != -1) &&
        (coord[0] != 0 || coord[1] != -1) &&
        (coord[0] != -1 || coord[1] != 0)
      );
    });

    // Add custom starting buildings
    filteredCoords.push([0, 0, "0", true]); //smallResidential
    filteredCoords.push([0, -1, "3", true]); //supermarket
    filteredCoords.push([-1, 0, "5", true]); //gasStation
    filteredCoords.push([-1, -1, "1", true]); //tallResidential

    const visibleTiles = [];

    filteredCoords.forEach((coord, index) => {
      const x = coord[0];
      const z = coord[1];
      const tileName = coord[2];
      const taken = coord[3] || false;
      const visible = this.createdTiles.push({
        id: index,
        name: gridTiles[tileName].name,
        displayName: gridTiles[tileName].displayName,
        resourceAttributes: gridTiles[tileName].resourceAttributes,
        tile: this.createSelectableTile(x * multiplier, z * multiplier),
        displayTile: this.createDisplayTile(x * multiplier, z * multiplier),
        fogTile: this.createFogTile(x * multiplier, z * multiplier),
        position: { x: x, z: z },
        assets: this.createTile(
          tileName,
          x * multiplier,
          z * multiplier,
          taken
        ),
        taken: taken,
        conquerCounter: gridTiles[tileName].conquerCounter
      });
    });

    // update store with tiles
    this.store.dispatch(addTiles(this.createdTiles));
  }

  createSelectableTile(x, z) {
    const geometry = new THREE.PlaneGeometry(19, 19, 32);
    const material = new THREE.MeshStandardMaterial({
      color: Math.random() * COLOR_WHITE,
      opacity: 0.0,
      transparent: true,
      side: THREE.DoubleSide
    });

    const tile = new THREE.Mesh(geometry, material);
    tile.castShadow = false;
    tile.receiveShadow = false;
    tile.rotation.x = DEGREES_90;
    tile.position.set(x + 11, 0.25, z - 11);
    this.scene.add(tile);

    return tile;
  }

  createDisplayTile(x, z) {
    const geometry = createOutlineTile();

    const material = new THREE.MeshBasicMaterial({
      color: COLOR_GREEN,
      opacity: 0.0,
      transparent: true,
      side: THREE.DoubleSide
    });

    const tile = new THREE.Mesh(geometry, material);
    tile.castShadow = false;
    tile.receiveShadow = false;
    tile.rotation.x = DEGREES_90;
    tile.position.set(x + 0.5, 0.5, z + 1);
    this.scene.add(tile);

    return tile;
  }

  createTileGround(x, z, taken) {
    const geometry = new THREE.PlaneGeometry(20, 20, 32);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: COLOR_GRASS_GREEN,
      side: THREE.DoubleSide
    });

    const plane = new THREE.Mesh(geometry, planeMaterial);
    plane.receiveShadow = true;
    this.scene.add(plane);
    plane.rotation.x = DEGREES_90;
    plane.position.set(x + 10, -0.25, z - 10);
    return plane;
  }

  createFogTile(x, z) {
    const geometry = new THREE.PlaneGeometry(23.4, 23.4, 32);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: COLOR_BLACK,
      opacity: 0.75,
      transparent: true,
      side: THREE.DoubleSide
    });

    const plane = new THREE.Mesh(geometry, planeMaterial);
    plane.castShadow = false;
    plane.receiveShadow = false;
    this.scene.add(plane);
    plane.rotation.x = DEGREES_90;
    plane.position.set(x + 25, 10, z + 2);

    return plane;
  }

  createTile(gridTileName, x, z, taken) {
    let assets = [];

    const groundPlane = this.createTileGround(x, z, taken);
    if (!taken) groundPlane.material.color.set(COLOR_GREY_GREEN);
    assets.push(groundPlane);

    // place the assets
    gridTiles[gridTileName].assets.forEach(asset => {
      const srcAsset = this.originalModels["building"][asset.name];
      const mesh = srcAsset["mesh"].clone();
      const material = srcAsset["material"].clone();

      if (!taken) material.color.set(COLOR_GREY_DARK);

      mesh.traverse(child => (child.material = material));

      asset.scale &&
        mesh.scale.set(asset.scale[0], asset.scale[1], asset.scale[2]);

      mesh.position.set(
        x + asset.offset[0],
        0 + asset.offset[1],
        z + asset.offset[2]
      );
      this.scene.add(mesh);
      assets.push(mesh);
    });
    return assets;
  }

  processCanvasClick(event) {
    event.preventDefault();
    const mouse3D = new THREE.Vector3(
      event.clientX / window.innerWidth * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse3D, this.camera);

    const tiles = this.store.getState().tiles;

    const intersects = raycaster.intersectObjects(tiles.map(x => x.tile));

    if (intersects.length > 0) {
      intersects[0].object.material.color.setHex(Math.random() * COLOR_WHITE);
      const gridTile = tiles.find(x => x.tile == intersects[0].object);

      this.store.dispatch(processSelectTile(tiles, gridTile));
      this.renderMenu();
    }
  }

  setupClickHandler() {
    document
      .getElementById("canvas")
      .addEventListener("mousedown", this.processCanvasClick);
  }

  renderMenu() {
    ReactDOM.render(
      <Provider store={this.store}>
        <MenuContainer />
      </Provider>,
      document.getElementById("controls")
    );
  }

  processStateUpdate() {
    console.log("STATUS UPDATE");
    console.log(this.store.getState());
  }
}
