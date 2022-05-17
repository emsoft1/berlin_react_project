
const colorChange = (object, isMember)=>{
  const parentArr = object.parent.children
  const color = isMember? 0x353595 : 0xff5595
  parentArr.forEach(child => {
    child.material.color.setHex(color)
  });
}

const revertColor = (object, color)=>{
  const parentArr = object.parent.children
  parentArr.forEach(child => {
    child.material.color.setHex(color)
  });
}

export {colorChange, revertColor}