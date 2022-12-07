import React from "react";
import SearchForm from "./component/SearchForm";
import Video from "./component/UI/Video/Video";

function Weather() {
  return (
    <>
      <Video autoPlay muted loop />
      
      <div className="Weather">
        <h1 className="title"> Weather App</h1>
        <SearchForm />
      </div>
    </>
    
  );
}

export default Weather;
