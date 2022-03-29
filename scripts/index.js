import { renderer, scene, camera, init } from './init.js'
import { onPointerMove, pointer } from './pointerMove.js'
import hoverFun from './hoverFunction.js'


init();
animate();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  hoverFun(pointer, scene, camera)
}

window.addEventListener('pointermove', onPointerMove);