import { CountryType } from '../../pages/HomePage'

export const CountryCard = ({country}:{country: CountryType }) => {
  return (
    <>
        <div key={country.cca3}>
            <img src={country.flags.png} alt={country.name.common} />
            <p>{country.name.common}</p>
        </div>
  </>
  )
}
