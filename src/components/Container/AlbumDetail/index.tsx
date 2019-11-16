import React, { useEffect, ReactNode, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Tabs } from 'antd'
import { GET_ALBUM } from 'request/Album'
import { AlbumSongDetail } from 'request/types/Album'
import { formatSeconds } from 'utils'
import SongDesc, { Description } from 'components/common/SongDesc'
import SongControl from 'components/common/SongControl'
import SongWave from 'components/common/SongWave'
import './index.scss'

const { TabPane } = Tabs

const AlbumDetail: React.FC<RouteComponentProps> = props => {
  const [albuminfo, setAlbumInfo] = useState<Description>()
  const [albumSonglist, setAlbumSonglist] = useState<AlbumSongDetail[]>()
  let AlubmDesc: ReactNode
  useEffect(() => {
    ;(async () => {
      const sessionAlbummid = sessionStorage.getItem('albummid')
      ;(!sessionAlbummid || sessionAlbummid === 'undefined') &&
        sessionStorage.setItem('albummid', props.location.state)
      const albummid = props.location.state || sessionAlbummid
      const result = await GET_ALBUM(albummid)
      const { data, code } = result.response
      setAlbumSonglist(data.list)
      !code &&
        setAlbumInfo({
          cover: `https://y.gtimg.cn/music/photo_new/T002R800x800M000${data.mid}.jpg?max_age=2592000`,
          name: data.name,
          creator: data.singername,
          createdAt: data.aDate,
          desc: data.desc,
          tags: []
        })
    })()
  }, [])

  const playAll = () => {
    console.log('播放全部')
  }
  if (albuminfo) {
    AlubmDesc = <SongDesc description={albuminfo} playAll={playAll} />
  }
  const SingleSong = (songData: AlbumSongDetail, index: number) => {
    return (
      <li className="album-single-song" key={songData.songmid}>
        <div className="album-single-song--name">
          <span>{songData.songname}</span>
          {/* <SongControl songDetail={songData}></SongControl> */}
        </div>
        <span className="album-single-song--singerName">
          {songData.singer.map(singer => singer.name).join('/')}
        </span>
        <span>{formatSeconds(songData.interval)}</span>
      </li>
    )
  }
  return (
    <div className="album-detail">
      {AlubmDesc}

      <div className="album-detail__content">
        <Tabs>
          <TabPane tab={`歌曲`} key="song">
            <ul className="album-songlist">
              <li className="album-songlist__header album-single-song">
                <span className="album-single-song--songName">歌曲名</span>
                <span className="album-single-song--singerName">歌手名</span>
                <span className="album-single-song--interval">时间</span>
              </li>
              {albumSonglist && albumSonglist.map((song, index) => SingleSong(song, index))}
            </ul>
          </TabPane>
          <TabPane tab={`评论`} key="comments">
            这里是评论
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default AlbumDetail
