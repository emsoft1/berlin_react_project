import { useState } from "react"
import { createContext } from "react"

export const TitleContext = createContext()
export const OptionsContext = createContext()

export default function OptionContextProvider (props)  {
  const [options, newOptions] = useState({
    title: 'Hello world',
    option:'General',
    mphChecked: false,
    fahrChecked: false,
    curryInfo: true,
    driveInfo: true,
    newTitle: ()=>{},
    newOption: ()=>{},
    setcInfo: ()=>{},
    setdInfo: ()=>{},
    setMph: ()=>{},
    setdFahr: ()=>{}
  })

  const titleHandler = (e) => {
    let newTitle = {title:(e)}
    newOptions(oldOptions=>({
      ...oldOptions,
      ...newTitle
    }))
  }
  const optionHandler = (e) => {
    localStorage.setItem('option', e)
    let newOption = {option: e}
    newOptions(oldOptions=>({
      ...oldOptions,
      ...newOption
    }))
  }

  return (
    <OptionsContext.Provider
      value={{
        title: options.title,
        option: options.option,
        mphChecked: options.mphChecked,
        fahrChecked: options.fahrChecked,
        curryInfo: options.curryInfo,
        driveInfo: options.driveInfo,
        newTitle:titleHandler,
        newOption:optionHandler
      }}
    >
      {props.children}
    </OptionsContext.Provider>
  )
}