import { Raycaster } from '../node_modules/three/build/three.module.js'

const hoverColor = '000000'
const raycaster = new Raycaster()

let name,
  oldColor,
  oldHoveredObj,
  hoveredObj;


export default function hoverFun(pointer, scene, camera) {
  const intersects = raycaster.intersectObjects(scene.children);
  raycaster.setFromCamera(pointer, camera);


  if (intersects.length === 0 && oldHoveredObj) {
    oldHoveredObj.material.color.setHex(oldColor)
  }
  if (intersects.length > 0) {
    hoveredObj = intersects[0].object
    if (hoveredObj.name == name) {
      if (name !== 'helper') {
        oldHoveredObj = hoveredObj
      }
      return
    }
    if (hoveredObj.name !== name) {
      name = hoveredObj.name
      if (oldHoveredObj) {
        oldHoveredObj.material.color.setHex(oldColor)
      }
      if (name !== 'helper') {
        oldColor = hoveredObj.material.color.getHex()
        hoveredObj.material.color.setHex(hoverColor)
      }
      return
    }
  }
}