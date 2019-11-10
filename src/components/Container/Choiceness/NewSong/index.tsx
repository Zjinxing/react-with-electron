import React, { useState, useContext } from 'react'
import { Lan, NewSongDetail } from 'request/types/Recommend'
import { SongDetail } from 'request/types/Playlist'
import SongControl from 'components/common/SongControl'
import './index.scss'
import { AppContext, State } from 'Store'
import { GET_MUSIC_VKEY } from 'request/GetSongList'

interface Props {
  newsong: {
    lan: string
    lanlist: Lan[]
    songlist: NewSongDetail[]
  }
}

const NewSong: React.FC<Props> = props => {
  const { currentSongId, isPlaying, setData } = useContext(AppContext) as State
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

  const togglePlay = async (data: SongDetail) => {
    if (data.id === currentSongId) {
      setData({ isPlaying: !isPlaying })
    } else {
      const result = await GET_MUSIC_VKEY({ songmid: data.mid })
      const playlist = props.newsong.songlist
      const { name, singer } = data
      const singerName = singer && singer.map(item => item.name).join('/')
      setData({
        currentSongId: data.id,
        playlist: playlist,
        currentSongUrl: result.response.playLists[0],
        currentSongName: `${name} - ${singerName}`
      })
    }
  }

  const sqTag = <img src={require('resources/cell_sq.png')} className="tag" width="26" alt="sq" />
  const mvTag = (
    <img src={require('resources/cell_mv.png')} className="tag mv" width="26" alt="mv" />
  )
  const onlyTag = (
    <img src={require('resources/cell_only.png')} className="tag" width="26" alt="独家" />
  )

  const SongContent = (data: SongDetail) => (
    <>
      <img
        src={`https://y.gtimg.cn/music/photo_new/T002R90x90M000${data.album.mid}.jpg?max_age=2592000`}
        width="50"
        alt=""
      />
      <div className="song-info">
        <div className="song-info__name">
          <span>{data.name}</span>
          {data.file.size_ape || data.file.size_flac ? sqTag : null}
          {data.isonly ? onlyTag : null}
          {data.mv.vid ? mvTag : null}
        </div>
        <div className="song-info__singer">
          <span className="song-info__singer-name">
            {data.singer.map(singer => singer.name).join('/')}
          </span>
          <SongControl songDetail={data} togglePlay={togglePlay}></SongControl>
        </div>
      </div>
    </>
  )

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
                  {SongContent(item)}
                </li>
              ))}
            </ul>
            <ul className="newsong-body-content-wrapper-page">
              {props.newsong.songlist.slice(9, 18).map(item => (
                <li className="newsong-body-content-wrapper-page-song" key={item.id}>
                  {SongContent(item)}
                </li>
              ))}
            </ul>
            <ul className="newsong-body-content-wrapper-page">
              {props.newsong.songlist.slice(18, 27).map(item => (
                <li className="newsong-body-content-wrapper-page-song" key={item.id}>
                  {SongContent(item)}
                </li>
              ))}
            </ul>
            <ul className="newsong-body-content-wrapper-page">
              {props.newsong.songlist.slice(27, 36).map(item => (
                <li className="newsong-body-content-wrapper-page-song" key={item.id}>
                  {SongContent(item)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewSong
