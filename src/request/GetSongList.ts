import instance from './Http'
import { Playlist, SonglistDetail } from './types/Playlist'
import { MusicVkey } from './types/MusicVkey'

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
