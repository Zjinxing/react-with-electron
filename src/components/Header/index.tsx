import React, { useContext } from 'react'
import { AppContext, State } from 'Store/index'
import './index.scss'
import EqInput from './EqInput'
import { ipcRenderer } from 'electron'

const Header: React.FC = () => {
  const { isDarkMode } = useContext(AppContext) as State

  const doubleClick = () => {
    console.log('dbClick')
    ipcRenderer.send('maximize')
  }
  return (
    <div className={`header-bar ${isDarkMode ? 'dark' : ''} test`} onDoubleClick={doubleClick}>
      <div className="header__left">
        <div className="header__left-navbar">
          <i className="iconfont icon-back"></i>
          <i className="iconfont icon-forward"></i>
          <i className="iconfont icon-refresh"></i>
        </div>
        <EqInput />
      </div>
      <div className="header__left"></div>
    </div>
  )
}

export default Header
