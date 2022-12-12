import React, { useState, useEffect } from 'react';
import { useGeolocated } from "react-geolocated";

const SearchByCoords = (props) => {

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

  const [lat, setLat] = useState(''); //40.1866752
  const [long, setLong] = useState(''); //44.5251584
  const [error, setError] = useState('');
  
  useEffect(() => {
    if ( isGeolocationAvailable && isGeolocationEnabled && coords) {
      
      setLat(coords.latitude);
      setLong(coords.longitude);

      const fetchDataByCoords = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          props.getWeatherFullInfo(result);
        }); 
      }
      fetchDataByCoords();

      setError('');
    } else {
      setError("Your browser does not support Geolocation or Geolocation is not enabled");
    }
  }, [coords, lat, long, isGeolocationAvailable, isGeolocationEnabled, props]);
      
  return (!isGeolocationAvailable || !isGeolocationEnabled) && (
    <div>{error}</div>
  );
}

export default SearchByCoords;