import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Container />
      <Footer />
    </div>
  );
};

export default App;
