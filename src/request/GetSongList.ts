import instance from './Http'
import { Playlist, SonglistDetail } from './types/Playlist'
import { MusicVkey } from './types/MusicVkey'
import { SongListComments } from './types/Comments'
import { NewSong } from './types/Recommend'

export const GET_OFFICIAL_SONGLIST = async () => {
  const result = await instance.get(
    'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom5598438828663488&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A3317%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A3317%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
  )
  return (result as unknown) as Playlist
}

export const GET_SONGLIST_DETAIL = async (params: { disstid: number }) => {
  const result = await instance.get('getSongListDetail', { params })
  return (result as unknown) as SonglistDetail
}

export const GET_MUSIC_VKEY = async (params: { songmid: string }) => {
  const result = await instance.get('getMusicVKey', { params })
  return (result as unknown) as MusicVkey
}

export const GET_SONGLIST_COMMENTS = async (params: {
  topid: number
  pagenum: number
  pagesize: number
  loginUin?: number
  lasthotcommentid?: string
}) => {
  const common = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'GB2312',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    cid: 205360772,
    reqtype: 2,
    biztype: 3,
    topid: params.topid,
    cmd: 8,
    needmusiccrit: 0,
    pagenum: params.pagenum,
    pagesize: params.pagesize,
    lasthotcommentid: params.lasthotcommentid,
    domain: 'qq.com',
    ct: 24,
    cv: 10101010
  }
  const result = await instance.get('https://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg', {
    params: { ...common, ...params }
  })
  return (result as any) as SongListComments
}

export const GET_NEWSONG_BY_TYPE = async (params: { type: number }) => {
  const data = {
    comm: { ct: 24 },
    new_song: {
      module: 'newsong.NewSongServer',
      method: 'get_new_song_info',
      param: { type: params.type }
    }
  }
  const param = {
    '-': '0',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data
  }
  const result = await instance.get('https://u.y.qq.com/cgi-bin/musicu.fcg?', {
    params: param
  })
  return (result as any) as {
    new_song: NewSong
    code: number
    ts: number
  }
}
