export interface HotSinger {
  country: string
  singer_id: number
  singer_mid: string
  singer_name: string
  singer_pic: string
}

export interface SingerArea {
  id: number
  name: string
}

export interface HotSingerRes {
  code: number
  ts: number
  singerList: {
    code: number
    data: {
      area: number
      genre: number
      index: number
      sex: number
      singerlist: HotSinger[]
      tags: {
        area: SingerArea[]
        genre: { id: number; name: string }[]
        index: { id: number; name: string }[]
        sex: { id: number; name: string }[]
      }
      total: number
    }
  }
}
