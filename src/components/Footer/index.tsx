import React, { useContext, useEffect } from 'react'
import { AppContext, State } from '../../Store/index'
import './index.scss'
import { GET_MUSIC_VKEY } from 'request/GetSongList'
const Footer: React.FC = () => {
  const {
    isDarkMode,
    currentSongUrl,
    currentSongMId,
    playlistMids,
    playMode,
    setData
  } = useContext(AppContext) as State

  const audioRef = React.createRef<HTMLAudioElement>()

  useEffect(() => {
    console.log(currentSongMId)
    audioRef.current && audioRef.current.play()
    console.log('idbmhw')
  }, [currentSongMId])

  const playNext = async () => {
    console.log('播放下一首')
    console.log({ playlistMids })
    const currentIndex = playlistMids.findIndex(item => item === currentSongMId)
    console.log({ currentSongMId })
    if (playMode === 'order') {
      if (currentIndex === playlistMids.length) {
        const currentSong = await GET_MUSIC_VKEY({ songmid: playlistMids[0] })
        setData({
          currentSongUrl: currentSong.response.playLists[0],
          currentSongMId: playlistMids[0]
        })
      } else {
        const currentSong = await GET_MUSIC_VKEY({ songmid: playlistMids[currentIndex + 1] })
        setData({
          currentSongUrl: currentSong.response.playLists[0],
          currentSongMId: playlistMids[currentIndex + 1]
        })
      }
    }
  }

  const playPreview = async () => {
    console.log('播放上一首')
  }

  const togglePlay = () => {
    console.log('播放/暂停')
    audioRef.current!.paused ? audioRef.current!.play() : audioRef.current!.pause()
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
        <audio ref={audioRef} src={currentSongUrl} controls></audio>
        ====== {currentSongMId} ======
      </div>
      <div className="footer-operator"></div>
    </div>
  )
}

export default Footer
