import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      这里是中间内容部分
      <Footer />
    </div>
  );
};

export default App;
