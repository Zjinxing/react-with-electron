import React, { ReactNode } from 'react'
import { HotPlaylistItem } from 'request/types/Recommend'
import HomePlaylistCover from 'components/common/HomePlaylistCover'
import './index.scss'

interface Props {
  playlist: HotPlaylistItem[]
  children?: ReactNode
}
const HipsterSonglist: React.FC<Props> = props => {
  console.log(props.playlist)
  const CoverList = props.playlist.map(item => (
    <HomePlaylistCover playlistInfo={item} key={item.content_id} />
  ))

  return (
    <div className="hipster-songlist">
      <h4 className="title">达人歌单</h4>
      <ul className="cover-list">{CoverList}</ul>
    </div>
  )
}

export default HipsterSonglist
