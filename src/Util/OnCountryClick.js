const oneClick = (event, props)=>{
  const siblings = event.parent.children
  siblings.forEach(child => {
    if(child.name && child.name!==event.name && child.clicked){
      child.scale.set(1,1,1)
      child.clicked = false
    }
  })
  event.clicked? event.scale.set(1,1,1): event.scale.set(1,1,1.2)
  event.clicked = !event.clicked
  props.onNameChange(event)
}

export default oneClick