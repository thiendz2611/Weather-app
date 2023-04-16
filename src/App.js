import React, {useState, useEffect} from "react";
import './index.css';

const api = {
  key: "a211190ef9b9199093f020a82f29bc1d",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState("")

  const search = event => {
    if(event.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&lang=vi&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery("")
      });
    }  
  }

  useEffect(() => {
    fetch(`${api.base}weather?q=hanoi&lang=vi&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
      });
  }, [])

  const dateBuilder = (d) => {
    let months = ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy",
  "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"];
  let days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()]
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp >= 22) ? 'app warm' : 'app') 
    : 'app'}>
      <main>
        <div className="search-box">
          <input className="search-bar"
          placeholder="Tìm thành phố..."
          onChange={e => {setQuery(e.target.value)}}
          value={query}
          onKeyDown={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <>
        <div className="location-box">
          <div className="location">
            {weather.name},
            {weather.sys.country}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </> ) : ("")}
      </main>
    </div>
  );
}

export default App;
