import React, { useContext, useEffect } from 'react'
import './index.scss'
import { AppContext, State } from '../../Store/index'

const Header: React.FC = () => {
  const { isDarkMode } = useContext(AppContext) as State
  return <div className={`header-bar ${isDarkMode ? 'dark' : ''}`}>这里header</div>
}

export default Header
