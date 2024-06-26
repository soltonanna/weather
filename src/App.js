import React, { useEffect, useState, useCallback } from "react";
import { useWeatherBg } from "./hooks/useWeatherBg";

import { useGeolocated } from "react-geolocated";
import { timeFormat } from "./utils/timeFormat";

import DateBlock from "./component/DateBlock";
import SearchByCity from "./component/SearchByCity";
import WeatherBlock from "./component/WeatherBlock";


const Weather = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const [weatherInfo, setWeatherInfo] = useState({
    location: 'Not Found',
    icon: '',
    temp: 0,
    description: 'Not Found',
    windSpeed: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    timezone: 0
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const weatherBgSrc = useWeatherBg(weatherInfo.description);

  const fetchData = useCallback(async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const result = await res.json();
      if (result.cod === 200) {
        setError('');
        setWeatherInfo({
          location: result.name,
          icon: result.weather[0].icon,
          temp: Math.ceil(result.main.temp),
          description: result.weather[0].description,
          windSpeed: Math.ceil(result.wind.speed),
          humidity: result.main.humidity,
          sunrise: timeFormat(result.sys.sunrise, result.timezone),
          sunset: timeFormat(result.sys.sunset, result.timezone),
          timezone: result.timezone
        });
      } else {
        setError('Location not found');
      }
    } catch (error) {
      setError('Error fetching data');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      fetchData(`${process.env.REACT_APP_API_URL}/weather/?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`);
      setError('');
    } else {
      setError("Your browser does not support Geolocation or Geolocation is not enabled");
    }
  }, [coords, isGeolocationAvailable, isGeolocationEnabled, fetchData]);

  const getWeatherHandler = (searchedLocation) => {
    if (searchedLocation) {
      fetchData(`${process.env.REACT_APP_API_URL}/weather?q=${searchedLocation}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
    } else if (coords) {
      fetchData(`${process.env.REACT_APP_API_URL}/weather/?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`);
    }
  };

  return (
    <>
      <div className="weather" style={{backgroundImage: `url(${weatherBgSrc})`}}>
        <div className="left">
          <SearchByCity getSearchedLocation={getWeatherHandler} />

          <div>
            <h1>{!error ? weatherInfo.location : "Not Found"}</h1>
            <h2>{!error ? weatherInfo.temp : '?'}°C</h2>
          </div>

          <DateBlock timezone={weatherInfo.timezone} />
        </div>

        <div className="right">
          {loading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>We have some problem: {error}</h1>
          ) : (
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
          )}
          <div className="copyright">
            Used free versions of videos with watermarks from{" "}
            <a href="https://coverr.co/" target="_blank" rel="noreferrer">
              Coverr
            </a>{" "}
            site.
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
