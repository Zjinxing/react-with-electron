import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext, State } from 'Store'
import './index.scss'

const Sider: React.FC = () => {
  const { isDarkMode } = useContext(AppContext) as State

  return (
    <>
      <div className="avatar">
        <img src={require('resources/default_user.png')} width="50" alt="" />
        <span>登录QQ音乐</span>
        <span>让生活充满音乐</span>
      </div>
      <ul>
        音乐馆
        <li>
          <NavLink exact activeClassName="active" to="/">
            <img
              src={require(`resources/home_recommend${isDarkMode ? '_hl' : ''}.png`)}
              width="20"
              alt=""
            />
            <span>精选</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/ranking">
            <img
              src={require(`resources/home_ranking${isDarkMode ? '_hl' : ''}.png`)}
              width="20"
              alt=""
            />
            <span>排行</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/songList">
            <img
              src={require(`resources/home_choiceness${isDarkMode ? '_hl' : ''}.png`)}
              width="20"
              alt=""
            />
            <span>歌单</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/radio">
            <img
              src={require(`resources/home_radio${isDarkMode ? '_hl' : ''}.png`)}
              width="20"
              alt=""
            />
            <span>电台</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/mv">
            <img
              src={require(`resources/home_mv${isDarkMode ? '_hl' : ''}.png`)}
              width="20"
              alt=""
            />
            <span>MV</span>
          </NavLink>
        </li>
      </ul>
      <ul>
        我的音乐
        <li>
          <NavLink activeClassName="active" to="/favor">
            <img
              src={require(`resources/home_love${isDarkMode ? '_hl' : ''}.png`)}
              width="20"
              alt=""
            />{' '}
            <span>我喜欢</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/local">
            <img
              src={require(`resources/home_localsong${isDarkMode ? '_hl' : ''}.png`)}
              width="20"
              alt=""
            />
            <span>本地歌曲</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/download">
            <img
              src={require(`resources/home_download${isDarkMode ? '_hl' : ''}.png`)}
              width="20"
              alt=""
            />
            <span>下载歌曲</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/history">
            <img
              src={require(`resources/home_recentPlay${isDarkMode ? '_hl' : ''}.png`)}
              width="20"
              alt=""
            />
            <span>播放历史</span>
          </NavLink>
        </li>
      </ul>
    </>
  )
}

export default Sider
