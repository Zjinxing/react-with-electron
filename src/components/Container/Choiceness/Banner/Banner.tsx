import React, { ReactNode, useState } from 'react'
import './banner.scss'
import { FocusContent } from 'request/types/Recommend'

type Props = {
  focusContent: Array<FocusContent> | undefined
  children?: ReactNode
}

const Banner: React.FC<Props> = props => {
  const classNames = ['prev', 'next', 'back', 'current']
  const [prev, setPrev] = useState(classNames[0])
  const [next, setNext] = useState(classNames[1])
  const [back, setBack] = useState(classNames[2])
  const [current, setCurrent] = useState(classNames[3])
  const [currentIndex, setCurrentIndex] = useState(0)

  const { focusContent } = props
  let prevUrl = focusContent ? focusContent[focusContent.length - 1].pic_info.url : ''
  let nextUrl = focusContent ? focusContent[1].pic_info.url : ''
  let backUrl = focusContent ? focusContent[2].pic_info.url : ''
  let currentUrl = focusContent ? focusContent[0].pic_info.url : ''

  const getCurrentIndex = () => {
    setTimeout(() => {
      const currentImg = document.querySelector('.current img') as HTMLImageElement
      const { src } = currentImg
      const currentIndex = focusContent
        ? focusContent.findIndex(item => item.pic_info.url === src)
        : 0
      setCurrentIndex(currentIndex)
    }, 0)
  }

  const moveLeft = () => {
    const prevImg = document.querySelector('.prev img') as HTMLImageElement
    const backImg = document.querySelector('.back img') as HTMLImageElement
    const index = focusContent
      ? focusContent.findIndex(item => item.pic_info.url === prevImg.src)
      : 0
    const length = focusContent ? focusContent.length : 0
    const prevIndex = index - 1 < 0 ? length - 1 : index - 1
    backImg.src = focusContent ? focusContent[prevIndex].pic_info.url : ''
    switch (current) {
      case 'current':
        setPrev('current')
        setCurrent('next')
        setBack('prev')
        setNext('back')
        break
      case 'next':
        setPrev('next')
        setCurrent('back')
        setBack('current')
        setNext('prev')
        break
      case 'back':
        setPrev('back')
        setCurrent('prev')
        setBack('next')
        setNext('current')
        break
      case 'prev':
        setPrev('prev')
        setCurrent('current')
        setBack('back')
        setNext('next')
        break
      default:
        break
    }
    getCurrentIndex()
  }
  const moveRight = () => {
    const backImg = document.querySelector('.back img') as HTMLImageElement
    const nextImg = document.querySelector('.next img') as HTMLImageElement
    const index = focusContent
      ? focusContent.findIndex(item => item.pic_info.url === nextImg.src)
      : 0
    const length = focusContent ? focusContent.length : 0
    const nextBackUrl = index + 1 >= length ? 0 : index + 1
    backImg.src = focusContent ? focusContent[nextBackUrl].pic_info.url : ''
    switch (prev) {
      case 'prev':
        setPrev('back')
        setNext('current')
        setBack('next')
        setCurrent('prev')
        break
      case 'back':
        setPrev('next')
        setNext('prev')
        setBack('current')
        setCurrent('back')
        break
      case 'next':
        setPrev('current')
        setNext('back')
        setBack('prev')
        setCurrent('next')
        break
      case 'current':
        setPrev('prev')
        setNext('next')
        setBack('back')
        setCurrent('current')
        break
      default:
        break
    }
    getCurrentIndex()
  }
  const dotPosition = focusContent
    ? focusContent.map((item, index) => {
        const active = index === currentIndex ? 'active' : ''
        return <span key={index} className={`dot ${active}`}></span>
      })
    : null

  return (
    <div className="banner-wrapper">
      <ul>
        <li className={prev}>
          <img src={prevUrl} width="100%" alt="" />
        </li>
        <li className={back}>
          <img src={backUrl} width="100%" alt="" />
        </li>
        <li className={next}>
          <img src={nextUrl} width="100%" alt="" />
        </li>
        <li className={current}>
          <img src={currentUrl} width="100%" alt="" />
        </li>
      </ul>
      <span onClick={moveLeft} className="control left"></span>
      <span onClick={moveRight} className="control right"></span>
      <div className="dot-wrapper">{dotPosition}</div>
    </div>
  )
}

export default Banner
