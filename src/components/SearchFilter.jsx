import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setSelectedRegion,
  fetchCountriesByName,
  fetchCountriesByRegion,
} from "../store/countryDataSlice";
import { useNavigate } from "react-router-dom";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
    searchTerm, 
    selectedRegion, 
    countryData, 
    errorMessage 
  } = useSelector((state) => state.countryData);

  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchCountriesByName(searchTerm));
    } else if (selectedRegion) {
      dispatch(fetchCountriesByRegion(selectedRegion));
    }
  }, [searchTerm, selectedRegion, dispatch]);

  return (
    <div className="m-10">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        {/* Search Input */}
        <div className="relative md:w-[400px] w-full">
          <div className="relative flex items-center border rounded-none shadow-md">
            <svg
              className="absolute left-4 h-5 w-5 text-gray-600 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19a8 8 0 100-16 8 8 0 000 16zm7-7l4 4"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for a country..."
              className="pl-12 pr-4 py-2 w-full h-10 rounded-lg dark:text-white dark:bg-slate-800 focus:outline-none"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="mt-6 md:mt-0 flex justify-start md:justify-end w-full">
          <select
            className="p-2 border outline-none rounded-none shadow-md cursor-pointer dark:bg-slate-800"
            value={selectedRegion}
            onChange={(e) => dispatch(setSelectedRegion(e.target.value))}
          >
            <option value="">Filter by Region</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Countries Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Error message if data fetching fails */}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        {/* Render countries */}
        {countryData.length > 0 ? (
          countryData.map((country) => (
            <div
              key={country.cca3}
              className="w-full rounded-lg shadow-md hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/country/${country.cca3}`)}
            >
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-4">{country.name.common}</h2>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">Population:</span>{" "}
                    <span>{country.population.toLocaleString()}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Region:</span>{" "}
                    <span>{country.region}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Capital:</span>{" "}
                    <span>{country.capital}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No countries available.</p>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
