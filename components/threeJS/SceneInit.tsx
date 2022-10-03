import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
  fov: number;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  stats: Stats;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;

  constructor(
    fov = 36,
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    stats: Stats,
    controls: OrbitControls,
    renderer: THREE.WebGLRenderer
  ) {
    this.fov = fov;
    this.camera = camera;
    this.scene = scene;
    this.stats = stats;
    this.controls = controls;
    this.renderer = renderer;
  }

  initScene = () => {
    //create camera object
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    //how deep is your (camera)
    this.camera.position.z = 128;

    // Scene is the canvas for threejs
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      //@ts-ignore
      canvas: document.getElementById('myThreeJsCanvas'),
      antialias: true,
    });

    //Set renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //Add renderer to dom
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    //dark magic
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    window.addEventListener('resize', () => this.onWindowResize(), false);
  };

  //animate the things
  animate = () => {
    //TOLEARN: animation frame provider ?
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    //update the dark magic
    this.stats.update();
  };

  // do the thing
  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  // window resize callback
  onWindowResize = () => {
    //update aspect ratio for cam
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    //resize canvas
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
