export interface MiddleComment {
  album_mid: string
  album_pmid: string
  albumid: number
  encrypt_replyediun: string
  encrypt_replyuin: string
  reply_identity_pic: string
  reply_identity_type: string
  replyed_identity_pic: string
  replyed_identity_type: string
  replyednick: string
  replyeduin: string
  replynick: string
  replyuin: string
  singerid: number
  singerids: number
  singername: string
  songid: number
  songname: string
  songtype: number
  subcommentcontent: string
  subcommentid: string
}

export interface CommentDetail {
  album_mid: string
  album_pmid: string
  albumid: number
  avatarurl: string
  commentid: string
  commit_state: number
  enable_delete: number
  encrypt_rootcommentuin: string
  encrypt_uin: string
  identity_pic: string
  identity_type: number
  is_hot: number
  is_hot_cmt: number
  is_medal: number
  is_stick: number
  ispraise: number
  middlecommentcontent: MiddleComment[] | null
  nick: string
  permission: number
  praisenum: number
  root_enable_delete: number
  root_identity_pic: string
  root_identity_type: number
  root_is_stick: number
  rootcommentcontent: string
  rootcommentid: string
  rootcommentnick: string
  rootcommentuin: string
  score: number
  singerid: number
  singerids: string
  singername: string
  songid: number
  songname: string
  songtype: number
  taoge_topic: string
  taoge_url: string
  time: number
  uin: string
  user_type: string
  vipicon: string
}

export interface SongListComments {
  allow_comment: number
  allow_song: number
  auth: number
  blackuin: number
  code: number
  comment: {
    commentlist: CommentDetail[] | null
    commenttotal: number
  }
  comment_tip: string
  hot_comment: {
    commentlist: CommentDetail[] | null
    commenttotal: number
  }
  lastscore: number
  morecomment: number
  msg_comment: {
    commentlist: CommentDetail[] | null
    commenttotal: number
  }
  no_copyright: number
  showYuerenTip: number
  subcode: number
  superadmin: number
  taoge_topic: string
  topic_name: string
  topid: string
}
