import { useParams, Link } from 'react-router-dom';
import './CountryDetails.css';

function CountryDetails({ countries }) {
  const { countryName } = useParams();
  const country = countries.find((c) => c.name.common === countryName);

  if (!country) return <p>Country not found</p>;

  return (
    <div className="country-details-page">
      <div className="back-button-container">
        <Link to="/" className="back-button">← Back</Link>
      </div>
      <div className="country-details">
        <div className="country-details-grid">
          <div className="country-details-flag-container">
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className="country-details-flag" />
          </div>
          <div className="country-info">
            <h2>{country.name.common}</h2>
            <p><strong>Native Name:</strong> {country.name.nativeName?.[Object.keys(country.name.nativeName)[0]]?.common || 'N/A'}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
            <p><strong>Border Countries:</strong> {country.borders ? country.borders.join(', ') : 'N/A'}</p>
            <p><strong>Top Level Domain:</strong> {country.tld ? country.tld.join(', ') : 'N/A'}</p>
            <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ') : 'N/A'}</p>
            <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;

