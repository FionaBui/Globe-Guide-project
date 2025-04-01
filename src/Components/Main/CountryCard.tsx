import { Link } from 'react-router-dom'
import { CountryType } from '../../pages/HomePage'
import "./CountryCard.css"
export const CountryCard = ({country}:{country: CountryType }) => {
  return (
    < Link to={`/country/${country.cca3}`} className='country-card'>
      <img className='country-flag' src={country.flags.svg} alt={country.flags.alt} />
      <p><strong>{country.name.common}</strong></p>
      <p>{country.subregion}</p>
    </Link>
  )
}
