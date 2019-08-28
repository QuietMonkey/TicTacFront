import React from 'react'
import Station from './Station'

const Stations = ({data, handleClick}) => {

    const renderStations = () => data.map((station)=> <Station name={station.unique_name} handleClick={handleClick}/>)

    return(
        <div className = 'stations'>
            {renderStations()}
        </div>
    )
}

export default Stations