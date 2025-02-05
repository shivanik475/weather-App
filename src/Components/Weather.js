import React, { useState } from 'react'
import clear from '../assets/clear.png'
import clouds from '../assets/Clouds.png'
import Rain from '../assets/Rain.png'
import mist from '../assets/mist.png'
import search from '../assets/search.png'


const Weather = () => {
    const API_KEY = "f2ca926dfb136ff0f2a65ecd8e1ac967"
    const [city, setCity] = useState("");
    const [data, setData] = useState();
    const [error, setError] = useState("");
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const handleInput = (event) => {
        setCity(event.target.value);
        console.log(event.target.value);
    }
    const getWeather = async () => {
        const response = await fetch(API);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setData(jsonResponse);
        if (city === "") {
            setError('Please enter a city name');
        }
        else if (jsonResponse.cod === '404') {
            setError('Please enter valid city Name!');
        }
        else {
            setError('');
        }
        setCity("");
    }

    return (
        <>
            <div className='container'>
                <div className='inputs'>
                    <input type='text' placeholder='Enter City Name' value={city} onChange={handleInput} />
                    <button onClick={getWeather}><img src={search}></img></button>
                </div>
                <div>
                    {
                        error ?
                            <div className='error'>
                                <p>{error}</p>
                            </div> : ""
                    }
                    {
                        data && data.weather ?
                            <div className='weathers'>
                                <h2 className='cityName'>{data.name}</h2>
                                <img src={data.weather[0].main == 'Clear' ? clear : ""} />
                                <img src={data.weather[0].main === 'Clouds' ? clouds : ""} />
                                <img src={data.weather[0].main === 'Rain' ? Rain : ""} />
                                <img src={data.weather[0].main === 'Mist' ? mist : ""} />
                                <img src={data.weather[0].main === 'Haze' ? mist : ""} />

                                <h2 className='temperature'>{Math.trunc(data.main.temp)}°C</h2>
                                <p className='climate'>{data.weather[0].description}</p>
                            </div> : ""
                    }
                </div>
            </div>
        </>
    )
}

export default Weather