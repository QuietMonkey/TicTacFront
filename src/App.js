import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Stations from './Stations';

class App extends Component {
  state = {
    data: [],
    lastFocus: ''
  }

  getPopular = () => {
    axios.get('https://api.comparatrip.eu/cities/popular/7 ')
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleSearch = (e) => {
    axios.get(`https://api.comparatrip.eu/cities/autocomplete/?q=${e.target.value}`)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleFocusFrom = () => {
    this.getPopular()
    this.setState({ lastFocus: 'from' })
  }

  handleFocusTo = () => {
    const fromStation = document.querySelector('.fromStation')
    this.setState({ lastFocus: 'to' })
    fromStation.value === '' ? this.getPopular() : this.getPopularFrom()

  }

  handleClickStation = (e) => {
    const fromStation = document.querySelector('.fromStation')
    const toStation = document.querySelector('.toStation')

    if (this.state.lastFocus === 'from') {
      fromStation.value = e.target.innerHTML
      toStation.focus()
    } else {
      toStation.value = e.target.innerHTML
      this.setState({data: []})
    }

  }

  getPopularFrom = () => {
    const fromStation = document.querySelector('.fromStation')
    axios.get(`https://api.comparatrip.eu/cities/popular/from/${fromStation.value}/5`)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (

      <div className="App">
        <div className='card left'>
          <h2>Quel est votre trajet?</h2>

          <input className='inputSearch fromStation' defaultValue='' onFocus={this.handleFocusFrom} onChange={this.handleSearch}></input>
          <input className='inputSearch toStation' onFocus={this.handleFocusTo} onChange={this.handleSearch}></input>
          <input className='inputSearch dateBegin'></input>
          <input className='inputSearch dateEnd'></input>
        </div>
        <div className='card right'>
          <Stations data={this.state.data} handleClick={this.handleClickStation} />
        </div>
      </div>
    );
  }
}

export default App;
