import React, { useContext } from 'react'
import Banner from './Banner/Banner'
import { AppContext, State } from 'Store'

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
    </div>
  )
}

export default Choiceness
