import React from 'react';
import './index.scss';
import { ipcRenderer } from 'electron';

const Header: React.FC = () => {
  return <div className="header-bar">这里header</div>;
};

export default Header;
