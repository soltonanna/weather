import React, { useEffect, useState } from "react";

import { timeFormat } from "./utils/timeFormat";
import DateBlock from "./component/DateBlock";

import Video from "./component/UI/Video/Video";
import { Rain, Snow, Lightning, Sun, Wind, Clouds, Mist } from "./utils/videos";

import SearchByCoords from "./component/SearchByCoords";
import SearchByCity from "./component/SearchByCity";
import WeatherBlock from "./component/WeatherBlock";


function Weather() {

  const [videoSrc, setVideoSrc] = useState(Rain);

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

  const weatherFullInfoHandler = (data) => {
    
    setWeatherInfo({
      location: data.name, 
      icon: data.weather[0].icon, 
      temp: Math.ceil(data.main.temp), 
      description: data.weather[0].description, 
      windSpeed: Math.ceil(data.wind.speed), 
      humidity: data.main.humidity, 
      sunrise: timeFormat(data.sys.sunrise), 
      sunset: timeFormat(data.sys.sunset)
    });
    
  }

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
    } else if ( getWeatherArr.includes("mist") ) {
      setVideoSrc(Mist);
    } else if ( getWeatherArr.includes("clouds") ) {
      setVideoSrc(Clouds);
    } else if ( getWeatherArr.includes("lightning") ) {
      setVideoSrc(Lightning);
    }
  },[getWeatherArr])
  

  return (
    <>
      <Video autoPlay muted loop src={videoSrc} />
      
      <div className="weather">

        <div className="left">
          <SearchByCity getWeatherFullInfo={weatherFullInfoHandler} />
          
          <div>
            <h1>{weatherInfo.location}</h1>
            <h2>{weatherInfo.temp}°C</h2>
          </div>

          <DateBlock />
        </div>

        <div className="right">
          <SearchByCoords getWeatherFullInfo={weatherFullInfoHandler}/>

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
        </div>
      </div>
    </> 
  );
}

export default Weather;
