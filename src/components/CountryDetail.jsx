import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountryData } from "../store/countryDataSlice";

const CountryDetail = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { countryData } = useSelector((state) => state.countryData);

  // Find the country that matches the countryCode
  const country = countryData.find((c) => c.cca3 === countryCode);

  useEffect(() => {
    if (countryData.length === 0) {
      dispatch(fetchCountryData()); // Ensure data is available
    }
  }, [dispatch, countryData]);

  if (!country) return <p>Country not found</p>;

  return (
    <div className="m-10">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-200 rounded shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:text-white"
      >
        &larr; Back
      </button>
      <div className="flex flex-col md:flex-row mt-8 gap-10">
  {/* Flag Section */}
  <img
    src={country.flags.png}
    alt={country.name.common}
    className="w-full h-auto rounded shadow-lg"
  />

  {/* Details Section */}
  <div className="w-full">
    <h1 className="text-3xl font-bold mb-8">{country.name.common}</h1>

    {/* Details Grid */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-4">
        <p>
          <strong>Native Name:</strong>{" "}
          {Object.values(country.name.nativeName)[0]?.common}
        </p>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Sub Region:</strong> {country.subregion}
        </p>
        <p>
          <strong>Capital:</strong> {country.capital?.join(", ")}
        </p>
      </div>
      <div className="space-y-4 mt-6 sm:mt-0"> {/* Add space for mobile */}
        <p>
          <strong>Top Level Domain:</strong> {country.tld?.join(", ")}
        </p>
        <p>
          <strong>Currencies:</strong>{" "}
          {Object.values(country.currencies || {})
            .map((currency) => currency.name)
            .join(", ")}
        </p>
        <p>
          <strong>Languages:</strong>{" "}
          {Object.values(country.languages || {}).join(", ")}
        </p>
      </div>
    </div>

    {/* Border Countries */}
    <p className="mt-6 sm:mt-10"> {/* Add larger space for mobile */}
      <strong>Border Countries:</strong>
      {country.borders?.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {country.borders.map((border) => (
            <button
              key={border}
              onClick={() => navigate(`/country/${border}`)}
              className="px-4 py-2 bg-gray-200 rounded shadow-md text-sm hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            >
              {border}
            </button>
          ))}
        </div>
      ) : (
        <span className="ml-2">None</span>
      )}
    </p>
  </div>
</div>

    </div>
  );
};

export default CountryDetail;
