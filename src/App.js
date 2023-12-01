import { React, useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "e9bd9ca6631cc8c2acbfa979e7c5dc3b";
// const WEATHER_API = `http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${API_KEY}&units=metric`;
const WEATHER_API_CALL = (_location) => `http://api.openweathermap.org/data/2.5/weather?q=${_location}&appid=${API_KEY}&units=metric`;
const ICON_API = (_icon) => `https://openweathermap.org/img/wn/${_icon}@2x.png`;

function App() {

    const [weatherInfo, setWeatherInfo] = useState(null);
    const [location, setLocation] = useState("Toronto");

    const getWeatherData = () => {
        axios.get(WEATHER_API_CALL(location))
            .then((x) => {
                setWeatherInfo(x.data);
                console.log("getted weather INFO");
            })
            .catch((ex) => {
                console.error(ex);
            });
    };

    useEffect(getWeatherData, [location]);

    const renderApp = () => {
        if (!weatherInfo) return;

        return (
            <div className="w-full flex">
                <div className="w-4/12">
                    <h2 className="text-2xl text-center">{weatherInfo.name}</h2>
                    <img className="w-fit m-auto" src={ICON_API(weatherInfo.weather[0].icon)} />
                </div>
                <div className="w-8/12">
                    <ul>
                        <li className="w-full flex justify-between">
                            <span>Temp:</span>
                            <span>{weatherInfo.main.temp} °C</span>
                        </li>
                        <li className="w-full flex justify-between">
                            <span>Feels like:</span>
                            <span>{weatherInfo.main.feels_like} °C</span>
                        </li>
                        <li className="w-full flex justify-between">
                            <span>Min Temp:</span>
                            <span>{weatherInfo.main.temp_min} °C</span>
                        </li>
                        <li className="w-full flex justify-between">
                            <span>Max Temp:</span>
                            <span>{weatherInfo.main.temp_max} °C</span>
                        </li>
                        <li className="w-full flex justify-between">
                            <span>Preassure:</span>
                            <span>{weatherInfo.main.pressure}</span>
                        </li>
                        <li className="w-full flex justify-between">
                            <span>Himidity:</span>
                            <span>{weatherInfo.main.humidity}</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <main className="w-screen h-screen flex flex-col justify-center items-center align-middle">
            <div className="w-3/4">
                <h1 className="text-4xl font-bold">Weather App</h1>
                <div className="flex gap-5 justify-start items-center align-middle">
                    <select className="input" onChange={(x) => {
                        setLocation(x.target.value);
                    }}>
                        <option>Toronto</option>
                        <option>Lima</option>
                    </select>
                </div>
                <div className="divider" />
                {renderApp()}
            </div>
        </main >
    );
}

export default App;
