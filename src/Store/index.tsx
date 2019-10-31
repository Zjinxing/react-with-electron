import React, { createContext, useState } from 'react'
import { remote } from 'electron'
import Recommend from 'request/types/Recommend'
import { SongDetail } from 'request/types/Playlist'
const { systemPreferences } = remote

export const AppContext = createContext({})

const isDarkMode = () =>
  systemPreferences.getUserDefault('AppleInterfaceStyle', 'string') === 'Dark'

export interface State {
  isDarkMode: boolean
  recommend: Recommend
  currentSonglistId: string // 当前歌单Id
  currentSongId: number // 当前正在播放歌曲Id
  currentRadioId: string // 当前播放电台Id
  currentSongUrl: string // 当前播放歌曲地址
  playlist: SongDetail[] // 当前播放列表详情
  playMode: 'loop' | 'random' | 'order' // 播放模式
  isPlaying: boolean // 是否正在播放
  setData: (data: { [key: string]: any }) => void
  addState: () => void
  [propName: string]: any
}

export default ({ children }: any) => {
  const setData = (data: { [key: string]: any }) => {
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
    currentSongId: 0,
    currentRadioId: '',
    currentSongUrl: '',
    playMode: 'order',
    playlist: [],
    isPlaying: false,
    setData,
    addState
  }
  const [state, setState] = useState(initAppState)
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}
