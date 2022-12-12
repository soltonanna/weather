import React, { useState, useEffect } from 'react';

const SearchByCoords = (props) => {

    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [error, setError] = useState('');

    const [isError, setIsError] = useState(false);
   
    useEffect(() => {
      
      if ( Object.keys(navigator.geolocation).length !== 0 ) {

        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });

        const fetchDataByCoords = async () => {
          await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
          .then(res => res.json())
          .then(result => {
            props.getWeatherFullInfo(result);
          }); 
        }
        
        fetchDataByCoords();
        setIsError(false);
        
      } else {
        setIsError(true);
        setError("Geolocation is not supported by this browser. Try search by location name!!");
      }

    }, [lat,long, isError])

    
    
    return (
      <>
        { //isError && <h1>{error}</h1>
        }
      </>
    )
}

export default SearchByCoords;