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
  currentSonglistId: string
  currentSongMId: string
  currentRadioId: string
  currentSongUrl: string
  playlistMids: string[]
  playMode: 'loop' | 'random' | 'order'
  setData: (data: { [key: string]: any }) => void
  addState: () => void
  [propName: string]: any
}

export default ({ children }: any) => {
  const setData = (data: { [key: string]: any }) => {
    console.log(data)
    setState(prevState => {
      return {
        ...prevState,
        ...data
      }
    })
  }
  const addState = (name: string, data: any) => {
    setState(prevState => {
      return {
        ...prevState,
        ...data
      }
    })
  }
  const initAppState = {
    isDarkMode: isDarkMode(),
    recommend: {},
    currentSonglistId: '',
    currentSongId: '',
    currentSongMId: '',
    currentRadioId: '',
    currentSongUrl: '',
    playMode: 'order',
    playlistMids: [],
    isPlaying: false,
    setData,
    addState
  }
  console.log(isDarkMode())
  const [state, setState] = useState(initAppState)
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}
