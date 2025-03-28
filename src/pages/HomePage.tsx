import "../Styles/HomePage.css"
import {useState, useEffect } from "react"
import { CountryCard } from "../Components/Main/CountryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
export type  CountryType = {
  name: {common: string};
  region: string;
  cca3: string;
  flags: {png: string};
  language?: {[key:string]:string}
}
function HomePage () {
  const [countries, setCountries] = useState <CountryType[]> ([])
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
    .then ((response)=> response.json())
    .then ((data)=> setCountries(data))
  }, []);
  return (
    <>
      <div className="homepage">
        {/* Search bar */}
        <div  className="search-container">
          <div className="search-content">
            <input type="text" placeholder="Search by name" value="" className="search-input" />
            <button className="btn search-btn"><FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#cf2a2a",}} /></button>
          </div>
        </div>
        {/* Filter */}
        <div className="filter">
          <select name="" id="" >
            <option value="">All regions</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctic">Antarctic</option>
          </select>
          <select name="" id="">
            <option value="">All Subregions</option>
            <option value="Central America">Central America</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Polynesia">Polynesia</option>
            <option value="Central Europe">Central Europe</option>
            <option value="Eastern Europe">Eastern Europe</option>
            <option value="Western Europe">Western Europe</option>
            <option value="Southern Europe">Southern Europe</option>
            <option value="Southeast Europe">Southeast Europe</option>
            <option value="Northern Europe">Northern Europe</option>
            <option value="Middle Africa">Middle Africa</option>
            <option value="Western Africa">Western Africa</option>
            <option value="Northern Africa">Northern Africa</option>
            <option value="Eastern Africa">Eastern Africa</option>
            <option value="Northern Africa">Northern Africa</option>
            <option value="Central Asia">Central Asia</option>
            <option value="Eastern Asia">Eastern Asia</option>
            <option value="South-Eastern Asia">South-Eastern Asia</option>
            <option value="Southern Asia">Southern Asia</option>
            <option value="Western Asia">Western Asia</option>
            <option value="Australia and New Zealand">Australia and New Zealand</option>
            <option value="Micronesia">Micronesia</option>
            <option value="Melanesia">Melanesia</option>
          </select>
        </div>
        <div className="country-list">
          {countries.map((country:CountryType)=>(
          <CountryCard key={country.cca3} country={country}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage ;
