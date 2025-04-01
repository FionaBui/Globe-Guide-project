import "../Styles/HomePage.css"
import {useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { CountryCard } from "../Components/Main/CountryCard";
import { CountryFilter } from "../Components/Main/CountryFilter";
import { useSearchParams } from "react-router-dom";
export type  CountryType = {
  name: {common: string, official:string};
  region: string;
  cca3: string;
  flags: {svg: string,alt:string};
  subregion: string;
  capital: string[];
  area:number;
  population: number;
  languages?: {[key:string]:string};
  currencies?: { [key: string]: { name: string; symbol: string } };
  timezones: string[];
  borders?: string[];
}
function HomePage () {
  const [countries, setCountries] = useState <CountryType[]> ([]);
  const [searchParams,setSearchParams]= useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('q')|| '');
  const  [regionFilter, setRegionFilter] = useState (searchParams.get('region')||'');
  const [subregionFilter, setSubregionFilter]= useState(searchParams.get('subregion')||'');
  
  
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
    .then ((response)=> response.json())
    .then ((data)=> setCountries(data))
  }, []);

    const keyword = searchParams.get('q')?.toLowerCase()|| '';
    const filteredCountries = countries.filter((country) => {
      const nameMatch = country.name.common.toLowerCase().includes(keyword);
      const capitalMatch = country.capital?.[0]?.toLowerCase().includes(keyword)||false;
      
      const searchMatch = keyword ? (nameMatch || capitalMatch) : true;
      const regionMatch = regionFilter? country.region === regionFilter : true
      const subregionMatch = subregionFilter? country.subregion === subregionFilter : true
      
      return regionMatch && subregionMatch && searchMatch
    })
    
    useEffect(()=>{
      if(searchInput.trim()===''){
        searchParams.delete('q')
        setSearchParams(searchParams)
      }
    },[searchInput, searchParams, setSearchParams]);

    const handleSearch = () => {
      if (searchInput) {
        searchParams.set("q", searchInput.trim());
      } 
      setSearchParams(searchParams);
    };
    
    const handleRegionChange = (value:string) => { 
      setRegionFilter(value);
      if(value){
        searchParams.set('region',value);
        }
        else{
          searchParams.delete('region')
      }
      setSearchParams(searchParams)
     }

     const handleSubregionChange = (value:string) => {
      setSubregionFilter(value);
      if(value){
        searchParams.set('subregion',value);
      } else{
        searchParams.delete('subregion')
      }
      setSearchParams(searchParams)
     }
  return (
    <>
      <div className="homepage">
        {/* Search bar */}
        <div  className="search-container">
          <div className="search-content">
            <input type="text" placeholder="Search..." value={searchInput} className="search-input" onChange={(e)=> setSearchInput(e.target.value)} onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}/>
            <button onClick={handleSearch} className="btn search-btn"><FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#cf2a2a",}} /></button>
          </div>
        </div>
        {/* Filter */}
        <CountryFilter
          region={regionFilter}
          subregion={subregionFilter}
          onRegionChange={handleRegionChange}
          onSubregionChange={handleSubregionChange}
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
