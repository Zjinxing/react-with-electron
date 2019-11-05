import React, { useState, useEffect, ReactNode, useContext, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import dayjs from 'dayjs'
import { GET_SONGLIST_DETAIL, GET_MUSIC_VKEY } from 'request/GetSongList'
import { SonglistDetail, SongDetail } from 'request/types/Playlist'
import SonglistTable from 'components/common/Songlist'
import MyButton from 'components/common/MyButton'
import { AppContext, State } from 'Store'
import './index.scss'

const SonglistDetailFC: React.FC<RouteComponentProps> = props => {
  const { isDarkMode, setData, currentSongId, isPlaying } = useContext(AppContext) as State
  const [songlistDetail, setSonglistDetail] = useState<SonglistDetail>()
  const [headerClass, setHeaderClass] = useState('')

  let SonglistDesc: ReactNode
  let SongTable: ReactNode
  let HeaderSummary: ReactNode

  const headerRef = useRef<HTMLDivElement>(null)

  const tagClick = (tag: { id: number; name: string; pid: number }) => {
    console.log(tag)
  }

  const togglePlay = async (row: SongDetail) => {
    if (row.id === currentSongId) {
      setData({ isPlaying: !isPlaying })
    } else {
      const result = await GET_MUSIC_VKEY({ songmid: row.mid })
      const playlist = songlistDetail!.response.cdlist[0].songlist
      const { name, singer } = row
      const singerName = singer && singer.map(item => item.name).join('/')
      setData({
        currentSongId: row.id,
        playlist: playlist,
        currentSongUrl: result.response.playLists[0],
        currentSongName: `${name} - ${singerName}`
      })
    }
  }

  // 播放全部
  const playAll = async () => {
    if (songlistDetail) {
      const { cdlist } = songlistDetail.response
      const { songlist } = cdlist[0]
      const willPlaySong = await GET_MUSIC_VKEY({ songmid: songlist[0].mid })
      const { name, singer } = songlist[0]
      const singerName = singer && singer.map(item => item.name).join('/')
      setData({
        currentSongId: songlist[0].id,
        playlist: songlist,
        currentSongUrl: willPlaySong.response.playLists[0],
        currentSongName: `${name} - ${singerName}`
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      const listDetail = await GET_SONGLIST_DETAIL({ disstid: props.location.state })
      setSonglistDetail(listDetail)
    })()
    const io = new IntersectionObserver(scrollListener, { threshold: 0.005 })
    headerRef.current && io.observe(headerRef.current)
  }, [])

  const scrollListener = (entries: IntersectionObserverEntry[]) => {
    console.log('发生变化', entries)
    const [entry] = entries
    const { intersectionRatio } = entry
    const wrapper = document.querySelector('.songlist-detail')
    wrapper && console.log('>>>', wrapper, document)
    console.log('00000000', intersectionRatio)
    // 不能以intersectionRation > 0 来判断，滚动很缓慢的情况很大几率出现 = 0 的情况，
    // 无法判断向上还是向下滚动，因此添加 {threshold: 0.005} 作为触发条件
    if (intersectionRatio < 0.005) {
      console.log('out of view')
      setHeaderClass('header-out')
    } else {
      console.log('in view')
      setHeaderClass('')
    }
  }

  if (songlistDetail && !songlistDetail.response.code) {
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
            <MyButton type="primary" onClick={playAll}>
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
    HeaderSummary = (
      <div className={`header-summary ${headerClass}`}>
        <div className="header-summary-name">
          <img src={cd.dir_pic_url2} alt={cd.dissname} width="36" className="cover" />
          <h3>{cd.dissname}</h3>
        </div>
        <div className="header-summary-control">
          <MyButton type="primary" ghost onClick={playAll}>
            <img src={require('resources/cellPlay_hover@2x.png')} width="16" alt="" />
            播放全部
          </MyButton>
          <MyButton ghost>
            &nbsp;
            <img src={require('resources/cellLoveUnselected_hl@2x.png')} width="16" alt="" />
            收藏 &nbsp;
          </MyButton>
          <MyButton ghost>
            <img src={require('resources/cellDownload_hl@2x.png')} width="18" alt="" />
            下载全部
          </MyButton>
          <MyButton ghost>
            &nbsp;
            <img src={require('resources/pop_share_hl@2x.png')} width="14" alt="" />
            &nbsp; 分享 &nbsp;
          </MyButton>
        </div>
      </div>
    )
  }

  return (
    <div className={`songlist-detail ${isDarkMode ? 'dark-mode' : ''}`}>
      <div ref={headerRef} className="songlist-detail-header">
        {SonglistDesc}
      </div>
      {HeaderSummary}
      <div className="songlist-detail-content">{SongTable}</div>
    </div>
  )
}

export default SonglistDetailFC
