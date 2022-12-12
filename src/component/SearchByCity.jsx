import React, { useRef } from 'react';

import Input from './UI/Input/Input';
import Button from './UI/Button/Button';

const SearchByCity = (props) => {

  const locationRef = useRef();
  
  const searchHandler = (e) => {
    e.preventDefault();
    props.getSearchedLocation(locationRef.current.value);
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