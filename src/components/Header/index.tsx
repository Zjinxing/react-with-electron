import React, { useContext } from 'react'
import { ipcRenderer } from 'electron'
import { createBrowserHistory } from 'history'
import { AppContext, State } from 'Store/index'
import './index.scss'
import EqInput from './EqInput'

const Header: React.FC = () => {
  const { isDarkMode } = useContext(AppContext) as State
  const history = createBrowserHistory()

  const doubleClick = () => {
    console.log('dbClick')
    ipcRenderer.send('maximize')
  }

  const goBack = () => {
    history.goBack()
  }

  const goForward = () => {
    history.goForward()
  }

  const refresh = () => {
    console.log(history)
    history.go(0)
  }

  return (
    <div className={`header-bar ${isDarkMode ? 'dark' : ''} test`} onDoubleClick={doubleClick}>
      <div className="header__left">
        <div className="header__left-navbar">
          <i onClick={goBack} className="iconfont icon-back"></i>
          <i onClick={goForward} className="iconfont icon-forward"></i>
          <i onClick={refresh} className="iconfont icon-refresh"></i>
        </div>
        <EqInput />
      </div>
      <div className="header__left"></div>
    </div>
  )
}

export default Header
