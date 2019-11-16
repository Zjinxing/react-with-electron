import React, { useContext, useState, useEffect } from 'react'
import { AppContext, State } from 'Store'
import { GET_NEWSONG_BY_TYPE } from 'request/GetSongList'
import { NewSongData } from 'request/types/Recommend'
import Banner from './Banner/Banner'
import OfficialSonglist from './OfficialSonglist' // 官方歌单
import HipsterSonglist from './HipsterSonglist' // 达人歌单
import NewSong from './NewSong' // 新歌速递
import NewAlbum from './NewAlbum' // 专辑首发

const Choiceness: React.FC = () => {
  const { recommend } = useContext(AppContext) as State
  const [newSong, setNewSong] = useState<NewSongData>()

  enum NewSongType {
    '内地' = 1,
    '欧美' = 2,
    '日本' = 3,
    '韩国' = 4,
    '最新' = 5,
    '港台' = 6
  }

  let focusContent
  if (recommend.response) {
    console.log(recommend.response)
    focusContent = recommend.response.focus.data.content
  }

  const getNewSong = async (type: number) => {
    try {
      const result = await GET_NEWSONG_BY_TYPE({ type })
      setNewSong(result.new_song.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getNewSong(NewSongType['最新'])
  }, [])

  return (
    <div className="choiceness">
      <Banner focusContent={focusContent}></Banner>
      {/* 官方歌单 */}
      <OfficialSonglist />
      {/* 达人歌单 */}
      {recommend.response && (
        <HipsterSonglist playlist={recommend.response.recomPlaylist.data.v_hot.slice(0, 6)} />
      )}
      {/* 新歌四度 */}
      {newSong && <NewSong getNewSong={getNewSong} newsong={newSong} />}
      {/* 专辑首发 */}
      {recommend.response && (
        <NewAlbum
          albums={recommend.response.new_album.data.albums}
          albumTags={recommend.response.new_album_tag.data.area}
        ></NewAlbum>
      )}
    </div>
  )
}

export default Choiceness
