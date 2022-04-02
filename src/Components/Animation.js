import React from "react";
import * as THREE from "three";
let raycaster = new THREE.Raycaster();

function animate( pointer, camera, scene, renderer ) {
    requestAnimationFrame(animate);

    // find intersections

    raycaster.setFromCamera(pointer, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);
    let country;

    if (intersects.length > 0) {
        country = intersects[0].object.name;
        intersects[0].object.material.color.set(0xff0000);
    } else {
        let reverseColor = scene.getObjectByName(country);
        reverseColor.material.color.set(0xbbbbbb);
    }

    renderer.render(scene, camera);
}

export default animate;