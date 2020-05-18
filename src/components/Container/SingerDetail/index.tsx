import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { GET_SINGER_DESC } from 'request/Singer'
import MyButton from 'components/common/MyButton'
import './index.scss'

const SingerDetail: React.FC<RouteComponentProps> = props => {
  const [singerDesc, setSingerDesc] = useState('')
  const [singerPic, setSingerPic] = useState('')
  const [singerName, setSingerName] = useState('')
  const [basicInfo, setBasicInfo] = useState([{ key: '', value: '' }])
  let basicInfoEl
  useEffect(() => {
    ;(async () => {
      const { singermid, singerPic } = props.location.state as {
        singermid: string
        singerPic: string
      }
      const singerDesc = await GET_SINGER_DESC(singermid)
      const name = singerDesc.result.data.info.desc.split('，')[0]
      console.log('........', singerDesc)
      setSingerDesc(singerDesc.result.data.info.desc)
      setSingerPic(singerPic)
      setSingerName(name.split('（')[0])
      setBasicInfo(singerDesc.result.data.info.basic.item)
    })()
  }, [])
  console.log('asssaddfasfds')
  const CN_ARRAY = ['中国', '新加坡', '马来西亚']
  const citizenship = basicInfo.find(item => item.key === '国籍') || { value: '' }
  const cnSinger = basicInfo.find(item => item.key === '国籍' && CN_ARRAY.includes(item.value))
  const foreignName = basicInfo.find(item => item.key === '外文名') || { value: '' }
  const birthPlace = basicInfo.find(item => item.key === '出生地') || { value: '' }
  const cnName = basicInfo.find(item => item.key === '中文名') || { value: '' }
  if (cnSinger && foreignName) {
    basicInfoEl = (
      <ul className="singerBasic">
        <li>外文名：{foreignName.value}</li>
        <li>国籍：{citizenship.value}</li>
        <li>出生地：{birthPlace.value}</li>
      </ul>
    )
  } else {
    basicInfoEl = (
      <ul className="singerBasic">
        <li>中文名：{cnName.value}</li>
        <li>国籍：{citizenship.value}</li>
        <li>出生地：{birthPlace.value}</li>
      </ul>
    )
  }
  return (
    <div className="singer-detail">
      <div className="singer-detail--header">
        <img
          src={singerPic}
          alt=""
          width="150"
          height="150"
          className="singer-detail--header__cover"
        />
        <div className="singer-detail--header__content">
          <h2>{singerName}</h2>
          {basicInfoEl}
          <pre dangerouslySetInnerHTML={{ __html: singerDesc.replace(/\\n/g, '<br />') }}></pre>
          <span className="showMore">[展开]</span>
          <div className="control-btns">
            <MyButton type="primary">
              <img src={require('resources/cellPlay_hover@2x.png')} width="16" alt="" />
              播放歌手电台
            </MyButton>
            <MyButton>+ 加关注</MyButton>
            <MyButton>
              <img src={require('resources/pop_share_hl@2x.png')} width="14" alt="" /> &nbsp; 分享
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingerDetail
