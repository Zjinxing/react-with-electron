import React from 'react'
import MyButton from '../MyButton'
import './index.scss'

interface Tag {
  id: number
  name: string
  pid: number
}

export interface Description {
  cover: string
  name: string
  creator: string
  createdAt: string
  desc: string
  tags: Tag[]
}

export interface Props {
  description: Description
  tagClick?: (tag: Tag) => void
  playAll: () => void
}

const SongDesc: React.FC<Props> = props => {
  const tagClick = (tag: Tag) => {
    props.tagClick && props.tagClick(tag)
  }

  const playAll = () => {
    props.playAll()
  }

  return (
    <div className="song-desc">
      <img
        src={props.description.cover}
        alt={props.description.name}
        width="150"
        className="cover"
      />
      <div className="songlist-info">
        <h2 className="songlist-info-title">{props.description.name}</h2>
        <div className="songlist-info-summary">
          <span className="creator-creator">{props.description.creator}</span>
          <span className="songlist-info-summary--createtime">
            {props.description.createdAt}创建
          </span>
          <ul className="songlist-info-summary--tags">
            {props.description.tags.map(tag => (
              <li key={tag.id} onClick={() => tagClick(tag)}>
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
        <p className="songlist-info-desc">
          <span>{props.description.desc.replace(/(&nbsp;)|(&#160;)/g, ' ')}</span>
          <span className="unfold">[展开]</span>
        </p>
        <div className="songlist-info-control">
          <MyButton type="primary" onClick={playAll}>
            <img src={require('resources/cellPlay_hover@2x.png')} width="16" alt="" />
            播放全部
          </MyButton>
          <MyButton>
            &nbsp;
            <img src={require('resources/cellLoveUnselected_hl@2x.png')} width="16" alt="" />
            收藏 &nbsp;
          </MyButton>
          <MyButton>
            <img src={require('resources/batch_hl.png')} width="16" alt="" />
            批量操作
          </MyButton>
          <MyButton>
            <img src={require('resources/cellDownload_hl@2x.png')} width="18" alt="" />
            下载全部
          </MyButton>
          <MyButton>
            &nbsp;
            <img src={require('resources/pop_share_hl@2x.png')} width="14" alt="" />
            &nbsp; 分享 &nbsp;
          </MyButton>
        </div>
      </div>
    </div>
  )
}

export default SongDesc
