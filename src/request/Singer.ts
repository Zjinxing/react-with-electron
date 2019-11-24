import { parse } from 'fast-xml-parser'

import instance from './Http'
import { commonConfig } from './config'
import { HotSingerRes, SingerSong, SingerDesc } from './types/Singer'
/**
 * 获取歌手列表
 * @param param0
 */
interface SingerParam {
  area: number // 地区
  sex: number // 性别
  genre: number // 风格？
  index: number // 姓名首字母
}
export const GET_SINGER = async ({
  area = -100,
  sex = -100,
  genre = -100,
  index = -100
}: SingerParam) => {
  const data = {
    comm: { ct: 24, cv: 0 },
    singerList: {
      module: 'Music.SingerListServer',
      method: 'get_singer_list',
      param: { area, sex, genre, index, sin: 0, cur_page: 1 }
    }
  }
  const result = await instance.get('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    params: { ...commonConfig, data }
  })
  return (result as any) as HotSingerRes
}

interface SingerSongParam {
  order: number
  singerMid: string
  begin: number
  num: number
}
export const GET_SINGER_SONG = async ({
  order = 1,
  singerMid,
  begin = 0,
  num = 10
}: SingerSongParam) => {
  const data = {
    comm: { ct: 24, cv: 0 },
    singerSongList: {
      method: 'GetSingerSongList',
      param: { order, singerMid, begin, num },
      module: 'musichall.song_list_server'
    }
  }
  const result = await instance.get('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    params: { ...commonConfig, data }
  })
  return (result as any) as SingerSong
}

export const GET_SINGER_DESC = async (singermid: string) => {
  const desc = ((await instance.get('getSingerDesc', { params: { singermid } })) as any) as {
    response: string
  }
  const result = parse(desc.response, { ignoreAttributes: true, trimValues: true })
  return result as SingerDesc
}
