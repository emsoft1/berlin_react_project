import axios from "axios"

const fetchFunction = async (fetchLink)=> {
  let res
  await axios.get(fetchLink)
  .then(json=>{
    json.data.length === 1? res = json.data[0]: res = json.data
  })
  .catch(()=>{
    console.log('Ups something went wrong.')
  })
  return res
}

export default fetchFunction