import React, { useState, useEffect, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router'
import { GET_SONGLIST_DETAIL } from 'request/GetSongList'
import { SonglistDetail, SongDetail, Singer, Album } from 'request/types/Playlist'
import { Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { formatSeconds } from 'utils'
import './index.scss'

const SonglistDetailFC: React.FC<RouteComponentProps> = props => {
  console.log(props.location.state)
  const [songlistDetail, setSonglistDetail] = useState<SonglistDetail>()

  const sqTag = <img width="25" src={require('resources/cell_sq.png')} alt="sq" />
  const mvTag = <img width="25" src={require('resources/cell_mv.png')} alt="mv" />
  const onlyTag = <img width="25" src={require('resources/cell_only.png')} alt="独家" />

  const columns: ColumnProps<SongDetail>[] = [
    {
      title: '歌曲',
      key: 'name',
      dataIndex: 'name',
      width: '40%',
      className: 'name-col',
      render: (cell: string, data) => (
        <div>
          <span>{cell}</span>
          <span className="tags">{data.isonly ? onlyTag : ''} </span>
        </div>
      )
    },
    {
      title: '歌手',
      key: 'singer',
      className: 'singer-col',
      dataIndex: 'singer',
      width: '25%',
      render: (cell: Singer[]) => <span>{cell.map(singer => singer.name).join('/')}</span>
    },
    {
      title: '专辑',
      key: 'album',
      className: 'album-col',
      dataIndex: 'album',
      width: '25%',
      render: (data: Album) => <span>{data.name}</span>
    },
    {
      title: '时间',
      key: 'interval',
      dataIndex: 'interval',
      width: '10%',
      render: data => <span>{formatSeconds(data)}</span>
    }
  ]

  let songTable: ReactNode

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
    songTable = (
      <Table
        dataSource={tableData}
        rowClassName={() => 'table-row'}
        columns={columns}
        rowKey={record => `${record.id}`}
      ></Table>
    )
  }

  return (
    <div className="songlist-detail">
      <div className="songlist-detail-header">歌单简介</div>
      <div className="songlist-detail-content">{songTable}</div>
    </div>
  )
}

export default SonglistDetailFC
