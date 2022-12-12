import React, { useRef } from 'react';

import Input from './UI/Input/Input';
import Button from './UI/Button/Button';

const SearchByCity = (props) => {

  const locationRef = useRef();
  
  const fetchDataByCoords = async (searchLocation) => {
    await fetch(`${process.env.REACT_APP_API_URL}/weather?q=${searchLocation}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      props.getWeatherFullInfo(result);
    });
  }

  const searchHandler = (e) => {
    e.preventDefault();
    const searchLocation = locationRef.current.value
    fetchDataByCoords(searchLocation);
    localStorage.setItem('error', 'false');
  }
  
  return (
    <form className='search-form' onSubmit={searchHandler}>
        <Input 
          type="text"
          ref={locationRef}
          placeholder="Find your location..." />
        <Button>Find</Button>    
    </form>
  )
}

export default SearchByCity;