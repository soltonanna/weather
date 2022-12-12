import React from 'react';
import { FaImage } from "react-icons/fa";

const WeatherBlock = (props) => {

  return (
    <div>
        <div className='full-data__top'>
             <p className='desc'>{props.description}</p>
            { props.icon 
                ? <img className="icon" src={`http://openweathermap.org/img/w/${props.icon}.png`} alt="Weather icon" /> 
                : <FaImage />
            }
        </div>
        <div className='full-data__more'>
            <ul>
            <li>
                <h3>Temperature</h3>
                <p>{props.temp} <span>°C</span></p>
            </li>
            <li>
                <h3>Humidity</h3>
                <p>{props.humidity} <span>%</span></p>
            </li>
            <li>
                <h3>Wind speed</h3>
                <p>{props.windSpeed} <span>Km/h</span></p>
            </li>
            <hr />
            <li>
                <h3>Sunrise</h3>
                <p>{props.sunrise}</p>
            </li>
            <li>
                <h3>Sunset</h3>
                <p>{props.sunset}</p>
            </li>
            </ul>
        </div>
    </div>
  )
}

export default WeatherBlock;