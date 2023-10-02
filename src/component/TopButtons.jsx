import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Delhi",
    },
    {
      id: 2,
      title: "Mumbai",
    },
    {
      id: 3,
      title: "Jalandhar",
    },
    {
      id: 4,
      title: "Ranchi",
    },
    {
      id: 5,
      title: "Kolkata",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg 
        font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;

// The TopButtons component takes a setQuery prop and renders a list of buttons,
// one for each city in the cities prop. When a button is clicked, the setQuery prop is called
// with the city name as the parameter and this fetch the weather data for that city.
