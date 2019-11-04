import React, { ReactNode, useContext } from 'react'
import { AppContext, State } from 'Store'
import './index.scss'

interface Props {
  type?: 'primary'
  ghost?: boolean
  children: ReactNode
}

const MyButton: React.FC<Props> = props => {
  const { isDarkMode } = useContext(AppContext) as State

  return (
    <button
      className={`mybutton ${props.type} ${isDarkMode ? 'dark-btn' : ''} ${
        props.ghost ? 'ghost' : ''
      }`}
    >
      {props.children}
    </button>
  )
}

export default MyButton
