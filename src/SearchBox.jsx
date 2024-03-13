/* eslint-disable react/prop-types */
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  const API_KEY = "3e2e8085352579035b58dc39a807ba8a";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  let [city, setCity] = useState("");

  let getWeatherInfo = async () => {
    let response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    let jsonResponse = await response.json();

    let result = {
      city: city,
      temp: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelsLike: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description,
    };
    console.log(result);
    return result;
  };
  let handleChannge = (event) => {
    setCity(event.target.value);
    // console.log(event.target.name);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log(city);
    setCity("");
    let newInfo = await getWeatherInfo();
    updateInfo(newInfo);
  };
  return (
    <div className="SearchBox">
      <form action="">
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          onChange={handleChannge}
          value={city}
        />
        <br />
        <br />
        <Button
          variant="contained"
          size="medium"
          type="submit"
          onClick={handleSubmit}
        >
          SEARCH
        </Button>
      </form>
    </div>
  );
}
