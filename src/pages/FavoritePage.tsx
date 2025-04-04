import FavoriteContext from "../Store/FavoriteContext";
import { useContext, useEffect, useState } from "react";
import { CountryCard } from "../Components/CountryCard";
import { CountryType } from "./HomePage";

function FavoritePage() {
  const { favorites } = useContext(FavoriteContext)!;
  console.log("favorites:", favorites);
  const [favoriteCountries, setFavoriteCountries] = useState<CountryType[]>([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const filtered = data.filter((c: CountryType) =>
          favorites.includes(c.cca3)
        );
        setFavoriteCountries(filtered);
      });
  }, [favorites]);
  return (
    <div className="favorite-container">
      <h2>Favorite Countries</h2>
      {favoriteCountries.length > 0 ? (
        <div>
          {favoriteCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div>
          <h4>No favorite countries</h4>
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
