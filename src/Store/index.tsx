import React, { createContext, useState } from 'react'
import { remote } from 'electron'
import Recommend, { AlbumDetail } from 'request/types/Recommend'
import { SongDetail } from 'request/types/Playlist'
import { HotSinger } from 'request/types/Singer'
const { systemPreferences } = remote

export const AppContext = createContext({})

const isDarkMode = () =>
  systemPreferences.getUserDefault('AppleInterfaceStyle', 'string') === 'Dark'

export interface State {
  isDarkMode: boolean
  recommend: Recommend
  currentSonglistId: string // 当前歌单Id
  currentSongmid: string // 当前正在播放歌曲mid
  currentRadioId: string // 当前播放电台Id
  currentSongUrl: string // 当前播放歌曲地址
  currentSongName: string // 当前播放歌曲的名称
  playlist: SongDetail[] // 当前播放列表详情
  albumList: AlbumDetail[] // 首页新专辑
  albumArea: 1 | 2 | 3 | 4 | 5 | 6 // 当前专辑地区
  playMode: 'loop' | 'random' | 'singleLoop' // 播放模式
  isPlaying: boolean // 是否正在播放
  hotSinger: HotSinger[]
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
    currentSongmid: '',
    currentRadioId: '',
    currentSongUrl: '',
    currentSongName: '',
    playMode: 'loop',
    playlist: [],
    albumList: [],
    albumArea: 1,
    hotSinger: [],
    isPlaying: false,
    setData,
    addState
  }
  const [state, setState] = useState(initAppState)
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}
