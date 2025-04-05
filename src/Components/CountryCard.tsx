import { Link } from "react-router-dom";
import { CountryType } from "../pages/HomePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as likedHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unlikedHeart } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import UserContext from "../Store/UserContext";
import FavoriteContext from "../Store/FavoriteContext";
import styled from "styled-components";

// Styled Components
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 200px;
  padding: 0.7rem;
  text-align: center;
  transition: transform 0.2s ease;
  background-color: #ffffff61;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;
const CountryLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const FlagImage = styled.img`
  width: auto;
  max-width: 120px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;
const CountryName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;
const FavoriteButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 0.5rem;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.167);
`;
const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  &.liked-icon {
    color: #cf2a2a;
  }
  &.unliked-icon {
    color: gray;
  }
`;

export const CountryCard = ({ country }: { country: CountryType }) => {
  const { user } = useContext(UserContext)!;

  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoriteContext)!;

  const favorite = isFavorite(country.cca3);
  const toggleFavoriteIcon = () => {
    if (!user) {
      alert("Please login to add favorites!");
      return;
    }
    if (favorite) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country.cca3);
    }
  };

  return (
    <Card>
      <CountryLink to={`/country/${country.cca3}`}>
        <FlagImage src={country.flags.svg} alt={country.flags.alt} />
        <CountryName>
          <strong>{country.name.common}</strong>
        </CountryName>
        <p>{country.subregion}</p>
      </CountryLink>
      <FavoriteButton onClick={toggleFavoriteIcon}>
        <StyledIcon
          icon={favorite ? likedHeart : unlikedHeart}
          className={favorite ? "liked-icon" : "unliked-icon"}
        />
      </FavoriteButton>
    </Card>
  );
};
