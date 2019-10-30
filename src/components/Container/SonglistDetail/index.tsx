import React, { useState, useEffect, ReactNode, useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import dayjs from 'dayjs'
import { GET_SONGLIST_DETAIL, GET_MUSIC_VKEY } from 'request/GetSongList'
import { SonglistDetail, SongDetail } from 'request/types/Playlist'
import SonglistTable from 'components/common/Songlist'
import MyButton from 'components/common/MyButton'
import { AppContext, State } from 'Store'
import './index.scss'

const SonglistDetailFC: React.FC<RouteComponentProps> = props => {
  const { isDarkMode, setData } = useContext(AppContext) as State
  const [songlistDetail, setSonglistDetail] = useState<SonglistDetail>()

  let SonglistDesc: ReactNode
  let SongTable: ReactNode

  const tagClick = (tag: { id: number; name: string; pid: number }) => {
    console.log(tag)
  }

  const togglePlay = async (row: SongDetail) => {
    const result = await GET_MUSIC_VKEY({ songmid: row.mid })
    console.log(result)
    const playlist = songlistDetail!.response.cdlist[0].songlist
    setData({
      currentSongId: row.id,
      playlist: playlist,
      currentSongUrl: result.response.playLists[0]
    })
  }

  useEffect(() => {
    ;(async () => {
      const listDetail = await GET_SONGLIST_DETAIL({ disstid: props.location.state })
      setSonglistDetail(listDetail)
    })()
  }, [])
  if (songlistDetail && !songlistDetail.response.code) {
    console.log('...', songlistDetail)
    const cd = songlistDetail.response.cdlist[0]
    SongTable = <SonglistTable songTableData={cd.songlist} togglePlay={togglePlay}></SonglistTable>

    SonglistDesc = (
      <>
        <img src={cd.dir_pic_url2} alt={cd.dissname} width="150" className="cover" />
        <div className="songlist-info">
          <h2 className="songlist-info-title">{cd.dissname}</h2>
          <div className="songlist-info-summary">
            <span className="creator-nickname">{cd.nickname}</span>
            <span className="songlist-info-summary--createtime">
              {dayjs(cd.ctime * 1000).format('YYYY-MM-DD')}创建
            </span>
            <ul className="songlist-info-summary--tags">
              {cd.tags.map(tag => (
                <li key={tag.id} onClick={() => tagClick(tag)}>
                  {tag.name}
                </li>
              ))}
            </ul>
          </div>
          <p className="songlist-info-desc">
            <span>{cd.desc.replace(/(&nbsp;)|(&#160;)/g, ' ')}</span>
            <span className="unfold">[展开]</span>
          </p>
          <div className="songlist-info-control">
            <MyButton type="primary">
              <img src={require('resources/cellPlay_hover@2x.png')} width="16" alt="" />
              播放全部
            </MyButton>
            <MyButton>
              &nbsp;
              <img src={require('resources/cellLoveUnselected_hl@2x.png')} width="16" alt="" />
              收藏 &nbsp;
            </MyButton>
            <MyButton>
              <img src={require('resources/batch_hl.png')} width="16" alt="" />
              批量操作
            </MyButton>
            <MyButton>
              <img src={require('resources/cellDownload_hl@2x.png')} width="18" alt="" />
              下载全部
            </MyButton>
            <MyButton>
              &nbsp;
              <img src={require('resources/pop_share_hl@2x.png')} width="14" alt="" />
              &nbsp; 分享 &nbsp;
            </MyButton>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={`songlist-detail ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="songlist-detail-header">{SonglistDesc}</div>
      <div className="songlist-detail-content">{SongTable}</div>
    </div>
  )
}

export default SonglistDetailFC
