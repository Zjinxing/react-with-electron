import React, { ReactNode, SyntheticEvent } from 'react'
import { useHistory } from 'react-router'
import { PlaylistItem } from 'request/types/Playlist'
import './index.scss'

interface Props {
  playlistInfo: PlaylistItem
  children?: ReactNode
}

const PlaylistCover: React.FC<Props> = props => {
  const history = useHistory()

  const handleClick = () => {
    const path = {
      pathname: '/songlist-detail',
      state: props.playlistInfo.tid
    }
    history.push(path)
  }

  const togglePlay = (e: SyntheticEvent) => {
    console.log('播放歌单')
    // 阻止冒泡
    e.stopPropagation()
  }

  return (
    <>
      <li className="list-item" onClick={handleClick}>
        <div className="img-wrapper">
          <img
            src={props.playlistInfo.cover_url_medium}
            className="list-item-cover"
            alt={props.playlistInfo.title}
          />
          <span onClickCapture={togglePlay} className="list-item-control">
            <img src={require('resources/play.png')} className="list-item-control-play" alt="" />
            <img
              src={require('resources/play_hover.png')}
              className="list-item-control-play--hover"
              alt=""
            />
            {/* <img
            src={require('resources/pause.png')}
            className="list-item-control list-item-pause"
            alt=""
          />
          <img
            src={require('resources/pause_hover.png')}
            className="list-item-control list-item-pause--hover"
            alt=""
          /> */}
          </span>
        </div>
        <div className="cover-img">{props.playlistInfo.title}</div>
      </li>
    </>
  )
}

export default PlaylistCover
