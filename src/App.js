import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='card left'>
          <h2>Quel est votre trajet?</h2>

          <input className='inputSearch fromStation'></input>
          <input className='inputSearch toStation'></input>
          <input className='inputSearch dateBegin'></input>
          <input className='inputSearch dateEnd'></input>
        </div>
        <div className='card right'>

        </div>
      </div>
    );
  }
}

export default App;
