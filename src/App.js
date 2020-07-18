import React from 'react';
import './App.css';
import './utils/polyfills';
import NewsHomePage from './components/NewsHomePage/NewsHomePage';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <NewsHomePage />
      </div>
    );
  }
}

export default App;
