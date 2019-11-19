import { AlbumInfo, NewAlbum } from './types/Album'
import instance from './Http'
import { commonConfig } from './config'

export type Area = 1 | 2 | 3 | 4 | 5 | 6

/**
 * 获取不同地区新专辑
 * @param area 地区代码 1: 内地; 2: 港台; 3: 欧美; 4: 韩国; 5: 日本; 6: 其他
 */
export const GET_NEW_ALBUMS = async (area: Area) => {
  const data = {
    new_album: {
      module: 'newalbum.NewAlbumServer',
      method: 'get_new_album_info',
      param: { area, start: 0, num: 20 }
    },
    new_album_tag: { module: 'newalbum.NewAlbumServer', method: 'get_new_album_area', param: {} },
    comm: { ct: 24, cv: 0 }
  }
  const result = await instance.get('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    params: { ...commonConfig, data }
  })
  return (result as any) as NewAlbum
}

/**
 * 获取专辑详情
 * @param albummid 专辑mid
 */
export const GET_ALBUM = async (albummid: string) => {
  const result = await instance.get('getAlbumInfo', { params: { albummid } })
  return (result as any) as AlbumInfo
}
