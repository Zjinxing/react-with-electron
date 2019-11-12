// 专辑首发
import React from 'react'
import { AlbumTag } from 'request/types/Recommend'
import AlbumCover from 'components/common/AlbumCover'
import './index.scss'

interface Props {
  albumTags: AlbumTag[]
}

const NewAlubm: React.FC<Props> = props => {
  return (
    <div className="new-album">
      <div className="new-album-header">
        <h4 className="new-album-header__title">专辑首发</h4>
        <ul className="new-album-header__tags">
          {props.albumTags.map(item => (
            <li className={`new-album-header__tag `} key={item.tjreport}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <ul className="new-album-content"></ul>
    </div>
  )
}

export default NewAlubm
