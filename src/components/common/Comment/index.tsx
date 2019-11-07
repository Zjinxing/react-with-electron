import React, { ReactNode } from 'react'
import { CommentDetail } from 'request/types/Comments'

interface Props {
  comment: CommentDetail
  children?: ReactNode
}

const Comment: React.FC<Props> = props => {
  return <div className="comment-wrapper">单条评论</div>
}

export default Comment
