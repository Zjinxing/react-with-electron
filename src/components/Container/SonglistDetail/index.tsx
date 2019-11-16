import React, { useState, useEffect, ReactNode, useContext, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import dayjs from 'dayjs'
import { Tabs } from 'antd'
import { GET_SONGLIST_DETAIL, GET_MUSIC_VKEY, GET_SONGLIST_COMMENTS } from 'request/GetSongList'
import { SonglistDetail, SongDetail } from 'request/types/Playlist'
import { SongListComments } from 'request/types/Comments'
import SonglistTable from 'components/common/Songlist'
import MyButton from 'components/common/MyButton'
import SongDesc from 'components/common/SongDesc'
import { AppContext, State } from 'Store'
import { SongInfo } from 'components/common/SongControl'
import './index.scss'

const SonglistDetailFC: React.FC<RouteComponentProps> = props => {
  const { isDarkMode, setData, currentSongmid, isPlaying } = useContext(AppContext) as State
  const [songlistDetail, setSonglistDetail] = useState<SonglistDetail>()
  const [commentList, setCommentList] = useState<SongListComments>()
  const [headerClass, setHeaderClass] = useState('')
  const [tabKey, setTabKey] = useState<'song' | 'comments'>('song')
  const [songNum, setSongNum] = useState(0)
  const [commentNum, setCommentNum] = useState(0)

  let SonglistDesc: ReactNode
  let SongTable: ReactNode
  let HeaderSummary: ReactNode

  const headerRef = useRef<HTMLDivElement>(null)

  const { TabPane } = Tabs

  const tagClick = (tag: { id: number; name: string; pid: number }) => {
    console.log(tag)
  }

  const togglePlay = async (row: SongInfo) => {
    if (row.mid === currentSongmid) {
      setData({ isPlaying: !isPlaying })
    } else {
      const result = await GET_MUSIC_VKEY({ songmid: row.mid })
      const playlist = songlistDetail!.response.cdlist[0].songlist
      const { name, singer } = row
      const singerName = singer && singer.map(item => item.name).join('/')
      setData({
        currentSongmid: row.mid,
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
        currentSongmid: songlist[0].mid,
        playlist: songlist,
        currentSongUrl: willPlaySong.response.playLists[0],
        currentSongName: `${name} - ${singerName}`
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      const sessionDisstid = sessionStorage.getItem('disstid')
      !sessionDisstid && sessionStorage.setItem('disstid', props.location.state)
      const disstid = props.location.state || sessionDisstid
      const listDetail = await GET_SONGLIST_DETAIL({ disstid: disstid })
      if (listDetail.response.cdlist[0]) {
        const comments = await GET_SONGLIST_COMMENTS({
          topid: listDetail.response.cdlist[0].dissid,
          pagenum: 0,
          pagesize: 25
        })
        console.log(comments)
        setCommentList(comments)
        setCommentNum(comments.comment.commenttotal)
      }
      console.log(listDetail)
      setSonglistDetail(listDetail)
      setSongNum(listDetail.response.cdlist[0].songnum)
    })()
    const io = new IntersectionObserver(scrollListener, { threshold: 0.005 })
    headerRef.current && io.observe(headerRef.current)
    return () => {
      console.log('组件卸载')
      sessionStorage.removeItem('disstid')
    }
  }, [])

  const scrollListener = (entries: IntersectionObserverEntry[]) => {
    console.log('发生变化', entries)
    const [entry] = entries
    const { intersectionRatio } = entry
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

    const description = {
      cover: cd.logo,
      name: cd.dissname,
      creator: cd.nickname,
      createdAt: dayjs(cd.ctime * 1000).format('YYYY-MM-DD'),
      desc: cd.desc,
      tags: cd.tags
    }
    SonglistDesc = <SongDesc description={description} tagClick={tagClick} playAll={playAll} />

    HeaderSummary = (
      <div className={`header-summary ${headerClass}`}>
        <div className="header-summary-name">
          <img src={cd.logo} alt={cd.dissname} width="36" className="cover" />
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
      <div ref={headerRef}>{SonglistDesc}</div>
      {HeaderSummary}
      <Tabs defaultActiveKey="song">
        <TabPane tab={`歌曲 (${songNum})`} key="song">
          <div className="songlist-detail-content">{SongTable}</div>
        </TabPane>
        <TabPane tab={`评论 (${commentNum})`} key="comments">
          这里是歌单评论
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SonglistDetailFC
