// Import necessary hooks and types
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CountryType } from "./HomePage";
// Import FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faCity,
  faChessRook,
  faCube,
  faRulerCombined,
  faCircleNodes,
  faUserGroup,
  faLanguage,
  faCoins,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/CountryDetailPage.css";

function CountryDetailPage() {
  // Get country code from the route parameter
  const { code } = useParams();
  // State for the selected country
  const [country, setCountry] = useState<CountryType | null>(null);
  // State to store names of bordering countries
  const [borderNames, setBorderNames] = useState<string[]>([]);
  // Fetch the selected country
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => response.json())
      .then((data) => {
        const countryData = data[0];
        setCountry(countryData);
        // If the country has borders, fetch their names
        if (countryData.borders?.length) {
          fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(
              ","
            )}`
          )
            .then((response) => response.json())
            .then((data) => {
              const names = data.map(
                (c: { name: { common: string } }) => c.name.common
              );
              setBorderNames(names);
            });
        } else {
          setBorderNames([]);
        }
      });
  }, [code]);
  // Show loading while data is being fetched
  if (!country) return <p>Loading...</p>;
  return (
    <div className="detail-container">
      <div className="detail-contents">
        <div className="detail-header">
          <img src={country.flags.svg} alt={country.flags.alt} />
          <h1>{country.name.official}</h1>
          <p>Common name: {country.name.common}</p>
        </div>
        <table className="detail-body">
          <tbody>
            <tr>
              <td>
                <FontAwesomeIcon icon={faMapLocationDot} className="icon" />{" "}
                <strong> Region:</strong>
              </td>
              <td>{country.region}</td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faChessRook} className="icon" />
                <strong> Subregion:</strong>
              </td>
              <td>{country.subregion}</td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faCity} className="icon" />
                <strong> Capital:</strong>
              </td>
              <td>{country.capital}</td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faCube} className="icon" />{" "}
                <strong> CCA3 Code:</strong>
              </td>
              <td>{country.cca3}</td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faRulerCombined} className="icon" />{" "}
                <strong> Total Area:</strong>
              </td>
              <td>{country.area} km2</td>
            </tr>
            {borderNames.length > 0 && (
              <tr>
                <td>
                  <FontAwesomeIcon icon={faCircleNodes} className="icon" />{" "}
                  <strong> Borders:</strong>
                </td>
                <td>{borderNames.join(", ")} </td>
              </tr>
            )}
            <tr>
              <td>
                <FontAwesomeIcon icon={faUserGroup} className="icon" />{" "}
                <strong> Population:</strong>
              </td>
              <td>{country.population}</td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faLanguage} className="icon" />{" "}
                <strong> Languages:</strong>
              </td>
              <td>
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faCoins} className="icon" />{" "}
                <strong> Currencies:</strong>
              </td>
              <td>
                {country.currencies
                  ? Object.values(country.currencies)
                      .map(
                        (currency) => `${currency.name} (${currency.symbol})`
                      )
                      .join(",")
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faClock} className="icon" />{" "}
                <strong> Timezones:</strong>
              </td>
              <td>{country.timezones}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountryDetailPage;
