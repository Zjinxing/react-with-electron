import { AlbumInfo } from './types/Album'
import instance from './Http'

export const GET_ALBUM = async (albummid: string) => {
  const result = await instance.get('getAlbumInfo', { params: { albummid } })
  return (result as any) as AlbumInfo
}
