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

let originalModels = {};
const srcModelsDefs = [
  {
    objFilePath: "../assets/Building_Super_Market.obj",
    imgFilePath: "../assets/Building_Super_Market.png",
    objScale: [0.01, 0.01, 0.01],
    position: [0, 0, -3]
  },
  {
    objFilePath: "../assets/Building_Factory.obj",
    imgFilePath: "../assets/Building_Factory.png",
    objScale: [0.01, 0.01, 0.01],
    position: [-10, 0, 0]
  },
  {
    objFilePath: "../assets/Building_Gas_Station.obj",
    imgFilePath: "../assets/Building_Gas_Station.png",
    objScale: [0.01, 0.01, 0.01],
    position: [0, 0, 10]
  },
  {
    objFilePath: "../assets/Building_Sky_big_color01.obj",
    imgFilePath: "../assets/Building_Sky_big_color01.png",
    objScale: [0.01, 0.01, 0.01],
    position: [-12, 0, -11]
  },
  {
    objFilePath: "../assets/Building_Sky_big_color01.obj",
    imgFilePath: "../assets/Building_Sky_big_color02.png",
    objScale: [0.01, 0.01, 0.01],
    position: [12, 0, -11]
  },
  {
    objFilePath: "../assets/Building_Sky_small_color01.obj",
    imgFilePath: "../assets/Building_Sky_small_color01.png",
    objScale: [0.01, 0.01, 0.01],
    position: [8, 0, -11]
  },
  {
    objFilePath: "../assets/Building_Pizza.obj",
    imgFilePath: "../assets/Building_Pizza.png",
    objScale: [0.01, 0.01, 0.01],
    position: [13, 0, -3]
  },
  {
    objFilePath: "../assets/Building_Fast_Food.obj",
    imgFilePath: "../assets/Building_Fast_Food.png",
    objScale: [0.01, 0.01, 0.01],
    position: [-12, 0, 10]
  },
  {
    objFilePath: "../assets/Building_Restaurant.obj",
    imgFilePath: "../assets/Building_Restaurant.png",
    objScale: [0.01, 0.01, 0.01],
    position: [10, 2.1, 8]
  }
];

var size = 50;
var divisions = 50;

var gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

var loadOriginalModels = () => {
  const loader = new OBJLoader();

  srcModelsDefs.map(modelDef => {
    const material = new THREE.MeshStandardMaterial();
    material.map = new THREE.TextureLoader().load(modelDef.imgFilePath);

    loader.load(
      modelDef.objFilePath,
      function(object) {
        object.scale.set(...modelDef.objScale);
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
