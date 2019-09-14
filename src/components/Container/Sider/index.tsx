import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.scss';

const Sider: React.FC = () => {
  return (
    <div className="sider">
      <div className="avatar">头像及登录</div>
      <ul>
        音乐馆
        <li>
          <Link to="/choiceness">精选</Link>
        </li>
        <li>
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
