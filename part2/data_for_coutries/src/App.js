import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  const handleFilterChange = ({target:{value}}) => setFilter(value)

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({data}) => setCountries(data))
  },[])

  return (
    <div>
      find countries:<input value={filter} onChange={handleFilterChange}></input><br/>
      <SearchHandler
        countries={countries}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

const SearchHandler = ({countries,filter,handleFilterChange}) => {
  countries = countries.filter(({name, altSpellings}) => {
    return [...altSpellings, name].some(country => RegExp(filter, "i").test(country))
  })

  if(countries.length > 10) return <span>Too many matches, specify another filter</span>
  if(countries.length === 1) return <Country country={countries[0]}/>

  return <CountriesList countries={countries}handleFilterChange={handleFilterChange}/>
}

const CountriesList = ({countries,handleFilterChange}) => {
  return(
    <div>
      {countries.map(({name}) => {
        return (
          <span key={name}> 
            {name} <button value={name} onClick={handleFilterChange} key={name}>show</button><br/>
          </span>)
        })}
    </div>
  )
}

const Country = ({country:{name,capital,population,languages,flag}}) => {
  return (
    <>
      <h1>{name}</h1>
      <span>capital: {capital}</span><br/>
      <span>population: {population}</span><br/>
      <h3>languages</h3>
      <ul>
        {languages.map(({name})=> <li key ={name}>{name}</li>)}
      </ul>
      <img src={flag} width="250" alt={`${name} flag`}/>
      <Weather capital={capital}/>
    </>
  )
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState({})
  useEffect(()=>{
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API}&query=${capital}`)
    .then(({data})=> {
      setWeather({
          name:data.location.name,
          temp:data.current.temperature,
          img: data.current.weather_icons[0],
          wind: data.current.wind_speed,
          wind_dir: data.current.wind_dir
      })
    })
  },[capital])
  
  return(
    <>
      <h3>{weather.name}</h3>
      <b>temperature: </b>{weather.temp} Celcius <br/>
      <img src={weather.img} alt='weather icon'/><br/>
      <b>wind: </b>{weather.wind} mph direction {weather.wind_dir}
    </>
  )
}

export default App