import React, { useContext } from 'react'
import { AppContext, State } from 'Store'
import Banner from './Banner/Banner'
import OfficialSonglist from './OfficialSonglist'
import HipsterSonglist from './HipsterSonglist'
import { HotPlaylistItem } from 'request/types/Recommend'

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
    </div>
  )
}

export default Choiceness
