import { ReactNode, useState } from "react";
import FavoriteContext from "./FavoriteContext";

type Props = {
  children: ReactNode;
};
const FavoriteProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const addFavorite = (code: string) => {
    if (!favorites.includes(code)) {
      setFavorites([...favorites, code]);
    }
  };
  const removeFavorite = (code: string) => {
    setFavorites(favorites.filter((fav) => fav !== code));
  };
  const isFavorite = (code: string) => favorites.includes(code);
  const contexValue = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
  return (
    <FavoriteContext.Provider value={contexValue}>
      {children}
    </FavoriteContext.Provider>
  );
};
export default FavoriteProvider;
