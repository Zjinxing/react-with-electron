import React, { ReactNode, useContext } from 'react'
import { SongDetail, Singer, Album } from 'request/types/Playlist'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { formatSeconds } from 'utils'
import { AppContext, State } from 'Store'
import SongWave from '../SongWave'
import SongControl from '../SongControl'
import './index.scss'

interface Props {
  songTableData: SongDetail[]
  togglePlay: (param: SongDetail) => Promise<void>
  children?: ReactNode
}

const SonglistTable: React.FC<Props> = props => {
  const { isDarkMode, isPlaying, currentSongId } = useContext(AppContext) as State

  const sqTag = <img src={require('resources/cell_sq.png')} className="tag" width="26" alt="sq" />
  const mvTag = (
    <img src={require('resources/cell_mv.png')} className="tag mv" width="26" alt="mv" />
  )
  const onlyTag = (
    <img src={require('resources/cell_only.png')} className="tag" width="26" alt="独家" />
  )

  const columns: ColumnProps<SongDetail>[] = [
    {
      title: '歌曲',
      key: 'name',
      dataIndex: 'name',
      width: '40%',
      className: 'name-col',
      render: (cell: string, data) => (
        <div className="name-content">
          <span className="text">{cell}</span>
          <div className="cells">
            <span className="tags">
              {data.file.size_ape || data.file.size_flac ? sqTag : null}
              {data.isonly ? onlyTag : null}
              {/* TODO, mv 点击打开新窗口 */}
              {data.mv.vid ? mvTag : null}
              {currentSongId === data.id && isPlaying && <SongWave />}
            </span>
            <SongControl songDetail={data} togglePlay={props.togglePlay}></SongControl>
          </div>
        </div>
      )
    },
    {
      title: '歌手',
      key: 'singer',
      className: 'singer-col',
      dataIndex: 'singer',
      width: '25%',
      render: (cell: Singer[]) => (
        <span className="text">{cell.map(singer => singer.name).join('/')}</span>
      )
    },
    {
      title: '专辑',
      key: 'album',
      className: 'album-col',
      dataIndex: 'album',
      width: '25%',
      render: (data: Album) => <span className="text">{data.name}</span>
    },
    {
      title: '时间',
      key: 'interval',
      dataIndex: 'interval',
      width: '10%',
      render: data => <span>{formatSeconds(data)}</span>
    }
  ]
  return (
    <Table
      dataSource={props.songTableData}
      rowClassName={() => 'table-row'}
      columns={columns}
      rowKey={record => `${record.id}`}
      pagination={false}
    ></Table>
  )
}

export default SonglistTable
