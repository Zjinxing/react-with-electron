import React, { ReactNode } from 'react'
import { useHistory } from 'react-router'
import { PlaylistItem } from 'request/types/Playlist'
import './index.scss'

interface Props {
  playlistInfo: PlaylistItem
  children?: ReactNode
}

const PlaylistCover: React.FC<Props> = props => {
  const history = useHistory()

  const handleClick = () => {
    const path = {
      pathname: '/songlist-detail',
      state: props.playlistInfo.tid
    }
    history.push(path)
  }

  return (
    <>
      <li className="list-item" onClick={handleClick}>
        <img src={props.playlistInfo.cover_url_medium} alt={props.playlistInfo.title} />
        <div className="cover-img">{props.playlistInfo.title}</div>
      </li>
    </>
  )
}

export default PlaylistCover
