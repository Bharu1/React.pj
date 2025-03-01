import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import countryDataReducer from '../store/countryDataSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    countryData: countryDataReducer,
  },
});

export default store;
