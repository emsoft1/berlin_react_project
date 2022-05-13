
const colorChange = (object)=>{
  const parentArr = object.parent.children
  parentArr.forEach(child => {
    child.material.color.setHex(0xff5595)
  });
}

const revertColor = (object, color)=>{
  const parentArr = object.parent.children
  parentArr.forEach(child => {
    child.material.color.setHex(color)
  });
}

export {colorChange, revertColor}