import React, { useState } from 'react'
import './index.scss'
import { Lan, NewSongDetail } from 'request/types/Recommend'

interface Props {
  newsong: {
    lan: string
    lanlist: Lan[]
    songlist: NewSongDetail[]
  }
}

const NewSong: React.FC<Props> = props => {
  const [posClassName, SetPosClassName] = useState('page0')

  const slideRight = () => {
    const index = parseInt(posClassName.slice(-1))
    console.log('向右滑动', index)
    if (index !== 3) {
      SetPosClassName(`page${index + 1}`)
    }
  }

  const slideLeft = () => {
    const index = parseInt(posClassName.slice(-1))
    console.log('向zo滑动', index)
    if (index !== 0) {
      SetPosClassName(`page${index - 1}`)
    }
  }

  return (
    <div className="newsong">
      <div className="newsong-header">
        <h4 className="title">新歌速递</h4>
        <ul className="newsong-tags">
          {props.newsong.lanlist.map(item => (
            <li className="newsong-tag" key={item.tjreport}>
              {item.lan}
            </li>
          ))}
        </ul>
      </div>
      <div className="newsong-body">
        <div className="newsong-body-control">
          <span>播放全部</span>
          <span className="newsong-body-control__slide">
            <span className="newsong-body-control__slide-left" onClick={slideLeft}></span>
            <span className="newsong-body-control__slide-right" onClick={slideRight}></span>
          </span>
        </div>
        <div className="newsong-body-content">
          <div className={`newsong-body-content-wrapper ${posClassName}`}>
            <ul className="newsong-body-content-wrapper-page">
              {props.newsong.songlist.slice(0, 9).map(item => (
                <li className="newsong-body-content-wrapper-page-song" key={item.id}>
                  <img
                    src={`https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.mid}.jpg?max_age=2592000`}
                    width="50"
                    alt=""
                  />
                  <div className="song-info"></div>
                </li>
              ))}
            </ul>
            <ul className="newsong-body-content-wrapper-page">
              {props.newsong.songlist.slice(9, 18).map(item => (
                <li className="newsong-body-content-wrapper-page-song" key={item.id}></li>
              ))}
            </ul>
            <ul className="newsong-body-content-wrapper-page">
              {props.newsong.songlist.slice(18, 27).map(item => (
                <li className="newsong-body-content-wrapper-page-song" key={item.id}></li>
              ))}
            </ul>
            <ul className="newsong-body-content-wrapper-page">
              {props.newsong.songlist.slice(27, 36).map(item => (
                <li className="newsong-body-content-wrapper-page-song" key={item.id}></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewSong
