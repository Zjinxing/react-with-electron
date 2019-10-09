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
    new_song: any
    playlist: any
    recomPlaylist: any
    toplist: any
    code: number
    ts: number
  }
}
