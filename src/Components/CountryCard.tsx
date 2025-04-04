import { Link } from "react-router-dom";
import { CountryType } from "../pages/HomePage";
import "../Styles/CountryCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as likedHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unlikedHeart } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import FavoriteContext from "../Store/FavoriteContext";

export const CountryCard = ({ country }: { country: CountryType }) => {
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoriteContext)!;

  const favorite = isFavorite(country.cca3);
  const toggleFavoriteIcon = () => {
    if (favorite) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country.cca3);
    }
  };

  return (
    <div className="country-card">
      <Link to={`/country/${country.cca3}`} className="country-content">
        <img
          className="country-flag"
          src={country.flags.svg}
          alt={country.flags.alt}
        />
        <p>
          <strong>{country.name.common}</strong>
        </p>
        <p>{country.subregion}</p>
      </Link>
      <button className="favorite-btn" onClick={toggleFavoriteIcon}>
        <FontAwesomeIcon
          icon={favorite ? likedHeart : unlikedHeart}
          className={favorite ? "liked-icon" : "unliked-icon"}
        />
      </button>
    </div>
  );
};
