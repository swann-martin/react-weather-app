import React, { useState } from 'react';
import './App.scss';
import Meteo from './Meteo';

function App() {
  const getCities = () => {
    const stringCities = localStorage.getItem('cities');
    if (!stringCities) return [];
    const data = JSON.parse(stringCities);
    return data;
  };

  const [inputZip, setInputZip] = useState('');
  const [cities, setCities] = useState(getCities());

  const createObject = (inputZip) => {
    return {
      zip: inputZip,
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quelle est la météo chez vous ?</h1>
      </header>
      <main className="main">
        <form
          className="add-city-form"
          onSubmit={(e) => {
            e.preventDefault();
            const newObject = createObject(inputZip);
            setCities([newObject, ...cities]);
            setInputZip('');
          }}
        >
          <input
            className="add-city-form-inputs"
            type="text"
            name="zip"
            placeholder="Code Postal"
            value={inputZip}
            onChange={(evt) => {
              const text = evt.target.value;
              setInputZip(text);
            }}
          />
          <button className="add-city-form-button">Envoyer</button>
        </form>
        <div className="cities">
          {cities.map((element) => (
            <Meteo key={element.city} city={element.city} zip={element.zip} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
