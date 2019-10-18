import React, { ReactNode } from 'react'
import { PlaylistItem } from 'request/types/Playlist'
import './index.scss'

interface Props {
  playlistInfo: PlaylistItem
  children?: ReactNode
}

const PlaylistCover: React.FC<Props> = props => {
  return (
    <>
      <li className="list-item">
        <img src={props.playlistInfo.cover_url_medium} alt={props.playlistInfo.title} />
        <div className="cover-img">{props.playlistInfo.title}</div>
      </li>
    </>
  )
}

export default PlaylistCover
