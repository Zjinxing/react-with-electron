import React, { ReactNode } from 'react'
import { SongDetail, Singer, Album } from 'request/types/Playlist'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { formatSeconds } from 'utils'
import './index.scss'

interface Props {
  songTableData: SongDetail[]
  children?: ReactNode
}

const SonglistTable: React.FC<Props> = props => {
  const onControl = (row: SongDetail, e: React.SyntheticEvent<EventTarget>) => {
    const { target } = e
    if (!(target instanceof HTMLImageElement)) return
    const { dataset } = target
    const { name } = dataset
    switch (name) {
      case 'togglePlay':
        console.log(row.id)
        console.log('播放/暂停')
        break
      case 'toggleLove':
        console.log('收藏/取消')
        break
      case 'download':
        console.log('下载')
        break
      case 'menu':
        console.log('菜单')
        break
      default:
        break
    }
  }

  const sqTag = <img src={require('resources/cell_sq.png')} className="tag" width="26" alt="sq" />
  const mvTag = (
    <img src={require('resources/cell_mv.png')} className="tag mv" width="26" alt="mv" />
  )
  const onlyTag = (
    <img src={require('resources/cell_only.png')} className="tag" width="26" alt="独家" />
  )

  const CellPlay = (
    <span className="cell-play">
      <img
        src={require('resources/cellPlay_hl@2x.png')}
        data-name="togglePlay"
        className="cell-play--normal"
        width="20"
        alt="play"
      />
      <img
        src={require('resources/cellPlay_hover@2x.png')}
        data-name="togglePlay"
        className="cell-play--hover"
        width="20"
        alt="play"
      />
    </span>
  )

  const CellLove = (
    <span className="cell-love">
      <img
        src={require('resources/cellLoveUnselected_hl@2x.png')}
        data-name="toggleLove"
        className="cell-love--normal"
        width="20"
        alt="love"
      />
      <img
        src={require('resources/cellLoveUnselected_hover@2x.png')}
        data-name="toggleLove"
        className="cell-love--hover"
        width="20"
        alt="love"
      />
      {/* <img
        src={require('resources/cellLove_selected@2x.png')}
        className="cell-love--selected"
        width="20"
        alt="love"
      /> */}
    </span>
  )

  const CellDownload = (
    <span className="cell-download">
      <img
        src={require('resources/cellDownload_hl@2x.png')}
        data-name="download"
        className="cell-download--normal"
        width="20"
        alt=""
      />
      <img
        src={require('resources/cellDownload_hover@2x.png')}
        data-name="download"
        className="cell-download--hover"
        width="20"
        alt=""
      />
      {/* <img
        src={require('resources/cellDownloadOK_hl@2x.png')}
        className="cell-downloadok"
        width="20"
        alt=""
      />
      <img
        src={require('resources/cellDownloadOK_hover@2x.png')}
        className="cell-downloadok--hover"
        width="20"
        alt=""
      /> */}
    </span>
  )
  const Menu = (
    <span className="cell-menu">
      <img
        src={require('resources/normalMenu.png')}
        data-name="menu"
        className="cell-menu--normal"
        width="16"
        alt="menu"
      />
      <img
        src={require('resources/normalMenu_hover.png')}
        data-name="menu"
        className="cell-menu--hover"
        width="16"
        alt="menu"
      />
    </span>
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
            </span>
            <span className="controls" onClick={e => onControl(data, e)}>
              {CellPlay}
              {CellLove}
              {CellDownload}
              {Menu}
            </span>
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
  console.log(columns)
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
