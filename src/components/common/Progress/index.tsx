import React, { ReactNode, MouseEvent, useState, useRef } from 'react'
import './index.scss'

interface Props {
  width: number
  children?: ReactNode
  onProgressChange?: (targetInfo: targetInfo, pos: MousePos) => void
  onProgressChanged?: () => void
}

export interface targetInfo {
  width: number
  height: number
  top: number
  left: number
}

export interface MousePos {
  pageX: number
  pageY: number
}

const Progress: React.FC<Props> = props => {
  // const [width, setWidth] = useState<number>()
  // const [height, setHeight] = useState<number>()
  // const [left, setLeft] = useState<number>()
  // const [top, setTop] = useState<number>()
  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    document.removeEventListener('mouseup', removeListener)
    const { pageX, pageY } = event
    const target = event.target as HTMLElement
    const [rect] = target.getClientRects() as DOMRectList
    const { left, top, width, height } = rect
    const targetInfo = { width, height, left, top }
    console.log(targetInfo)
    localStorage.setItem('targetInfo', JSON.stringify(targetInfo))
    // TODO: 不知为何，使用useState在mouseMove中得到的是 null ？
    // setWidth(width)
    // setHeight(height)
    // setTop(top)
    // setLeft(left)
    // console.log(width)
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', removeListener)
  }

  const removeListener = () => {
    localStorage.removeItem('targetInfo')
    document.removeEventListener('mousemove', mouseMove)
  }

  const mouseMove = (e: Event) => {
    const targetInfo = JSON.parse(localStorage.getItem('targetInfo') || '{}') as targetInfo
    const { top, height } = targetInfo
    const { pageX, pageY } = (e as unknown) as MouseEvent
    console.log({ pageX, pageY })
    const pos = { pageX, pageY }
    if (height && top) {
      props.onProgressChange && props.onProgressChange(targetInfo, pos)
    }
  }

  return (
    <div className="progress-wrapper">
      <div className="progress-background"></div>
      <div style={{ width: `${props.width}%` }} className="progress-cover"></div>
      <div onMouseDown={handleMouseDown} className="progress-drag"></div>
      <div style={{ left: `${props.width}%` }} className="progress-truck"></div>
    </div>
  )
}

export default Progress
