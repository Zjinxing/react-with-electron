import React from 'react'
import './index.scss'
import { HotSinger } from 'request/types/Singer'
import { useHistory } from 'react-router'

interface Props {
  hotSinger: HotSinger[]
}

const Singer: React.FC<Props> = props => {
  const history = useHistory()
  const getSingerDesc = async (singermid: string, singerPic: string) => {
    const path = {
      pathname: '/singer-detail',
      state: { singermid, singerPic },
    }
    history.push(path)
  }
  return (
    <div className="hot-singer">
      <div className="hot-singer__header">
        <h4>热门歌手</h4>
        <span className="hot-singer__header--more">更多</span>
      </div>
      <ul className="hot-singer__list">
        {props.hotSinger.slice(0, 6).map(singer => (
          <li
            className="hot-singer__list-item"
            key={singer.singer_id}
            onClick={() => getSingerDesc(singer.singer_mid, singer.singer_pic)}
          >
            <img src={singer.singer_pic} width="100%" alt="" />
            <span>{singer.singer_name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Singer
