import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./component/TopButtons";
import Inputs from "./component/Inputs";
import TimeandLocation from "./component/TimeandLocation";
import TemperatureAndDetails from "./component/TemperatureAndDetails";
import Forecast from "./component/Forecast";
// import getWeatherData from "./component/services/weatherService";
import getFormattedWeatherData from "./component/services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "Ranchi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
// 
  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
       setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };
  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 
    bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-lg shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnit} />
      {/* Jai Mata Di */}
      {weather && (
        <div>
          <TimeandLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          {/* <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="Daily forecast" items={weather.daly} /> */}
        </div>
      )}
      <ToastContainer
        autoclose={5000}
        theme="coloured"
        newestOnTop={true}
        style={{ color: "#000" }}
      />
    </div>
  );
}
//
export default App;
