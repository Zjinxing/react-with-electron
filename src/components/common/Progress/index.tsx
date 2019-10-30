import React, { ReactNode } from 'react'
import './index.scss'

interface Props {
  width: number
  children?: ReactNode
}

const Progress: React.FC<Props> = props => {
  return (
    <div className="progress-wrapper">
      <div className="progress-background"></div>
      <div style={{ width: `${props.width}%` }} className="progress-cover"></div>
      <div style={{ left: `${props.width}%` }} className="progress-truck"></div>
    </div>
  )
}

export default Progress
