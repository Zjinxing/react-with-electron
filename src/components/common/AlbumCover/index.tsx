import React, { ReactNode, SyntheticEvent } from 'react'
import { useHistory } from 'react-router'
import { AlbumDetail } from 'request/types/Recommend'
import './index.scss'

interface Props {
  albumInfo: AlbumDetail
  children?: ReactNode
}

const AlbumCover: React.FC<Props> = props => {
  const history = useHistory()

  const handleClick = () => {
    const path = {
      pathname: '/album-detail',
      state: props.albumInfo.mid
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
      <li className="album-list-item" onClick={handleClick}>
        <div className="img-wrapper">
          <img
            src={`https://y.gtimg.cn/music/photo_new/T002R800x800M000${props.albumInfo.mid}.jpg?max_age=2592000`}
            className="list-item-cover"
            alt={props.albumInfo.name}
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
        <div className="list-item__names">
          <span className="list-item__names--album">{props.albumInfo.name}</span>
          <span className="list-item__names--singer">
            {props.albumInfo.singers.map(singer => singer.name).join(' / ')}
          </span>
        </div>
      </li>
    </>
  )
}

export default AlbumCover
