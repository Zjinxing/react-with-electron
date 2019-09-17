import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Sider: React.FC = () => {
  return (
    <div className="sider">
      <div className="avatar">
        <img
          src={require('../../../resources/default_user.png')}
          width="50"
          alt=""
        />
        <span>登录QQ音乐</span>
        <span>让生活充满音乐</span>
      </div>
      <ul>
        音乐馆
        <li>
          <i className="iconfont icon-choiceness"></i>
          <Link to="/">精选</Link>
        </li>
        <li>
          <i className="iconfont icon-rank"></i>
          <Link to="/ranking">排行</Link>
        </li>
        <li>
          <Link to="/songList">歌单</Link>
        </li>
        <li>
          <Link to="/radio">电台</Link>
        </li>
        <li>
          <Link to="/mv">MV</Link>
        </li>
      </ul>
      <ul>
        我的音乐
        <li>
          <Link to="/favor">我喜欢</Link>
        </li>
        <li>
          <Link to="/local">本地歌曲</Link>
        </li>
        <li>
          <Link to="/download">下载歌曲</Link>
        </li>
        <li>
          <Link to="/history">播放历史</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sider;
