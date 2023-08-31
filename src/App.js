
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import Topbuttons from './components/Topbuttons';
import Inputs from './components/Inputs';
import Timeandlocation from './components/Timeandlocation';
import Tempanddet from './Tempanddet';
import Forecast from './Forecast';
import getFormattedWeatherData from './services/WeatherServices';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query,setQuery] = useState({q:"kakinada"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);
      await getFormattedWeatherData({...query,units}).then((data) => { 
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        setWeather(data);});

    };
    fetchWeather();
  }, [query,units]);
  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700"
    const threshold = units === "metric" ? 25 : 60;
    if(weather.temp <= threshold) return  "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700"
  };

  return (
    <div className="App">
      <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
        
        <Topbuttons setQuery={setQuery}/>
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
        {weather && 
        (<div><Timeandlocation weather={weather}/>
        <Tempanddet weather={weather}/>
        <Forecast title="hourly forecast" items={weather.hourly}/>
        <Forecast title="dialy forecast" items={weather.daily}/></div>)}
      
      </div>
      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true}/>
    </div>
  );
}

export default App;
