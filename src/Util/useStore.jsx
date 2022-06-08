import create from 'zustand'

const useStore = create((set) => ({
  title: 'Hello World!',
  option: 'General',
  curryChecked: true,
  driveChecked: true,
  mphChecked: false,
  fahrChecked: false,
  setTitle: (newTitle) => set({title: newTitle}),
  setOption: (newTitle) => set({option: newTitle}),
  setCurrency: (bool) => set({curryChecked: bool}),
  setDriveInfo: (bool) => set({driveChecked: bool}),
  setMphChecked: (bool) => set({mphChecked: bool}),
  setFahrChecked: (bool) => set({fahrChecked: bool}),
}))

export {useStore}