import React, { useContext } from 'react'
import { AppContext, State } from 'Store'
import Banner from './Banner/Banner'
import OfficialSonglist from './OfficialSonglist' // 官方歌单
import HipsterSonglist from './HipsterSonglist' // 达人歌单
import NewSong from './NewSong' // 新歌速递

const Choiceness: React.FC = () => {
  const { recommend } = useContext(AppContext) as State
  let focusContent
  if (recommend.response) {
    console.log(recommend.response)
    focusContent = recommend.response.focus.data.content
  }

  return (
    <div className="choiceness">
      <Banner focusContent={focusContent}></Banner>
      <OfficialSonglist />
      {recommend.response && (
        <HipsterSonglist playlist={recommend.response.recomPlaylist.data.v_hot.slice(0, 6)} />
      )}
      {recommend.response && <NewSong newsong={recommend.response.new_song.data} />}
    </div>
  )
}

export default Choiceness
