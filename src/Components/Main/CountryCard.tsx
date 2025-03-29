import { CountryType } from '../../pages/HomePage'
import "./CountryCard.css"
export const CountryCard = ({country}:{country: CountryType }) => {
  return (
    < div className='country-card'>
      <img className='country-flag' src={country.flags.png} alt={country.name.common} />
      <p><strong>{country.name.common}</strong></p>
      <p>{country.subregion}</p>
    </div>
  )
}
