import * as THREE from "three";

export const createOutlineTile = () => {
  const geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(0, -3, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(3, -3, 0),
    new THREE.Vector3(20, -3, 0),
    new THREE.Vector3(20, 0, 0),
    new THREE.Vector3(23, 0, 0),
    new THREE.Vector3(23, -3, 0),
    new THREE.Vector3(23, -20, 0),
    new THREE.Vector3(20, -20, 0),
    new THREE.Vector3(23, -23, 0),
    new THREE.Vector3(20, -23, 0),
    new THREE.Vector3(3, -23, 0),
    new THREE.Vector3(3, -20, 0),
    new THREE.Vector3(0, -23, 0),
    new THREE.Vector3(0, -20, 0)
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

  return geometry;
};
