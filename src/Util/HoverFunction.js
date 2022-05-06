
let oldColor

const colorChange = (object, props)=>{
  oldColor = object.material.color.getHex()
  const parentArr = object.parent.children
  parentArr.forEach(child => {
    child.material.color.setHex(0xff5595)
  });
  props.onNameChange(object.parent)
}

const revertColor = (object)=>{
  const parentArr = object.parent.children
  parentArr.forEach(child => {
    child.material.color.setHex(oldColor)
  });
}

export {colorChange, revertColor}