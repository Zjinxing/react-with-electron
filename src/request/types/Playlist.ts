interface PlaylistItem {
  access_num: number
  album_pic_mid: string
  censor_remark: Array<any>
  censor_status: number
  censor_time: number
  commit_time: number
  cover_mid: string
  cover_url_big: string
  cover_url_medium: string
  cover_url_small: string
  create_time: string
  creator_info: {
    avatar: string
    is_dj: number
    nick_name: string
    taoge_avatar: string
    taoge_nick: string
    uin: number
    vip_type: number
  }
  creator_uin: number
  desc: string
  dirid: number
  fav_num: number
  modify_time: number
  pic_mid: string
  rcmdcontent: string
  rcmdtemplate: string
  score: number
  song_ids: number[]
  song_types: number[]
  tag_ids: number[]
  tag_names: string[]
  tid: number
  title: string
  tjreport: string
}

export interface Playlist {
  code: number
  ts: number
  playlist: {
    data: {
      total: number
      v_playlist: Array<PlaylistItem>
    }
    code: number
  }
}
