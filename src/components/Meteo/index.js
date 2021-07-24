import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';

const Meteo = ({ zip }) => {
  const [temp, setTemp] = useState(0);
  const [sky, setSky] = useState('Cloud');
  const [city, setCity] = useState('');
  const localURL = 'http://localhost:1234/';
  const liveURL = `https://api.openweathermap.org`;
  const path = `/data/2.5/weather?zip=${zip},fr&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  console.log(process.env.REACT_APP_API_KEY);
  let url = liveURL + path;
  // console.log(process.env.NODE_ENV)
  // if (process.env.NODE_ENV === 'production') {
  //     url = liveURL + path;
  // }

  const fetchWeather = () => {
    axios({
      method: 'get',
      url,
    })
      .then((res) => {
        console.log('success voici les données', res.data);
        setTemp(Math.round(res.data.main.temp));
        setSky(res.data.weather[0].main);
        setCity(res.data.weather[0].name);
        console.log('name', res.data.weather[0].base);
        console.log(sky);
      })
      .catch((err) => {
        console.log('Ooops ça ne fonctionne pas', err);
      });
  };

  useEffect(fetchWeather, []);

  return (
    <div className="meteo">
      <div className="meteo_city">
        <h2>{city}</h2>
        <p className="meteo_zip">{zip}</p>
      </div>
      <h3 className="meteo_temp">
        <span
          className={
            temp > 15
              ? 'meteo_temp meteo_temp--hot'
              : 'meteo_temp meteo_temp--cold'
          }
        >
          {' '}
          {temp}{' '}
        </span>
        °c
      </h3>
      {sky === 'Clouds' ? (
        <i className="fas fa-cloud"></i>
      ) : (
        <i className="fas fa-sun"></i>
      )}
      {sky === 'Clear' ? <i className="fas fa-sun"></i> : ''}
    </div>
  );
};
export default Meteo;
