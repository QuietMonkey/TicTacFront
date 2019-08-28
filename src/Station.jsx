import React from 'react'

const Station = ({name, handleClick}) => {
    return(
        <h3 className='station' onClick={handleClick}>{name}</h3>
    )
}

export default Station