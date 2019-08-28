import React, { Component } from 'react'
import axios from 'axios'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import './App.css'
import Stations from './Stations';
import Navbar from './Navbar';
import Welcome from './Welcome';

class App extends Component {
  state = {
    data: [],
    lastFocus: 'from',
    dateBegin: new Date(),
    dateEnd: '',
  };

  componentDidMount(){
    this.setState({dateEnd: new Date(this.state.dateBegin.getFullYear(), this.state.dateBegin.getMonth(), this.state.dateBegin.getDate() + 7).toDateString()})
  }

  beginSearch = () =>{
    const welcome = document.querySelector('.welcome')
    const destinations = document.querySelector('.destinations')
    const rightCard = document.querySelector('.right')
    rightCard.style.background = 'white'
    destinations.style.display = 'block'
    welcome.style.display = 'none'
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

  getPopularFrom = () => {
    const fromStation = document.querySelector('.fromStation')
    axios.get(`https://api.comparatrip.eu/cities/popular/from/${fromStation.value}/7`)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleSearch = (e) => {
    axios.get(`https://api.comparatrip.eu/cities/autocomplete/?q=${e.target.value}/7`)
      .then((response) => {
        console.log(response)
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleFocusFrom = () => {
    document.querySelector('.calendar').style.display = 'none'
    this.getPopular()
    this.setState({ lastFocus: 'from' })
    this.beginSearch()
  }

  handleFocusTo = () => {
    document.querySelector('.calendar').style.display = 'none'
    const fromStation = document.querySelector('.fromStation')
    this.setState({ lastFocus: 'to' })
    fromStation.value === '' ? this.getPopular() : this.getPopularFrom()
    this.beginSearch()

  }

  handleClickStation = (e) => {
    const fromStation = document.querySelector('.fromStation')
    const toStation = document.querySelector('.toStation')

    if (this.state.lastFocus === 'from') {
      fromStation.value = e.target.innerHTML
      fromStation.style.opacity = 1
      toStation.focus()
    } else {
      toStation.value = e.target.innerHTML
      toStation.style.opacity = 1
      this.setState({data: []})
      document.querySelector('.dateBegin').focus()
    }
  }

  openCalendarBegin = () => {
    document.querySelector('.welcome').style.display = 'none'
    document.querySelector('.destinations').style.display = 'none'
    document.querySelector('.calendar').style.display = 'block'
    this.setState({ calendar : 'begin'})
  }

  openCalendarEnd = () => {
    document.querySelector('.welcome').style.display = 'none'
    document.querySelector('.destinations').style.display = 'none'
    document.querySelector('.calendar').style.display = 'block'
    this.setState({ calendar : 'end'})
  }

  onChange = date => this.setState({ date })

  handleClickDate = (e) => {
    if(this.state.calendar === 'begin'){
      this.setState({dateBegin : e})
      document.querySelector('.dateEnd').focus()
    } else {
      this.setState({dateEnd : e.toDateString()})
      document.querySelector('.passenger').focus()
      document.querySelector('.calendar').style.display = 'none'
    }
  }



  render() {
    return (

      <div className="App">
        <Navbar />
        <div className='content'>
          <div className='head'>
            <h1>Réservez vos billets de téléportation et de pédalo. <br />En France et en Europe</h1>
            <h2>Voyagez avec Brainline, leader indépendant de la téléportation en Europe (mais aussi de pédalo).</h2>
          </div>

          <div className='cards'>
            <div className='card left'>
              <h2 className='searchTitle'>Quel est votre trajet ?</h2>

              <input className='inputSearch fromStation' defaultValue='' onFocus={this.handleFocusFrom} onChange={this.handleSearch}></input>
              <input className='inputSearch toStation' onFocus={this.handleFocusTo} onChange={this.handleSearch}></input>
              <input className='inputSearch dateBegin' onFocus={this.openCalendarBegin} value={this.state.dateBegin.toDateString()} ></input>
              <input className='inputSearch dateEnd' onFocus={this.openCalendarEnd} value={this.state.dateEnd}></input>
              <input className='inputSearch passenger' defaultValue='Klingon'></input>
            </div>

            <div className='card right'>

              <Welcome />

              <div className='destinations'>
                <h2 className='searchTitle'>Choisissez une gare {this.state.lastFocus === 'from' ? 'de départ' : "d'arivée"}</h2>

                <Stations data={this.state.data} handleClick={this.handleClickStation} />
              </div>

              <div className='calendar'>
                <InfiniteCalendar
                    width={'100%'}
                    height={200}
                    selected={this.state.date}
                    disabledDays={[0,6]}
                    onSelect={this.handleClickDate}
                  />
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
