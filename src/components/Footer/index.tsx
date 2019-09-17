import React, { useContext } from 'react';
import { AppContext, State } from '../../Store/index';
import './index.scss';
const Footer: React.FC = () => {
  const { isDarkMode } = useContext(AppContext) as State;

  return (
    <div className={`footer ${isDarkMode ? 'dark' : ''}`}>
      And this is footer
    </div>
  );
};

export default Footer;
