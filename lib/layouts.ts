import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { RefObject } from 'react';

export type ObjectCoords = {
  positions: THREE.Vector3[];
  rotations: THREE.Euler[];
};

interface RenderTargets {
  helix: THREE.Object3D[];
  sphere: THREE.Object3D[];
  grid: THREE.Object3D[];
  '': THREE.Object3D[];
  [key: string]: THREE.Object3D[];
}
export const grid = (n: number) => {
  let res = [];
  for (let i = 0; i < n; i++) {
    const object = new THREE.Object3D();

    object.position.x = (i % 5) * 4 - 8;
    object.position.y = -(Math.floor(i / 5) % 5) * 4 + 8;
    object.position.z = Math.floor(i / 25) * 10 - 20;

    res.push(object);
  }
  return res;
};

export const helixPositions = (
  n: number,
  vector: THREE.Vector3
): THREE.Object3D[] => {
  let res = [];
  for (let i = 0, l = n; i < l; i++) {
    const theta = i * 0.305;
    const y = -i * 0.3 + 10;

    const object = new THREE.Object3D();

    object.position.setFromCylindricalCoords(8, theta, y);

    vector.x = object.position.x * 2;
    vector.y = object.position.y;
    vector.z = object.position.z * 2;

    object.lookAt(vector);
    res.push(object);
  }
  return res;
};

export const spherePositions = (n: number, vector: THREE.Vector3) => {
  let res = [];
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(-1 + (2 * i) / n);
    const theta = Math.sqrt(n * Math.PI) * phi;

    const object = new THREE.Object3D();

    object.position.setFromSphericalCoords(8, phi, theta);

    vector.copy(object.position).multiplyScalar(2);

    object.lookAt(vector);

    res.push(object);
  }
  return res;
};

export const tablePositions = (n: number, vector: THREE.Vector3) => {
  let res = [];
  let rowLength = Math.sqrt(n);
  rowLength =
    rowLength - Math.floor(Math.sqrt(n)) === 0 ? rowLength : rowLength + 1;
  for (let i = 0; i < n; i++) {}
};

export const getTargets = (n: number, vector: THREE.Vector3): RenderTargets => {
  return {
    helix: helixPositions(n, vector),
    sphere: spherePositions(n, vector),
    grid: grid(n),
    '': Array.from({ length: 50 }).map(() => new THREE.Object3D()),
  };
};

const targets = getTargets(50, new THREE.Vector3());

export const getTargetForIndex = (i: number, layout: keyof RenderTargets) => {
  let to = targets[layout][i];
  return {
    position: {
      x: to.position.x,
      y: to.position.y,
      z: to.position.z,
    },
    rotation: {
      x: to.rotation.x,
      y: to.rotation.y,
      z: to.rotation.z,
    },
  };
};

export const getVariants = (i: number) => ({
  sphere: {
    x: targets.sphere[i].position.x,
    y: targets.sphere[i].position.y,
    z: targets.sphere[i].position.z,
    rotateX: targets.sphere[i].rotation.x,
    rotateY: targets.sphere[i].rotation.y,
    rotateZ: targets.sphere[i].rotation.z,
  },
  helix: {
    x: targets.helix[i].position.x,
    y: targets.helix[i].position.y,
    z: targets.helix[i].position.z,
    rotateX: targets.helix[i].rotation.x,
    rotateY: targets.helix[i].rotation.y,
    rotateZ: targets.helix[i].rotation.z,
  },
  grid: {
    x: targets.grid[i].position.x,
    y: targets.grid[i].position.y,
    z: targets.grid[i].position.z,
    rotateX: targets.grid[i].rotation.x,
    rotateY: targets.grid[i].rotation.y,
    rotateZ: targets.grid[i].rotation.z,
  },
});
