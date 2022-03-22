import * as THREE from '../node_modules/three/build/three.module.js'
import initSVGObject from './paths.js'

function d3threeD(exports) {

  const DEGS_TO_RADS = Math.PI / 180;
  const DIGIT_0 = 48, DIGIT_9 = 57, COMMA = 44, SPACE = 32, PERIOD = 46, MINUS = 45;

  exports.transformSVGPath = function transformSVGPath(pathStr) {

    const path = new THREE.ShapePath();

    let idx = 1, activeCmd,
      x = 0, y = 0, nx = 0, ny = 0, firstX = null, firstY = null,
      x1 = 0, x2 = 0, y1 = 0, y2 = 0,
      rx = 0, ry = 0, xar = 0, laf = 0, sf = 0, cx, cy;

    const len = pathStr.length;

    function eatNum() {

      let sidx, c, isFloat = false, s;

      // eat delims

      while (idx < len) {

        c = pathStr.charCodeAt(idx);

        if (c !== COMMA && c !== SPACE) break;

        idx++;

      }

      if (c === MINUS) {

        sidx = idx++;

      } else {

        sidx = idx;

      }

      // eat number

      while (idx < len) {

        c = pathStr.charCodeAt(idx);

        if (DIGIT_0 <= c && c <= DIGIT_9) {

          idx++;
          continue;

        } else if (c === PERIOD) {

          idx++;
          isFloat = true;
          continue;

        }

        s = pathStr.substring(sidx, idx);
        return isFloat ? parseFloat(s) : parseInt(s);

      }

      s = pathStr.substring(sidx);
      return isFloat ? parseFloat(s) : parseInt(s);

    }

    function nextIsNum() {

      let c;

      // do permanently eat any delims...

      while (idx < len) {

        c = pathStr.charCodeAt(idx);

        if (c !== COMMA && c !== SPACE) break;

        idx++;

      }

      c = pathStr.charCodeAt(idx);
      return (c === MINUS || (DIGIT_0 <= c && c <= DIGIT_9));

    }

    let canRepeat;
    activeCmd = pathStr[0];

    while (idx <= len) {

      canRepeat = true;

      switch (activeCmd) {

        // moveto commands, become lineto's if repeated
        case 'M':
          x = eatNum();
          y = eatNum();
          path.moveTo(x, y);
          activeCmd = 'L';
          firstX = x;
          firstY = y;
          break;

        case 'm':
          x += eatNum();
          y += eatNum();
          path.moveTo(x, y);
          activeCmd = 'l';
          firstX = x;
          firstY = y;
          break;

        case 'Z':
        case 'z':
          canRepeat = false;
          if (x !== firstX || y !== firstY) path.lineTo(firstX, firstY);
          break;

        // - lines!
        case 'L':
        case 'H':
        case 'V':
          nx = (activeCmd === 'V') ? x : eatNum();
          ny = (activeCmd === 'H') ? y : eatNum();
          path.lineTo(nx, ny);
          x = nx;
          y = ny;
          break;

        case 'l':
        case 'h':
        case 'v':
          nx = (activeCmd === 'v') ? x : (x + eatNum());
          ny = (activeCmd === 'h') ? y : (y + eatNum());
          path.lineTo(nx, ny);
          x = nx;
          y = ny;
          break;

        // - cubic bezier
        case 'C':
          x1 = eatNum(); y1 = eatNum();

        case 'S':
          if (activeCmd === 'S') {

            x1 = 2 * x - x2;
            y1 = 2 * y - y2;

          }

          x2 = eatNum();
          y2 = eatNum();
          nx = eatNum();
          ny = eatNum();
          path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
          x = nx; y = ny;
          break;

        case 'c':
          x1 = x + eatNum();
          y1 = y + eatNum();

        case 's':
          if (activeCmd === 's') {

            x1 = 2 * x - x2;
            y1 = 2 * y - y2;

          }

          x2 = x + eatNum();
          y2 = y + eatNum();
          nx = x + eatNum();
          ny = y + eatNum();
          path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
          x = nx; y = ny;
          break;

        // - quadratic bezier
        case 'Q':
          x1 = eatNum(); y1 = eatNum();

        case 'T':
          if (activeCmd === 'T') {

            x1 = 2 * x - x1;
            y1 = 2 * y - y1;

          }

          nx = eatNum();
          ny = eatNum();
          path.quadraticCurveTo(x1, y1, nx, ny);
          x = nx;
          y = ny;
          break;

        case 'q':
          x1 = x + eatNum();
          y1 = y + eatNum();

        case 't':
          if (activeCmd === 't') {

            x1 = 2 * x - x1;
            y1 = 2 * y - y1;

          }

          nx = x + eatNum();
          ny = y + eatNum();
          path.quadraticCurveTo(x1, y1, nx, ny);
          x = nx; y = ny;
          break;

        // - elliptical arc
        case 'A':
          rx = eatNum();
          ry = eatNum();
          xar = eatNum() * DEGS_TO_RADS;
          laf = eatNum();
          sf = eatNum();
          nx = eatNum();
          ny = eatNum();
          if (rx !== ry) console.warn('Forcing elliptical arc to be a circular one:', rx, ry);

          // SVG implementation notes does all the math for us! woo!
          // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes

          // step1, using x1 as x1'

          x1 = Math.cos(xar) * (x - nx) / 2 + Math.sin(xar) * (y - ny) / 2;
          y1 = - Math.sin(xar) * (x - nx) / 2 + Math.cos(xar) * (y - ny) / 2;

          // step 2, using x2 as cx'

          let norm = Math.sqrt((rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1) /
            (rx * rx * y1 * y1 + ry * ry * x1 * x1));

          if (laf === sf) norm = - norm;

          x2 = norm * rx * y1 / ry;
          y2 = norm * - ry * x1 / rx;

          // step 3

          cx = Math.cos(xar) * x2 - Math.sin(xar) * y2 + (x + nx) / 2;
          cy = Math.sin(xar) * x2 + Math.cos(xar) * y2 + (y + ny) / 2;

          const u = new THREE.Vector2(1, 0);
          const v = new THREE.Vector2((x1 - x2) / rx, (y1 - y2) / ry);

          let startAng = Math.acos(u.dot(v) / u.length() / v.length());

          if (((u.x * v.y) - (u.y * v.x)) < 0) startAng = - startAng;

          // we can reuse 'v' from start angle as our 'u' for delta angle
          u.x = (- x1 - x2) / rx;
          u.y = (- y1 - y2) / ry;

          let deltaAng = Math.acos(v.dot(u) / v.length() / u.length());

          // This normalization ends up making our curves fail to triangulate...

          if (((v.x * u.y) - (v.y * u.x)) < 0) deltaAng = - deltaAng;
          if (!sf && deltaAng > 0) deltaAng -= Math.PI * 2;
          if (sf && deltaAng < 0) deltaAng += Math.PI * 2;

          path.absarc(cx, cy, rx, startAng, startAng + deltaAng, sf);
          x = nx;
          y = ny;
          break;

        default:
          throw new Error('Wrong path command: ' + activeCmd);

      }

      // just reissue the command

      if (canRepeat && nextIsNum()) continue;

      activeCmd = pathStr[idx++];

    }

    return path;

  };

}

