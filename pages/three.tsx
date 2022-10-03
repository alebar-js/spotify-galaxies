import { useEffect } from 'react';
import SceneInit from '../components/threeJS/SceneInit';
import * as THREE from 'three';
import mercuryTexture from '../public/mercury.jpg';

//@ts-ignore
const onPointerMove = (event, pointer: THREE.Vector2) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

const Three = () => {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  useEffect(() => {
    let test = new SceneInit();
    test.initScene();
    test.animate();

    const mercuryGeometry = new THREE.SphereGeometry(8);
    const mercuryTexture = new THREE.TextureLoader().load('mercury.jpg');
    const mercuryMaterial = new THREE.MeshBasicMaterial({
      map: mercuryTexture,
    });
    const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    const solarSystem = new THREE.Group();

    solarSystem.add(mercuryMesh);
    test.scene.add(solarSystem);
    window.addEventListener('pointermove', (e) => onPointerMove(e, pointer));
  });

  return (
    <div>
      <h1>Canvas</h1>
      <canvas id='myThreeJsCanvas' />
    </div>
  );
};

export default Three;
