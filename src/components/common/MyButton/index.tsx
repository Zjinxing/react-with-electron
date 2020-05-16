import React, { ReactNode, useContext } from 'react'
import './index.scss'

interface Props {
  children?: ReactNode
  type?: 'primary'
  ghost?: boolean
  onClick?: () => any
}

const MyButton: React.FC<Props> = (props) => {
  return (
    <button
      className={`mybutton ${props.type} ${props.ghost ? 'ghost' : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default MyButton
