import React from 'react'
import './index.scss'

const SongList: React.FC = () => {
  return (
    <div className="playlist">
      <webview className="webview" src="https://y.qq.com/musicmac/v6/playlist/index.html"></webview>
    </div>
  )
}

export default SongList
