import React, { useContext, useEffect } from 'react'
import { AppContext, State } from 'Store'
import { GET_SONGLIST } from 'request/GetSongList'
import Banner from './Banner/Banner'

const Choiceness: React.FC = () => {
  const { recommend } = useContext(AppContext) as State
  useEffect(() => {
    ;(async () => {
      const officalSonglist = await GET_SONGLIST()
      console.log(officalSonglist)
    })()
  }, [])
  let focusContent
  if (recommend.response) {
    console.log(recommend.response)
    focusContent = recommend.response.focus.data.content
  }

  return (
    <div className="choiceness">
      <Banner focusContent={focusContent}></Banner>
    </div>
  )
}

export default Choiceness
