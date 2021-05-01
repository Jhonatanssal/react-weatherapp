import React, { useState } from 'react';

const api = {
  key: "9b67b515b3f697ee8d465327303bf665",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  let [months, days] = [
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  ]

  let d = new Date();

  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(resp => resp.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    <div className="App p-4 warm">
      <main className="d-flex flex-column justify-content-center">
        <div className="search-box w-100 d-flex justify-content-center">
          <input 
            className="form-control mr-sm-2 col-8"
            type="search" placeholder="Search" aria-label="Search"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div className="w-100 d-flex flex-column justify-content-center">
          <div className="location-box mx-auto text-center">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">
                {day + ' ' + date + ' ' + month + ' ' + year}
              </div>
            </div>
            <div className="weather-box mx-auto text-center">
              <div className="temp">
                {Math.round(weather.main.temp) + '°C'}
              </div>
              <div className="icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="icon"
                />
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
