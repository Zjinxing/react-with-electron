import React, { useContext } from 'react'
import { AppContext, State } from 'Store'
import { SongDetail } from 'request/types/Playlist'
import { NewSongDetail } from 'request/types/Recommend'
import { SingerBase } from 'request/types/Album'
import './index.scss'

export interface SongInfo {
  id: number
  mid: string
  name: string
  singer: SingerBase[]
  [key: string]: any
}
interface Props {
  songDetail: SongInfo
  togglePlay: (param: SongInfo) => Promise<void>
}

const SongControl: React.FC<Props> = props => {
  const { isDarkMode, isPlaying, currentSongmid } = useContext(AppContext) as State

  const onControl = async (row: SongInfo, e: React.SyntheticEvent<EventTarget>) => {
    const { target } = e
    if (!(target instanceof HTMLImageElement)) return
    const { dataset } = target
    const { name } = dataset
    switch (name) {
      case 'togglePlay':
        console.log(row)
        await props.togglePlay(row)
        break
      case 'toggleLove':
        console.log('收藏/取消')
        break
      case 'download':
        console.log('下载')
        break
      case 'menu':
        console.log('菜单')
        break
      default:
        break
    }
  }

  const CellPlay = (data: SongInfo | NewSongDetail) => (
    <span className="cell-play">
      <img
        src={require(`resources/cell${isPlaying && data.mid === currentSongmid ? 'Pause' : 'Play'}${
          isDarkMode ? '_hl' : ''
        }@2x.png`)}
        data-name="togglePlay"
        className="cell-play--normal"
        width="20"
        alt="play"
      />
      <img
        src={require(`resources/cell${
          isPlaying && data.mid === currentSongmid ? 'Pause' : 'Play'
        }_hover@2x.png`)}
        data-name="togglePlay"
        className="cell-play--hover"
        width="20"
        alt="play"
      />
    </span>
  )

  const CellLove = (
    <span className="cell-love">
      <img
        src={require('resources/cellLoveUnselected_hl@2x.png')}
        data-name="toggleLove"
        className="cell-love--normal"
        width="20"
        alt="love"
      />
      <img
        src={require('resources/cellLoveUnselected_hover@2x.png')}
        data-name="toggleLove"
        className="cell-love--hover"
        width="20"
        alt="love"
      />
      {/* <img
        src={require('resources/cellLove_selected@2x.png')}
        className="cell-love--selected"
        width="20"
        alt="love"
      /> */}
    </span>
  )

  const CellDownload = (
    <span className="cell-download">
      <img
        src={require('resources/cellDownload_hl@2x.png')}
        data-name="download"
        className="cell-download--normal"
        width="20"
        alt=""
      />
      <img
        src={require('resources/cellDownload_hover@2x.png')}
        data-name="download"
        className="cell-download--hover"
        width="20"
        alt=""
      />
      {/* <img
        src={require('resources/cellDownloadOK_hl@2x.png')}
        className="cell-downloadok"
        width="20"
        alt=""
      />
      <img
        src={require('resources/cellDownloadOK_hover@2x.png')}
        className="cell-downloadok--hover"
        width="20"
        alt=""
      /> */}
    </span>
  )
  const Menu = (
    <span className="cell-menu">
      <img
        src={require('resources/normalMenu.png')}
        data-name="menu"
        className="cell-menu--normal"
        width="16"
        alt="menu"
      />
      <img
        src={require('resources/normalMenu_hover.png')}
        data-name="menu"
        className="cell-menu--hover"
        width="16"
        alt="menu"
      />
    </span>
  )

  return (
    <div className="song-controls" onClick={e => onControl(props.songDetail, e)}>
      {CellPlay(props.songDetail)}
      {CellLove}
      {CellDownload}
      {Menu}
    </div>
  )
}

export default SongControl