const $d3g = {};
d3threeD($d3g);

const addGeoObject = function (group, svgObject) {

  const paths = svgObject.paths;
  const depths = svgObject.depths;
  const colors = svgObject.colors;
  const center = svgObject.center;
  const names = svgObject.names;

  for (let i = 0; i < paths.length; i++) {

    const path = $d3g.transformSVGPath(paths[i]);
    const color = new THREE.Color(colors[i]);
    const material = new THREE.MeshLambertMaterial({
      color: color,
      emissive: color
    });
    const depth = depths[i];
    const simpleShapes = path.toShapes(true);
    const name = names[i];

    for (let j = 0; j < simpleShapes.length; j++) {

      const simpleShape = simpleShapes[j];
      const shape3d = new THREE.ExtrudeGeometry(simpleShape, {
        depth: depth,
        bevelEnabled: false
      });

      const mesh = new THREE.Mesh(shape3d, material);
      mesh.rotation.x = Math.PI;
      mesh.translateZ(- depth - 1);
      mesh.translateX(- center.x);
      mesh.translateY(- center.y);
      mesh.name = name;

      group.add(mesh);
      group.rotation.y = 0.168
    }

  }

};

let renderer, stats, scene, camera;
let raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

init();
animate();

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

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerMove( event ) {

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function animate() {
  requestAnimationFrame(animate);

  // find intersections

  raycaster.setFromCamera( pointer, camera );

  // calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );
  let country;

  if (intersects.length > 0) {

    country = intersects[0].object.name;
    intersects[0].object.material.color.set(0xff0000);

  } else {

    let reverseColor = scene.getObjectByName( country );
    reverseColor.material.color.set(0xbbbbbb);

  }


  renderer.render(scene, camera);
}

window.addEventListener( 'pointermove', onPointerMove );