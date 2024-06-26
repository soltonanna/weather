import React from 'react';
import { FaImage } from "react-icons/fa";

const WeatherBlock = ({ description, icon, temp, humidity, windSpeed, sunrise, sunset }) => {

  return (
    <div>
        <div className='full-data__top'>
             <p className='desc'>{description}</p>
            { icon 
                ? <img className="icon" src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather icon" /> 
                : <FaImage />
            }
        </div>
        <div className='full-data__more'>
            <ul>
            <li>
                <h3>Temperature</h3>
                <p>{temp} <span>°C</span></p>
            </li>
            <li>
                <h3>Humidity</h3>
                <p>{humidity} <span>%</span></p>
            </li>
            <li>
                <h3>Wind speed</h3>
                <p>{windSpeed} <span>Km/h</span></p>
            </li>
            <hr />
            <li>
                <h3>Sunrise</h3>
                <p>{sunrise}</p>
            </li>
            <li>
                <h3>Sunset</h3>
                <p>{sunset}</p>
            </li>
            </ul>
        </div>
    </div>
  )
}

export default WeatherBlock;