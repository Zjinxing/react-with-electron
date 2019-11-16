// 专辑首发
import React from 'react'
import { AlbumTag, AlbumDetail } from 'request/types/Recommend'
import AlbumCover from 'components/common/AlbumCover'
import './index.scss'

interface Props {
  albumTags: AlbumTag[]
  albums: AlbumDetail[]
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
      <div className="new-album-content">
        <ul className="new-album-content__list">
          {props.albums.map(item => (
            <AlbumCover albumInfo={item} key={item.id}></AlbumCover>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NewAlubm
