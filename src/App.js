import React, { useEffect, useState } from "react";

import { useGeolocated } from "react-geolocated";
import { timeFormat } from "./utils/timeFormat";
import DateBlock from "./component/DateBlock";

import Video from "./component/UI/Video/Video";
import { Rain, Snow, Lightning, Sun, Wind, Clouds, Mist } from "./utils/videos";

import SearchByCity from "./component/SearchByCity";
import WeatherBlock from "./component/WeatherBlock";


function Weather() {

  const [videoSrc, setVideoSrc] = useState(Rain);
 
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

  const [weatherInfo, setWeatherInfo] = useState({
    location: 'Not Found', 
    icon: '', 
    temp: 0, 
    description: 'Not Found', 
    windSpeed: 0, 
    humidity: 0, 
    sunrise: 0, 
    sunset: 0
  });

  useEffect(() => {
    if ( isGeolocationAvailable && isGeolocationEnabled && coords) {
      setLat(coords.latitude);
      setLong(coords.longitude);
      fetchDataByCoords(lat, long);
      setError('');
    } else {
      setError("Your browser does not support Geolocation or Geolocation is not enabled");
    }
  }, [coords, lat, long, isGeolocationAvailable, isGeolocationEnabled]);

  /** Check videos SRC by weather */
  const getWeatherArr = weatherInfo.description.split(' ');
  useEffect(()=> {
    if ( getWeatherArr.includes("rain") ) {
      setVideoSrc(Rain);
    } else if ( getWeatherArr.includes("snow") ) {
      setVideoSrc(Snow);
    } else if ( getWeatherArr.includes("sun") || getWeatherArr.includes("sky") ) {
      setVideoSrc(Sun);
    } else if ( getWeatherArr.includes("wind") ) {
      setVideoSrc(Wind);
    } else if ( getWeatherArr.includes("mist") || getWeatherArr.includes("smoke") || getWeatherArr.includes("haze")) {
      setVideoSrc(Mist);
    } else if ( getWeatherArr.includes("clouds") ) {
      setVideoSrc(Clouds);
    } else if ( getWeatherArr.includes("lightning") ) {
      setVideoSrc(Lightning);
    }
  },[getWeatherArr]);
  
  /** Get weather information based on current coordinates */
  const fetchDataByCoords = async (lat,long) => {
    await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      setWeatherInfo({
        location: result.name, 
        icon: result.weather[0].icon, 
        temp: Math.ceil(result.main.temp), 
        description: result.weather[0].description, 
        windSpeed: Math.ceil(result.wind.speed), 
        humidity: result.main.humidity, 
        sunrise: timeFormat(result.sys.sunrise), 
        sunset: timeFormat(result.sys.sunset)
      });
    }); 
  }

  /** Get weather information based on searched location */
  const fetchDataByLocation = async (location) => {
    await fetch(`${process.env.REACT_APP_API_URL}/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      if ( result.cod !== '404') {
        setError('');
        setWeatherInfo({
          location: result.name, 
          icon: result.weather[0].icon, 
          temp: Math.ceil(result.main.temp), 
          description: result.weather[0].description, 
          windSpeed: Math.ceil(result.wind.speed), 
          humidity: result.main.humidity, 
          sunrise: timeFormat(result.sys.sunrise), 
          sunset: timeFormat(result.sys.sunset)
        });
      } else {
        setError('Location not found');
      }
    })
  }

  /* Work only after click on 'Find' button */
  const getWeatherHandler = ( searchedLocation ) => {
    if ( searchedLocation ) {
      fetchDataByLocation(searchedLocation)
    } else {
      fetchDataByCoords(lat, long)
    }
  }

  return (
    <>
      <Video autoPlay muted loop src={videoSrc} />
      
      <div className="weather">

        <div className="left">
          <SearchByCity getSearchedLocation={getWeatherHandler} />
          
          <div>
            
            <h1>{ !error ? weatherInfo.location : "Not Found" }</h1>
            <h2>{ !error ? weatherInfo.temp : '?' }°C</h2>
          </div>

          <DateBlock />
        </div>

        <div className="right">
          {
            error 
            ? <h1>We have some problem: {error}</h1>
            :
            <WeatherBlock 
              location={weatherInfo.location}
              icon={weatherInfo.icon}
              temp={weatherInfo.temp}
              description={weatherInfo.description}
              windSpeed={weatherInfo.windSpeed}
              humidity={weatherInfo.humidity}
              sunrise={weatherInfo.sunrise}
              sunset={weatherInfo.sunset}
            />
          }
          <div className="copyright">Used free versions of videos with watermarks from <a href="https://coverr.co/" target="_blank" rel="noreferrer">
          Coverr</a> site.</div>
        </div>
      </div>
    </> 
  );
}

export default Weather;
