import React, { useEffect, ReactNode, useState, useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { Tabs } from 'antd'
import { GET_ALBUM } from 'request/Album'
import { AlbumSongDetail } from 'request/types/Album'
import { formatSeconds } from 'utils'
import SongDesc, { Description } from 'components/common/SongDesc'
import SongControl, { SongInfo } from 'components/common/SongControl'
import SongWave from 'components/common/SongWave'
import { AppContext, State } from 'Store'
import { GET_MUSIC_VKEY } from 'request/GetSongList'
import './index.scss'

const { TabPane } = Tabs

const AlbumDetail: React.FC<RouteComponentProps> = props => {
  const { isPlaying, currentSongmid, setData } = useContext(AppContext) as State

  const [albuminfo, setAlbumInfo] = useState<Description>()
  const [albumSonglist, setAlbumSonglist] = useState<AlbumSongDetail[]>()
  let AlubmDesc: ReactNode
  useEffect(() => {
    ;(async () => {
      const sessionAlbummid = sessionStorage.getItem('albummid')
      ;(!sessionAlbummid || sessionAlbummid === 'undefined') &&
        sessionStorage.setItem('albummid', props.location.state as string)
      const albummid = (props.location.state || sessionAlbummid) as string
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
          tags: [],
        })
    })()
  }, [])

  const playAll = () => {
    const firstSong = albumSonglist && albumSonglist[0]
    const param = {
      mid: firstSong!.songmid,
      name: firstSong!.songname,
      singer: firstSong!.singer,
    }
    togglePlay(param)
  }

  const togglePlay = async (song: SongInfo) => {
    if (song.mid === currentSongmid) {
      setData({ isPlaying: !isPlaying })
    } else {
      const result = await GET_MUSIC_VKEY({ songmid: song.mid })
      const playlist =
        albumSonglist &&
        albumSonglist.map(item => {
          Object.defineProperties(item, {
            mid: {
              value: item.songmid,
              writable: true,
              enumerable: true,
              configurable: true,
            },
            name: {
              value: item.songname,
              enumerable: true,
              writable: true,
              configurable: true,
            },
            album: {
              value: {
                mid: item.albummid,
              },
              writable: true,
              enumerable: true,
              configurable: true,
            },
          })
          return item
        })
      const { name, singer } = song
      const singerName = singer && singer.map(item => item.name).join('/')
      console.log({ playlist })
      setData({
        currentSongmid: song.mid,
        playlist: playlist,
        currentSongUrl: result.response.playLists[0],
        currentSongName: `${name} - ${singerName}`,
      })
    }
  }
  if (albuminfo) {
    AlubmDesc = <SongDesc description={albuminfo} playAll={playAll} />
  }

  const sqTag = <img src={require('resources/cell_sq.png')} className="tag" width="26" alt="sq" />
  const mvTag = (
    <img src={require('resources/cell_mv.png')} className="tag mv" width="26" alt="mv" />
  )
  const onlyTag = (
    <img src={require('resources/cell_only.png')} className="tag" width="26" alt="独家" />
  )

  const SingleSong = (songData: AlbumSongDetail, index: number) => {
    const { songmid, songname, singer } = songData
    const songDetail = { mid: songmid, name: songname, singer }
    return (
      <li className="album-single-song" key={songData.songmid}>
        <div className="album-single-song--name">
          <span>{songData.songname}</span>
          <div className="cells">
            <span className="tags">
              {songData.sizeflac || songData.sizeape ? sqTag : null}
              {songData.isonly ? onlyTag : null}
              {currentSongmid === songData.songmid && isPlaying && <SongWave />}
            </span>
            <SongControl songDetail={songDetail} togglePlay={togglePlay}></SongControl>
          </div>
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
