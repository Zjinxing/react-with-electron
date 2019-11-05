import React, { ReactNode, useContext } from 'react'
import { AppContext, State } from 'Store'
import './index.scss'

interface Props {
  children?: ReactNode
  type?: 'primary'
  ghost?: boolean
  onClick?: () => any
}

const MyButton: React.FC<Props> = props => {
  const { isDarkMode } = useContext(AppContext) as State

  return (
    <button
      className={`mybutton ${props.type} ${isDarkMode ? 'dark-btn' : ''} ${
        props.ghost ? 'ghost' : ''
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default MyButton
