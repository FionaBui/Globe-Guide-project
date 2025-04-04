import { ReactNode, useEffect, useState } from "react";
import FavoriteContext from "./FavoriteContext";

type Props = {
  children: ReactNode;
};
const FavoriteProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    const favoriteStored = localStorage.getItem("favorites");
    console.log("LocalStorage on load:", favoriteStored);
    if (favoriteStored) {
      setFavorites(JSON.parse(favoriteStored));
    }
  }, []);

  const addFavorite = (code: string) => {
    if (!favorites.includes(code)) {
      setFavorites([...favorites, code]);
      localStorage.setItem("favorite", JSON.stringify([...favorites, code]));
    }
  };
  const removeFavorite = (code: string) => {
    const updated = favorites.filter((fav) => fav !== code);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (code: string) => favorites.includes(code);
  const contextValue = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};
export default FavoriteProvider;
