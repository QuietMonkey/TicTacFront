import React from 'react'
import Station from './Station'

const Stations = ({data, handleClick}) => {
    return(
        data.map((station)=> <Station name={station.unique_name} handleClick={handleClick}/>)

    )
}

export default Stations