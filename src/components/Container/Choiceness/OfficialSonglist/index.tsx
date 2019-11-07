import React, { useEffect, useState, ReactNode } from 'react'
import { GET_OFFICIAL_SONGLIST } from 'request/GetSongList'
import { Playlist } from 'request/types/Playlist'
import PlaylistCover from 'components/common/PlaylistCover/index'
import './index.scss'

const OfficialSonglist: React.FC = () => {
  const [officialSonglist, setOfficialSonglist] = useState<Playlist>()
  let CoverList: ReactNode
  useEffect(() => {
    ;(async () => {
      const songlist = await GET_OFFICIAL_SONGLIST()
      setOfficialSonglist(songlist)
    })()
  }, [])
  if (officialSonglist) {
    const playlist = officialSonglist.playlist.data.v_playlist
    const showList = playlist.slice(0, 6)
    CoverList = showList.map(item => <PlaylistCover playlistInfo={item} key={item.tid} />)
  }

  return (
    <div className="official-songlist">
      <h4 className="title">官方歌单</h4>
      <ul className="cover-list">{CoverList}</ul>
    </div>
  )
}

export default OfficialSonglist
