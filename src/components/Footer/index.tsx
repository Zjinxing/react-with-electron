import React, { useContext, useEffect, useState, SyntheticEvent, useRef } from 'react'
import { AppContext, State } from 'Store/index'
import { GET_MUSIC_VKEY } from 'request/GetSongList'
import Progress, { TargetInfo, MousePos } from 'components/common/Progress'
import VolumeControl from 'components/common/VolumeControl'
import { formatSeconds } from 'utils'
import './index.scss'

const Footer: React.FC = () => {
  const {
    isDarkMode,
    currentSongUrl,
    currentSongId,
    currentSongName,
    playlist,
    playMode,
    setData,
    isPlaying
  } = useContext(AppContext) as State

  const [albumCover, setAlbumCover] = useState('') // 当前歌曲封面图url
  const [currentTime, setCurrentTime] = useState(0) // 当前歌曲播放时间
  const [duration, setDuration] = useState(0) // 当前歌曲总时长
  const [percent, setPercent] = useState(0) // 播放进度
  const [lyricShowing, setLyricShowing] = useState(false) // 是否显示桌面歌词
  const [isDragging, setIsDragging] = useState(false) // 是否正在拖动进度条

  enum modeMap {
    loop = 'playModeLoop',
    singleLoop = 'playModeSingleLoop',
    random = 'playModeRandom'
  }

  const audioRef = useRef<HTMLAudioElement>(null)

  // 检测到当前播放状态变化
  useEffect(() => {
    const currentSong = playlist.find(item => item.id === currentSongId)
    const { album, name, singer } = currentSong || {}
    album &&
      setAlbumCover(
        `https://y.gtimg.cn/music/photo_new/T002R800x800M000${album.mid}.jpg?max_age=2592000`
      )
    const singerName = singer && singer.map(item => item.name).join('/')
    name && setData({ currentSongName: `${name} - ${singerName}` })
    isPlaying ? audioRef.current!.play() : audioRef.current!.pause()
  }, [isPlaying])

  const playNext = async () => {
    setData({ isPlaying: false })
    const currentIndex = playlist.findIndex(item => item.id === currentSongId)
    if (playMode === 'singleLoop' || playMode === 'loop') {
      if (currentIndex === playlist.length) {
        const currentSong = await GET_MUSIC_VKEY({ songmid: playlist[0].mid })
        setData({
          currentSongUrl: currentSong.response.playLists[0],
          currentSongId: playlist[0].id
        })
      } else {
        const currentSong = await GET_MUSIC_VKEY({ songmid: playlist[currentIndex + 1].mid })
        setData({
          currentSongUrl: currentSong.response.playLists[0],
          currentSongId: playlist[currentIndex + 1].id
        })
      }
    } else {
      playRandom()
    }
  }

  const playPreview = async () => {
    setData({ isPlaying: false })
    const currentIndex = playlist.findIndex(item => item.id === currentSongId)
    if (playMode === 'singleLoop' || playMode === 'loop') {
      if (currentIndex === 0) {
        const currentSong = await GET_MUSIC_VKEY({ songmid: playlist[playlist.length - 1].mid })
        setData({
          currentSongUrl: currentSong.response.playLists[0],
          currentSongId: playlist[playlist.length - 1].id
        })
      } else {
        const currentSong = await GET_MUSIC_VKEY({ songmid: playlist[currentIndex - 1].mid })
        setData({
          currentSongUrl: currentSong.response.playLists[0],
          currentSongId: playlist[currentIndex - 1].id
        })
      }
    } else {
      playRandom()
    }
  }

  const playRandom = async () => {
    setData({ isPlaying: false })
    const randomIndex = ~~(Math.random() * playlist.length)
    const willPlaySong = await GET_MUSIC_VKEY({ songmid: playlist[randomIndex].mid })
    setData({
      currentSongUrl: willPlaySong.response.playLists[0],
      currentSongId: playlist[randomIndex].id
    })
  }

  const togglePlay = () => {
    console.log('播放/暂停')
    setData({ isPlaying: !isPlaying })
  }

  // 播放模式切换
  const togglePlayMode = () => {
    switch (playMode) {
      case 'loop':
        setData({ playMode: 'singleLoop' })
        break
      case 'singleLoop':
        setData({ playMode: 'random' })
        break
      default:
        setData({ playMode: 'loop' })
        break
    }
  }

  const handleCanPlay = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const target = e.target as HTMLAudioElement
    console.log('准备好播放', target.duration)
    const duration = target.duration
    target.play()
    setData({ isPlaying: true })
    setDuration(duration)
  }

  const onProgress = (e: SyntheticEvent<HTMLAudioElement>) => {
    const target = e.target as HTMLAudioElement
    const current = target.currentTime
    const percent = duration && (current / duration) * 100
    percent && !isDragging && setPercent(percent)
    setCurrentTime(current)
  }

  const onEnded = (e: SyntheticEvent<HTMLAudioElement>) => {
    const target = e.target as HTMLAudioElement
    switch (playMode) {
      case 'singleLoop':
        target.play()
        break
      case 'loop':
        playNext()
        break
      case 'random':
        playRandom()
      default:
        break
    }
  }

  const changeProgress = (targetInfo: TargetInfo, pos: MousePos) => {
    setIsDragging(true)
    const { left, width } = targetInfo
    const { pageX, pageY } = pos
    const compute = ((pageX - left) / width) * 100
    const percent = compute >= 100 ? 100 : compute <= 0 ? 0 : compute
    setPercent(percent)
  }

  const changeProgressEnd = (targetInfo: TargetInfo, pos: MousePos) => {
    const { left, width } = targetInfo
    const { pageX, pageY } = pos
    if (left && width) {
      const compute = ((pageX - left) / width) * 100
      const percent = compute >= 100 ? 100 : compute <= 0 ? 0 : compute
      const currentTime = (duration * percent) / 100
      console.log('----------拖动结束---------\n', currentTime, duration, percent)
      audioRef.current!.currentTime = currentTime
      setIsDragging(false)
    }
  }

  const onVolumeChange = (percent: number) => {
    console.log(percent)
    audioRef.current!.volume = percent / 100
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
          <img
            src={require(`resources/${isPlaying ? 'pause' : 'play'}00000.png`)}
            width="32"
            alt="play"
          />
        </span>
        <img
          src={require('resources/playNext.png')}
          onClick={playNext}
          width="25"
          height="25"
          alt="next"
        />
        {/* <span className="volume">
          <img src={require(`resources/volume${isDarkMode ? '_hl' : ''}.png`)} width="16" alt="" />
        </span> */}
        <VolumeControl onVolumeChange={onVolumeChange} isDarkMode={isDarkMode} />
        <span onClick={togglePlayMode} className="play-mode">
          <img
            src={require(`resources/${modeMap[playMode]}${isDarkMode ? '_hl' : ''}.png`)}
            width="20px"
            alt="loop"
          />
        </span>
      </div>
      <div className="footer-progress">
        <img src={albumCover} alt="" width="38" height="38" className="footer-progress-cover" />
        <div className="footer-progress-content">
          <span className="song-name">{currentSongName}</span>
          <span className="song-time">
            {formatSeconds(currentTime)} / {formatSeconds(duration)}
          </span>
          <Progress
            onProgressChange={changeProgress}
            onProgressChangeEnd={changeProgressEnd}
            width={percent}
          ></Progress>
        </div>
      </div>
      <div className="footer-operator">
        <span className="footer-operator-love">
          <img
            src={require(`resources/home_love${isDarkMode ? '_hl' : ''}.png`)}
            width="20"
            alt="添加到我喜欢"
          />
        </span>
        <span className="footer-operator-download">
          <img
            src={require(`resources/playBarDownload${isDarkMode ? '_hl' : ''}.png`)}
            width="20"
            alt="download"
          />
        </span>
        <span className="footer-operator-menu">
          <img
            src={require(`resources/normalMenu${isDarkMode ? '' : '2'}.png`)}
            width="16"
            alt="menu"
          />
        </span>
        <span className="footer-operator-lyric">
          <img
            src={require(`resources/Lyrics${
              lyricShowing ? 'Showing' : isDarkMode ? 'Normal_hl' : 'Normal'
            }.png`)}
            width="20"
            alt="桌面歌词"
          />
        </span>
        <span className="footer-operator-list">
          <img
            src={require(`resources/playList${isDarkMode ? '_hl' : ''}.png`)}
            width="20"
            alt="播放列表"
          />
        </span>
      </div>
      <audio
        ref={audioRef}
        src={currentSongUrl}
        onCanPlay={handleCanPlay}
        onTimeUpdate={onProgress}
        onEnded={onEnded}
      ></audio>
    </div>
  )
}

export default Footer
