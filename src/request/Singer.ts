import instance from './Http'
import { commonConfig } from './config'
import { HotSingerRes } from './types/HotSinger'
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
