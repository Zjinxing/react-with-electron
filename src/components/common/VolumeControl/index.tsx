import React, { ReactNode, useState } from 'react'
import Progress, { targetInfo, MousePos } from '../Progress'
import './index.scss'

interface Props {
  isDarkMode: boolean
  onVolumeChange: (percent: number) => void
  children?: ReactNode
}

// TODO: 缓存音量
const VolumeControl: React.FC<Props> = props => {
  const [percent, setPercent] = useState<number>(100)

  const onvolumechange = (targetInfo: targetInfo, pos: MousePos) => {
    const { top, height } = targetInfo
    const { pageX, pageY } = pos
    const compute = (1 - (pageY - top) / height) * 100
    const percent = compute >= 100 ? 100 : compute <= 0 ? 0 : compute
    setPercent(percent)
    props.onVolumeChange(percent)
  }

  return (
    <div className="volume-control">
      <div className="volume-control-bar">
        <Progress onProgressChange={onvolumechange} width={percent} />
      </div>
      <span className="volume-icon" style={{ overflow: 'hidden' }}>
        <img
          src={require(`resources/volume${props.isDarkMode ? '_hl' : ''}.png`)}
          className="volume-icon--normal"
          width="16"
          alt=""
        />
        <img
          src={require(`resources/volume_hover.png`)}
          className="volume-icon--hover"
          width="16"
          alt=""
        />
      </span>
    </div>
  )
}

export default VolumeControl
