import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [value, setValue] = useState("");
  const [weathers, setWeathers] = useState({});
  const [location, setLocation] = useState(null);
  const [showcard, SetShowCard] = useState("");
  const apiKey = "61b69dc9c50d1f9c130f54589a7a7b1c";

  //useEffect function
  useEffect(() => {
    //skip if location is not defined
    if (location) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
        )
        .then((response) => {
          setWeathers(response.data);
        });
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setLocation(value);
    SetShowCard("card");
    setValue("");
  };
  return (
    <div className="app">
      <form onSubmit={onSearch} className="form">
        Enter City Name <input value={value} onChange={handleLocationChange} />
        <button type="submit" className="findbtn">
          Submit
        </button>
      </form>
      <div className={showcard}>
        <div>
          <h2 className="place">
            {Object.keys(weathers).length !== 0 ? weathers.name : null}{" "}
            {Object.keys(weathers).length !== 0 ? weathers.sys.country : null}
          </h2>
        </div>
        <div>
          {weathers.weather?.map((w) => (
            <div className="weatherbox" key={w.id}>
              <h3> Weather : {w.main}</h3>
            </div>
          ))}
        </div>
        <div>
          <span className="tempbox">
            {Object.keys(weathers).length !== 0
              ? `Temperature : ` + weathers.main.temp + `\u00B0`
              : null}
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
