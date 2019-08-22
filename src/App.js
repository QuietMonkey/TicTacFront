import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Station from './Station';

class App extends Component {
  state = {
    data:[]}

  getPopular = () => {
    axios.get('https://api.comparatrip.eu/cities/popular/7 ')
      .then((response) => {
        this.setState({data : response.data});
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount(){
    this.getPopular()
  }


  render() {
    console.log(this.state)
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
          <Station name='Paris'/>
        </div>
      </div>
    );
  }
}

export default App;
