import React, { useEffect } from "react";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeProvider";
import SearchFilter from "./components/SearchFilter";
import { fetchCountryData } from "./store/countryDataSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryDetail from "./components/CountryDetail"; 
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountryData()); 
  }, [dispatch]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Header />
        <main>
          <Router>
            <Routes>
              <Route path="/" element={<SearchFilter />} />
              <Route path="/country/:countryCode" element={<CountryDetail />} />
            </Routes>
          </Router>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
