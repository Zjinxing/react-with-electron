import React, { useContext } from 'react'
import { AppContext, State } from 'Store'
import Banner from './Banner/Banner'
import OfficialSonglist from './OfficialSonglist'

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
    </div>
  )
}

export default Choiceness
