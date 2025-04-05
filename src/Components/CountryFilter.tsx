import '../Styles/CountryFilter.css';
// Define prop types for the CountryFilter component
type Props = {
  region: string;
  subregion: string;
  onRegionChange: (value: string) => void;
  onSubregionChange: (value: string) => void;
};
// Functional component for filtering countries by region and subregion
export const CountryFilter = ({ region, subregion, onRegionChange, onSubregionChange }: Props) => {
  return (
    <div className="filter-container">
      <select
        value={region}
        className="region filter"
        onChange={(e) => onRegionChange(e.target.value)}
      >
        <option value="">All regions</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Oceania">Oceania</option>
        <option value="Antarctic">Antarctic</option>
      </select>
      <select
        value={subregion}
        className="filter"
        onChange={(e) => onSubregionChange(e.target.value)}
      >
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
  );
};
