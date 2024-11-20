import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import CountryDetails from './components/CountryDetails';
import './App.css';

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
      return matchesSearch && matchesRegion;
    });
    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, countries]);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <div className="search-filter-container">
                  <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                  <Filter selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
                </div>
                {/* Add the new container class here */}
                <div className="country-list-container">
                  <div className="country-list">
                    {filteredCountries.map((country) => (
                      <Link
                        key={country.cca3}
                        to={`/country/${country.name.common}`}
                        className="country-item"
                      >
                        <img
                          src={country.flags.png}
                          alt={`Flag of ${country.name.common}`}
                          className="country-flag"
                        />
                        <h3 className="country-name">{country.name.common}</h3>
                        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> {country.region}</p>
                        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/country/:countryName"
            element={<CountryDetails countries={countries} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
