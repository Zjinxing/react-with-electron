import React from 'react'
import './index.scss'

const Ranking: React.FC = () => {
  return (
    <div className="ranking">
      <webview className="webview" src="https://y.qq.com/musicmac/v6/toplist/index.html"></webview>
    </div>
  )
}

export default Ranking
