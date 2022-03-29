import * as THREE from '../node_modules/three/build/three.module.js'
import d3threeD from './d3Threed.js'
import initSVGObject from './paths.js'

const $d3g = {};
d3threeD($d3g);
let scene, camera, renderer

function init() {

  const container = document.getElementById('container');
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xb0b0b0);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 40);

  //

  const group = new THREE.Group();
  scene.add(group);

  //

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(0.75, 0.75, 1.0).normalize();
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
  scene.add(ambientLight);

  //

  const helper = new THREE.GridHelper(160, 20);
  helper.rotation.x = Math.PI / 2;
  helper.name = 'helper'
  group.add(helper);

  //

  const obj = initSVGObject();
  addGeoObject(group, obj);

  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize);
}

const addGeoObject = function (group, svgObject) {

  const countries = svgObject.countries
  const center = svgObject.mapCenter
  const length = countries.length

  for (let i = 0; i < length; i++) {
    const name = countries[i].name
    const paths = countries[i].paths
    const path = $d3g.transformSVGPath(paths.join(""))
    const color = new THREE.Color(countries[i].color)
    const material = new THREE.MeshLambertMaterial({
      color: color,
      emissive: color
    });
    const depth = countries[i].depths;
    const simpleShapes = path.toShapes(true);

    for (let j = 0; j < simpleShapes.length; j++) {

      const simpleShape = simpleShapes[j];
      const shape3d = new THREE.ExtrudeGeometry(simpleShape, {
        depth: depth,
        bevelEnabled: false
      });

      const mesh = new THREE.Mesh(shape3d, material);
      mesh.name = name
      mesh.rotation.x = Math.PI;
      mesh.translateZ(- depth - 1);
      mesh.translateX(- center.x);
      mesh.translateY(- center.y);

      group.add(mesh);
      group.rotation.y = 0.168
    }
  }
};

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

export {
  renderer, scene, camera, init
}