import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import initSVGObject from "../util/paths";

import addGeoObject from './addCountries';
import animate from './Animation';

export default function Scene() {
  const container = useRef(null);
  let renderer, stats, scene, camera;
  
  const pointer = new THREE.Vector2();



  useEffect(() => {
    init();
    animate( pointer, camera, scene, renderer );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb0b0b0);

    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 40);

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
    group.add(helper);

    //

    const obj = initSVGObject();
    addGeoObject(group, obj);

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log("container :>> ", container);
    container.current.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize);
  }

  function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  window.addEventListener("pointermove", onPointerMove);

  return <div ref={container}></div>;
}
