import React, { createContext, useState } from 'react'
import { remote } from 'electron'
import Recommend from 'request/types/Recommend'
const { systemPreferences } = remote

export const AppContext = createContext({})

const isDarkMode = () =>
  systemPreferences.getUserDefault('AppleInterfaceStyle', 'string') === 'Dark'

export interface State {
  isDarkMode: boolean
  recommend: Recommend
  currentSonglist: string
  currentSong: string
  currentRadio: string
  setData: (name: string, data: any) => void
  addState: () => void
  [propName: string]: any
}

export default ({ children }: any) => {
  const setData = (name: string, data: any) => {
    setState(prevState => {
      return {
        ...prevState,
        [name]: data
      }
    })
  }
  const addState = (name: string, data: any) => {
    setState(prevState => {
      return {
        ...prevState,
        [name]: data
      }
    })
  }
  const initAppState = {
    isDarkMode: isDarkMode(),
    recommend: {},
    currentSonglistId: '',
    currentSongId: '',
    currentRadioId: '',
    setData,
    addState
  }
  console.log(isDarkMode())
  const [state, setState] = useState(initAppState)
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}
