import React, { useState } from 'react';
import Input from './UI/Input/Input';
import Button from './UI/Button/Button';

const SearchForm = () => {
  const [searchLocation, setSearchLocation] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();
    console.log(searchLocation);
  }

  return (
    <form className='search-form' onSubmit={searchHandler}>
        <Input 
            type="text"
            value={searchLocation}
            onChange={(e)=>setSearchLocation(e.target.value)}
            placeholder="Find your location..." />
        <Button>Find</Button>    
    </form>
  )
}

export default SearchForm;