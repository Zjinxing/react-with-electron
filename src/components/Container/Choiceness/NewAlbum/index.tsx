// 专辑首发
import React, { useState, useContext } from 'react'
import { AlbumTag, AlbumDetail } from 'request/types/Recommend'
import AlbumCover from 'components/common/AlbumCover'
import { AppContext, State } from 'Store'
import { Area } from 'request/Album'
import './index.scss'

interface Props {
  albumTags: AlbumTag[]
  albums: AlbumDetail[]
  toggleAlbumArea: (id: Area) => Promise<void>
}

const NewAlubm: React.FC<Props> = props => {
  const { albumArea } = useContext(AppContext) as State
  const [position, setPosition] = useState('album-page0')
  const toggleAlbumArea = async (id: Area) => {
    props.toggleAlbumArea(id)
  }

  const slideLeft = () => {
    console.log('向左滑动')
    switch (position) {
      case 'album-page3':
        setPosition('album-page2')
        break
      case 'album-page2':
        setPosition('album-page1')
        break
      case 'album-page1':
        setPosition('album-page0')
        break
      case 'album-page0':
        break
      default:
    }
  }
  const slideRight = () => {
    console.log('向右滑动')
    switch (position) {
      case 'album-page0':
        setPosition('album-page1')
        break
      case 'album-page1':
        setPosition('album-page2')
        break
      case 'album-page2':
        setPosition('album-page3')
        break
      case 'album-page3':
        break
      default:
    }
  }
  return (
    <div className="new-album">
      <div className="new-album-header">
        <h4 className="new-album-header__title">专辑首发</h4>
        <ul className="new-album-header__tags">
          {props.albumTags.map(item => (
            <li
              className={`new-album-header__tag ${item.id === albumArea ? 'current-tag' : ''}`}
              key={item.id}
              onClick={() => toggleAlbumArea(item.id as Area)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <span className="new-album-header__control">
          <span className="new-album-header__control--slide-left" onClick={slideLeft}></span>
          <span className="new-album-header__control--slide-right" onClick={slideRight}></span>
        </span>
      </div>
      <div className="new-album-content">
        <ul className={`new-album-content__list ${position}`}>
          {props.albums.map(item => (
            <AlbumCover albumInfo={item} key={item.id}></AlbumCover>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NewAlubm
