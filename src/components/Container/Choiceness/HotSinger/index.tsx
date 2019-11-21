import React from 'react'
import './index.scss'
import { HotSinger } from 'request/types/HotSinger'

interface Props {
  hotSinger: HotSinger[]
}

const Singer: React.FC<Props> = props => {
  return (
    <div className="hot-singer">
      <div className="hot-singer__header">
        <h4>热门歌手</h4>
        <span className="hot-singer__header--more">更多</span>
      </div>
      <ul className="hot-singer__list">
        {props.hotSinger.slice(0, 6).map(singer => (
          <li className="hot-singer__list-item" key={singer.singer_id}>
            <img src={singer.singer_pic} width="100%" alt="" />
            <span>{singer.singer_name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Singer
