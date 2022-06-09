import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      option: 'General',
      curryChecked: true,
      driveChecked: true,
      mphChecked: false,
      fahrChecked: false,
      setOption: (newTitle) => set({option: newTitle}),
      setCurrency: (bool) => set({curryChecked: bool}),
      setDriveInfo: (bool) => set({driveChecked: bool}),
      setMphChecked: (bool) => set({mphChecked: bool}),
      setFahrChecked: (bool) => set({fahrChecked: bool}),
})))

const useTitle = create(
  (set)=>({
      title: '',
      setTitle: (newTitle) => set({title: newTitle})
}))

export {useStore, useTitle}