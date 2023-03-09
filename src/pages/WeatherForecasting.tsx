import React, { useEffect, useState } from "react";
import { weatherApi } from "../apiUrls/weatherApi";
import { images } from "../assets/images";
import TryWith from "../components/atoms/nodata";
import Weather from "../components/atoms/weather";
import { WEATHER_CONSTS } from "../consts/constants";

const WeatherForecasting = () => {
  const [data, setData] = useState<any>([]);
  const [city, setCity] = useState<string>('Noida');
  const [latestData,setLatestData] = useState<any>({});

  //api call
  const fetchData = (cityName: string) => {
    fetch(weatherApi.getCitywiseWeather(cityName))
      .then(res => res.json())
      .then(result => {
        setData(result?.forecast?.forecastday)
        setLatestData(result?.forecast?.forecastday[0])
      });
  }

  //this method will be called on input change
  const handleCityChange = (event: any) => {
    const { value } = event.target;
    setCity(value);
  }

  const handleSearch = () => {
    fetchData(city);
  }
  useEffect(() => {
    fetchData(city);
  }, [city])


  return (
    <div className="container-fluid px-1 px-sm-3 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="row card0">
          <div className="card2 col-lg-4 col-md-5">
            <div className="input-group pt-3">
              <input
                type="text"
                name="location"
                placeholder="Enter City"
                defaultValue={city}
                className="mb-4"
                onChange={handleCityChange}
              />
              <div
                className="fa fa-search mb-4 mr-0 text-center"
                onClick={handleSearch}
              ></div>
            </div>
            <div className="row">

              <div className="multipleData col-12">
                {
                  data?.length ? data?.map((ele: any, index: string) => (
                    <div key={index} className="mr-5 mb-4">
                      <p>{WEATHER_CONSTS.WEATHER_DETAILS} ({ele?.date})</p>
                      <small className='text-dark'>{ele["day"]?.condition?.text}</small>
                      <img src={ele["day"]?.condition?.icon} />
                      <Weather title={WEATHER_CONSTS.MAX_TEMP_C} value = {ele["day"]?.maxtemp_c}/>
                      <Weather title={WEATHER_CONSTS.MAX_TEMP_F} value = {ele["day"]?.maxtemp_f}/>
                      <Weather title={WEATHER_CONSTS.SUNRISE} value = {ele["astro"]?.sunrise}/>
                      <Weather title={WEATHER_CONSTS.SUNSET} value = {ele["astro"]?.sunset}/>
                      <Weather title={WEATHER_CONSTS.MOONRISE} value = {ele["astro"]?.moonrise}/>
                      <Weather title={WEATHER_CONSTS.MOONSET} value = {ele["astro"]?.moonset}/>

                      <div className="line mt-3"></div>
                    </div>)
                  )
                    :
                    <TryWith/>
                }
              </div>

            </div>
          </div>
          <div className="card1 col-lg-8 col-md-7 p-0">
            <div className='position-relative bgImage text-center '>
              <img src={images.rainbow} alt='img' />
              <small className='text ms-4 pt-4 d-block'>{WEATHER_CONSTS.WEATHER_DATA}</small>
              <div className='d-flex align-items-center justify-content-center h-100'>
                <div className="row mt-3 mb-3 ms-4 justify-content-center">
                  <h1 className="large-font mr-3 col-auto text">{latestData["day"]?.maxtemp_c}&#176;{"C"}</h1>
                  <div className="d-flex flex-column mr-3 col-auto">
                    <h2 className="text mt-3 mb-0">{city}</h2>
                    <small className='text-dark'>{latestData?.date}</small>
                  </div>
                  <div className="d-flex flex-column text-center col-auto">
                    <img src={latestData["day"]?.condition?.icon} />
                    <small className='sun'>{latestData["day"]?.condition?.text}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherForecasting;
