import React, { useState, useContext } from 'react'
import { Lan, NewSongDetail } from 'request/types/Recommend'
import { SongDetail } from 'request/types/Playlist'
import SongControl, { SongInfo } from 'components/common/SongControl'
import SongWave from 'components/common/SongWave'
import './index.scss'
import { AppContext, State } from 'Store'
import { GET_MUSIC_VKEY, GET_NEWSONG_BY_TYPE } from 'request/GetSongList'

interface Props {
  getNewSong: (type: number) => Promise<void>
  newsong: {
    lan: string
    lanlist: Lan[]
    songlist: NewSongDetail[]
    type: number
    ret_msg: string
  }
}

const NewSong: React.FC<Props> = props => {
  const { currentSongmid, isPlaying, setData, isDarkMode } = useContext(AppContext) as State
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

  const togglePlay = async (data: SongInfo) => {
    if (data.mid === currentSongmid) {
      setData({ isPlaying: !isPlaying })
    } else {
      const result = await GET_MUSIC_VKEY({ songmid: data.mid })
      const playlist = props.newsong.songlist
      const { name, singer } = data
      const singerName = singer && singer.map(item => item.name).join('/')
      setData({
        currentSongmid: data.mid,
        playlist: playlist,
        currentSongUrl: result.response.playLists[0],
        currentSongName: `${name} - ${singerName}`
      })
    }
  }

  const playAll = async () => {
    const songlist = props.newsong.songlist
    const willPlaySong = await GET_MUSIC_VKEY({ songmid: songlist[0].mid })
    const { name, singer } = songlist[0]
    const singerName = singer && singer.map(item => item.name).join('/')
    setData({
      currentSongmid: songlist[0].mid,
      playlist: songlist,
      currentSongUrl: willPlaySong.response.playLists[0],
      currentSongName: `${name} - ${singerName}`
    })
  }

  const getNewSong = async (type: number) => {
    await props.getNewSong(type)
  }

  const sqTag = (
    <img src={require('resources/cell_sq.png')} className="tag sq" width="26" alt="sq" />
  )
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
          {currentSongmid === data.mid && isPlaying && <SongWave />}
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
            <li
              className={`newsong-tag ${props.newsong.lan === item.lan ? 'current-tag' : ''}`}
              key={item.tjreport}
              onClick={() => getNewSong(item.type)}
            >
              {item.lan}
            </li>
          ))}
        </ul>
      </div>
      <div className="newsong-body">
        <div className="newsong-body-control">
          <span className="newsong-body-control-playAll" onClick={playAll}>
            <span className="playall-icon">
              <img
                src={require(`resources/cellPlay${isDarkMode ? '_hl' : ''}@2x.png`)}
                width="24"
                alt="播放全部"
              />
            </span>
            播放全部
          </span>
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
