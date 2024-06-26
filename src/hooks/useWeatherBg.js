import { useMemo } from "react";
import { Clouds, Rain, Snow, Sunny, Wind, Haze, Lightning } from "../utils/images";

export const useWeatherBg = (description) => {
    return useMemo(() => {
      const weatherArr = description.split(' ');
      if (weatherArr.includes("rain")) return Rain;
      if (weatherArr.includes("clouds")) return Clouds;
      if (weatherArr.includes("snow")) return Snow;
      if (weatherArr.includes("sun") || weatherArr.includes("sky")) return Sunny;
      if (weatherArr.includes("wind")) return Wind;
      if (weatherArr.includes("mist") || weatherArr.includes("smoke") || weatherArr.includes("haze")) return Haze;
      if (weatherArr.includes("lightning")) return Lightning;
      
      return Clouds;
    }, [description]);
  }; 