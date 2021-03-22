import "./App.css";
import React, { useState, useEffect } from "react";
import LoadingMask from "./components/LoadingMask";
import Hotel from "./components/Hotel";

const App = () => {
  const [hotels, setHotels] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    fetch("./api/hotels")
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((err) => setHotels(null))
      .finally(() => setLoad(false));
  }, []);

  return (
    <div className="App">
      <h1>Hotels</h1>
      {load && <LoadingMask />}
      {hotels ? (
        hotels.map((hotel) => (
          <Hotel
            key={hotel.name}
            name={hotel.name}
            details={`${hotel.city} (${hotel.stars})`}
          />
        ))
      ) : (
        <p>Oops, something happened</p>
      )}
    </div>
  );
};

export default App;
