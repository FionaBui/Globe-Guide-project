import { createContext } from 'react';
export type FavoriteContextType = {
  favorites: string[];
  addFavorite: (code: string) => void;
  removeFavorite: (code: string) => void;
  isFavorite: (code: string) => boolean;
};
const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);
export default FavoriteContext;
