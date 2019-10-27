import React, { useContext } from 'react'
import { AppContext, State } from '../../Store/index'
import './index.scss'
const Footer: React.FC = () => {
  const { isDarkMode } = useContext(AppContext) as State

  return (
    <div className={`footer ${isDarkMode ? 'dark' : ''}`}>
      <div className="footer-control">
        <img src={require('resources/playPreview.png')} width="25" height="25" alt="preview" />
        <span className="toggle-play">
          <img src={require('resources/play00000.png')} width="32" alt="play" />
          <img src={require('resources/pause00000.png')} width="32" alt="next" />
        </span>
        <img src={require('resources/playNext.png')} width="25" height="25" alt="next" />
        <span className="volume">
          <img src={require(`resources/volume${isDarkMode ? '_hl' : ''}.png`)} width="16" alt="" />
        </span>
        <span className="play-mode">
          <img src={require('resources/playModeLoop_hl.png')} width="20px" alt="loop" />
        </span>
      </div>
      <div className="footer-progress"></div>
      <div className="footer-operator"></div>
    </div>
  )
}

export default Footer
