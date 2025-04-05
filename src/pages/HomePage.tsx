import '../Styles/HomePage.css';
// Importing necessary React hooks
import { useState, useEffect } from 'react';
// Importing search icon from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// Importing custom components
import { CountryCard } from '../Components/CountryCard';
import { CountryFilter } from '../Components/CountryFilter';
// Hook for reading and updating the URL query parameters
import { useSearchParams } from 'react-router-dom';
// Defining the type for a country object
export type CountryType = {
  name: { common: string; official: string };
  region: string;
  cca3: string;
  flags: { svg: string; alt: string };
  subregion: string;
  capital: string[];
  area: number;
  population: number;
  languages?: { [key: string]: string };
  currencies?: { [key: string]: { name: string; symbol: string } };
  timezones: string[];
  borders?: string[];
};
function HomePage() {
  // State to store all countries
  const [countries, setCountries] = useState<CountryType[]>([]);
  // Hook for accessing/modifying URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  // State for handling the search input value (initialized from query parameter 'q')
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  // State for region and subregion filters
  const [regionFilter, setRegionFilter] = useState(searchParams.get('region') || '');
  const [subregionFilter, setSubregionFilter] = useState(searchParams.get('subregion') || '');

  // Fetching all country data from API when the component mounts
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);
  // Extracting keyword from search params (lowercased)
  const keyword = searchParams.get('q')?.toLowerCase() || '';
  // Filtering countries based on search input, region, and subregion
  const filteredCountries = countries.filter((country) => {
    // Check if the country's common name includes the search keyword
    const nameMatch = country.name.common.toLowerCase().includes(keyword);
    // Check if the country's capital includes the search keyword (with optional chaining to avoid errors if capital is undefined)
    const capitalMatch = country.capital?.[0]?.toLowerCase().includes(keyword) || false;
    // If a keyword is provided, check if either name or capital matches; otherwise, return true (no filter applied)
    const searchMatch = keyword ? nameMatch || capitalMatch : true;
    // If a region filter and subregion filter is set, check if the country's region matches; otherwise, return true
    const regionMatch = regionFilter ? country.region === regionFilter : true;
    const subregionMatch = subregionFilter ? country.subregion === subregionFilter : true;

    return regionMatch && subregionMatch && searchMatch;
  });
  // Remove 'q' parameter from URL if input is empty
  useEffect(() => {
    if (searchInput.trim() === '') {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
  }, [searchInput, searchParams, setSearchParams]);
  // Handle search button click or 'Enter' key press
  const handleSearch = () => {
    if (searchInput) {
      searchParams.set('q', searchInput.trim());
    }
    setSearchParams(searchParams);
  };
  // Handle change in region filter and update search parameters
  const handleRegionChange = (value: string) => {
    setRegionFilter(value);
    if (value) {
      searchParams.set('region', value);
    } else {
      searchParams.delete('region');
    }
    setSearchParams(searchParams);
  };
  // Handle change in subregion filter and update search parameters
  const handleSubregionChange = (value: string) => {
    setSubregionFilter(value);
    if (value) {
      searchParams.set('subregion', value);
    } else {
      searchParams.delete('subregion');
    }
    setSearchParams(searchParams);
  };
  return (
    <>
      <div className="homepage">
        {/* Search bar */}
        <div className="search-container">
          <div className="search-content">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              className="search-input"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button onClick={handleSearch} className="btn search-btn">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#cf2a2a' }} />
            </button>
          </div>
        </div>
        {/* Filter */}
        {/* CountryFilter component used to display dropdowns or controls for selecting a region and subregion. Props are passed down to handle current filter values and update functions.*/}
        <CountryFilter
          region={regionFilter}
          subregion={subregionFilter}
          onRegionChange={handleRegionChange}
          onSubregionChange={handleSubregionChange}
        />
        <div className="country-list">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country: CountryType) => (
              <CountryCard key={country.cca3} country={country} />
            ))
          ) : (
            <p className="no-result">No countries match your filter.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
