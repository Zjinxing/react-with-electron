import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { GET_SINGER_DESC } from 'request/Singer'

const SingerDetail: React.FC<RouteComponentProps> = props => {
  const [singerDesc, setSingerDesc] = useState('')
  useEffect(() => {
    console.log(props.location.state)
    ;(async () => {
      const singermid = props.location.state
      const singerDesc = await GET_SINGER_DESC(singermid)
      console.log(singerDesc.result)
      // setSingerDesc(result.response)
    })()
  }, [])
  return (
    <div className="singer-detail">
      <span>歌手详情</span>
      <span>{singerDesc}</span>
    </div>
  )
}

export default SingerDetail
