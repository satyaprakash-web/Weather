import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  //  to change the temperature unit.
  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  // The handleSearchClick function is called when the user clicks the "Search by city" button. 
  const handleSearchClick = () => {
    if (city != "") setQuery({ q: city });
  };

  // "Search by location" button. it uses the navigator.geolocation API to get the user's current location. Once the location 
  // is fetched, the setQuery state is called with an object with the lat and lon properties set to the user's latitude and longitude.
  
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location!");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched");
        let lat = position.coors.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
        <div className="flex flex-row w-1/4 items-center justify-center">
          <button
            name="metric"
            className="text-xl text-white font-light transition
             ease-out hover:scale-125"
            onClick={handleUnitsChange}
          >
            °C{" "}
          </button>

          <p className="text-xl text-white mx-1">|</p>
          <button
            name="imperial"
            className="text-xl text-white font-light transition
             ease-out hover:scale-124"
            onClick={handleUnitsChange}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
}
// 
export default Inputs;

//  the Inputs component renders a city input field, two radio buttons for selecting the temperature unit, 
// and two buttons for searching by city and location. It passes the user's input to the setQuery and setUnits 
// state props, which are used to fetch and display the weather data.
