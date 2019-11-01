import React, { useState, useContext, useEffect } from 'react'
import { AppContext, State } from 'Store'
import './index.scss'

const SongWave: React.FC = () => {
  const { isPlaying } = useContext(AppContext) as State
  const [waveClass, setWaveClass] = useState('')

  useEffect(() => {
    if (isPlaying) {
      setWaveClass('animation-wave-start')
    } else {
      setWaveClass('')
    }
  }, [isPlaying])

  return (
    <div className={`wave-wrapper ${waveClass}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default SongWave
