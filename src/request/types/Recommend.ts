import { Singer, Album, SongDetailCommon } from './Playlist'

export interface FocusContent {
  cover: string
  id: number
  jump_info: {
    id: number
    mid: string
    url: string
  }
  pic_info: {
    mid: string
    url: string
    urlex1: string
    urlex2: string
  }
  report: string
  title: string
  type: number
}

// 达人歌单列表
export interface HotPlaylistItem {
  album_pic_mid: string
  content_id: number
  cover: string
  creator: number
  edge_mark: string
  id: number
  is_dj: boolean
  is_vip: boolean
  jump_url: string
  listen_num: number
  pic_mid: string
  rcmdcontent: string
  rcmdtemplate: string
  rcmdtype: number
  title: string
  tjreport: string
  type: number
  username: string
}

export interface Lan {
  lan: string
  name: string
  tjreport: string
  type: number
}

interface NewSongSinger extends Singer {
  type: number
  uin: number
}

interface NewSongAlbum extends Album {
  pmid: string
  time_public: string
}

export interface NewSongDetail extends SongDetailCommon {
  singer: NewSongSinger[]
  album: NewSongAlbum
}

export interface NewSongData {
  lan: string
  lanlist: Lan[]
  ret_msg: string
  songlist: NewSongDetail[]
  type: number
}
export interface NewSong {
  code: number
  data: NewSongData
}

export default interface Recommend {
  response: {
    category: any
    focus: {
      code: number
      data: {
        content: Array<FocusContent>
        id: number
        sub_cube: []
        title: string
      }
    }
    new_album: any
    new_album_tag: any
    new_song: NewSong
    playlist: any
    recomPlaylist: {
      code: number
      data: {
        page: number
        v_hot: HotPlaylistItem[]
      }
    }
    toplist: any
    code: number
    ts: number
  }
}
