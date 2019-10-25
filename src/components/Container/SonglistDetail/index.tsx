import React, { useState, useEffect, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router'
import { GET_SONGLIST_DETAIL } from 'request/GetSongList'
import { SonglistDetail, SongDetail, Singer, Album } from 'request/types/Playlist'
import { Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import SonglistTable from 'components/common/Songlist'
import { formatSeconds } from 'utils'
import './index.scss'

const SonglistDetailFC: React.FC<RouteComponentProps> = props => {
  console.log(props.location.state)
  const [songlistDetail, setSonglistDetail] = useState<SonglistDetail>()

  let SongTable: ReactNode

  useEffect(() => {
    ;(async () => {
      const listDetail = await GET_SONGLIST_DETAIL({ disstid: props.location.state })
      setSonglistDetail(listDetail)
      console.log(songlistDetail, listDetail)
    })()
  }, [])
  if (songlistDetail && !songlistDetail.response.code) {
    console.log('...', songlistDetail)
    const tableData = songlistDetail.response.cdlist[0].songlist
    console.log(tableData)
    SongTable = <SonglistTable songTableData={tableData}></SonglistTable>
  }

  return (
    <div className="songlist-detail">
      <div className="songlist-detail-header">歌单简介</div>
      <div className="songlist-detail-content">{SongTable}</div>
    </div>
  )
}

export default SonglistDetailFC
