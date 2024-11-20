import React from 'react';
import './Filter.css';

function Filter({ selectedRegion, onRegionChange }) {
  return (
    <div className="filter">
      <select value={selectedRegion} onChange={(e) => onRegionChange(e.target.value)}>
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default Filter;
