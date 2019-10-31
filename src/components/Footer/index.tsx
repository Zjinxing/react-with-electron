import React, { useContext, useEffect, useState, SyntheticEvent } from 'react'
import { AppContext, State } from 'Store/index'
import { GET_MUSIC_VKEY } from 'request/GetSongList'
import Progress from 'components/common/Progress'
import { formatSeconds } from 'utils'
import './index.scss'

const Footer: React.FC = () => {
  const { isDarkMode, currentSongUrl, currentSongId, playlist, playMode, setData } = useContext(
    AppContext
  ) as State

  const [albumCover, setAlbumCover] = useState('') // 当前歌曲封面图url
  const [currentTime, setCurrentTime] = useState(0) // 当前歌曲播放时间
  const [duration, setDuration] = useState(0) // 当前歌曲总时长
  const [percent, setPercent] = useState(0) // 播放进度
  const [songName, setSongName] = useState('')

  const audioRef = React.createRef<HTMLAudioElement>()

  // 检测到当前歌曲的id发生变化开始播放
  useEffect(() => {
    audioRef.current && audioRef.current.play()
    const currentSong = playlist.find(item => item.id === currentSongId)
    const { album, name, singer } = currentSong || {}
    album &&
      setAlbumCover(
        `https://y.gtimg.cn/music/photo_new/T002R800x800M000${album.mid}.jpg?max_age=2592000`
      )
    const singerName = singer && singer.map(item => item.name).join('/')
    name && setSongName(`${name} - ${singerName}`)
  }, [currentSongId])

  const playNext = async () => {
    const currentIndex = playlist.findIndex(item => item.id === currentSongId)
    console.log({ currentSongId })
    if (playMode === 'order' || playMode === 'loop') {
      if (currentIndex === playlist.length) {
        const currentSong = await GET_MUSIC_VKEY({ songmid: playlist[0].mid })
        setData({
          currentSongUrl: currentSong.response.playLists[0],
          currentSongMId: playlist[0]
        })
      } else {
        const currentSong = await GET_MUSIC_VKEY({ songmid: playlist[currentIndex + 1].mid })
        console.log(' //////////////// ', currentSong)
        setData({
          currentSongUrl: currentSong.response.playLists[0],
          currentSongMId: playlist[currentIndex + 1]
        })
      }
    }
  }

  const playPreview = async () => {
    const currentIndex = playlist.findIndex(item => item.id === currentSongId)
    if (playMode === 'order' || playMode === 'loop') {
      if (currentIndex === 0) {
        const currentSong = await GET_MUSIC_VKEY({ songmid: playlist[playlist.length - 1].mid })
        setData({
          currentSongUrl: currentSong.response.playLists[0],
          currentSongMId: playlist[playlist.length - 1]
        })
      } else {
        const currentSong = await GET_MUSIC_VKEY({ songmid: playlist[currentIndex - 1].mid })
        setData({
          currentSongUrl: currentSong.response.playLists[0],
          currentSongMId: playlist[currentIndex - 1]
        })
      }
    }
  }

  const togglePlay = () => {
    console.log('播放/暂停')
    audioRef.current!.paused ? audioRef.current!.play() : audioRef.current!.pause()
  }

  const handleCanPlay = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const target = e.target as HTMLAudioElement
    console.log('准备好播放', target.duration)
    const duration = target.duration
    setDuration(duration)
  }

  const onProgress = (e: SyntheticEvent<HTMLAudioElement>) => {
    const target = e.target as HTMLAudioElement
    setInterval(() => {
      const current = target.currentTime
      const percent = duration && (current / duration) * 100
      percent && setPercent(percent)
      console.log(percent)
      setCurrentTime(current)
    }, 250)
  }

  return (
    <div className={`footer ${isDarkMode ? 'dark' : ''}`}>
      <div className="footer-control">
        <img
          src={require('resources/playPreview.png')}
          onClick={playPreview}
          width="25"
          height="25"
          alt="preview"
        />
        <span className="toggle-play" onClick={togglePlay}>
          <img src={require('resources/play00000.png')} width="32" alt="play" />
          <img src={require('resources/pause00000.png')} width="32" alt="next" />
        </span>
        <img
          src={require('resources/playNext.png')}
          onClick={playNext}
          width="25"
          height="25"
          alt="next"
        />
        <span className="volume">
          <img src={require(`resources/volume${isDarkMode ? '_hl' : ''}.png`)} width="16" alt="" />
        </span>
        <span className="play-mode">
          <img src={require('resources/playModeLoop_hl.png')} width="20px" alt="loop" />
        </span>
      </div>
      <div className="footer-progress">
        <img src={albumCover} alt="" width="40" height="40" className="footer-progress-cover" />
        <div className="footer-progress-content">
          <span className="song-name">{songName}</span>
          <span className="song-time">
            {formatSeconds(currentTime)} / {formatSeconds(duration)}
          </span>
          <Progress width={percent}></Progress>
        </div>
      </div>
      <div className="footer-operator"></div>
      <audio
        ref={audioRef}
        src={currentSongUrl}
        onCanPlay={handleCanPlay}
        onTimeUpdate={onProgress}
      ></audio>
    </div>
  )
}

export default Footer
