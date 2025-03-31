import "../Styles/HomePage.css"
import {useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { CountryCard } from "../Components/Main/CountryCard";
import { CountryFilter } from "../Components/Main/CountryFilter";
export type  CountryType = {
  name: {common: string};
  region: string;
  cca3: string;
  flags: {png: string};
  subregion: string;
  language?: {[key:string]:string}
}
function HomePage () {
  const [countries, setCountries] = useState <CountryType[]> ([])
  const  [regionFilter, setRegionFilter] = useState ('');
  const [subregionFilter, setSubregionFilter]= useState('');

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
    .then ((response)=> response.json())
    .then ((data)=> setCountries(data))
  }, []);
    const filteredCountries = countries.filter((country) => {
      const regionMatch = regionFilter? country.region === regionFilter : true
      const subregionMatch = subregionFilter? country.subregion === subregionFilter : true
      return regionMatch && subregionMatch
    })
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
        <CountryFilter
          region={regionFilter}
          subregion={subregionFilter}
          onRegionChange={setRegionFilter}
          onSubregionChange={setSubregionFilter}
        />
        <div className="country-list">
          {filteredCountries.length > 0 ? (
          filteredCountries.map((country:CountryType)=>(
          <CountryCard key={country.cca3} country={country}/>
          ))): (
            <p className="no-result">No countries match your filter.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage ;
