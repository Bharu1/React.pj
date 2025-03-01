import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCountryData = createAsyncThunk(
    "countryData/fetchCountryData",
    async () => {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        return data;
    }
);


export const fetchCountriesByName = createAsyncThunk(
    "countryData/fetchCountriesByName",
    async (name) => {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await response.json();
        return data;
    }
);


export const fetchCountriesByRegion = createAsyncThunk(
    "countryData/fetchCountriesByRegion",
    async (region) => {
        const response = await fetch(
            `https://restcountries.com/v3.1/region/${region}?fields=name,population,region,capital,flags`
        );
        const data = await response.json();
        return data;
    }
);

const countryDataSlice = createSlice({
    name: "countryData",
    initialState: {
        countryData: [],
        status: "idle",
        isSearching: false,
        isFiltering: false,
        errorMessage: "",
        searchTerm: "",
        selectedRegion: "",
    },
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setSelectedRegion(state, action) {
            state.selectedRegion = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchCountryData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCountryData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.countryData = action.payload;
            })
            .addCase(fetchCountryData.rejected, (state) => {
                state.status = "failed";
                state.errorMessage = "Failed to fetch countries.";
            })

            .addCase(fetchCountriesByName.pending, (state) => {
                state.isSearching = true;
            })
            .addCase(fetchCountriesByName.fulfilled, (state, action) => {
                state.isSearching = false;
                state.countryData = action.payload;
            })
            .addCase(fetchCountriesByName.rejected, (state) => {
                state.isSearching = false;
                state.errorMessage = "Failed to fetch countries by name.";
            })

            .addCase(fetchCountriesByRegion.pending, (state) => {
                state.isFiltering = true;
            })
            .addCase(fetchCountriesByRegion.fulfilled, (state, action) => {
                state.isFiltering = false;
                state.countryData = action.payload;
            })
            .addCase(fetchCountriesByRegion.rejected, (state) => {
                state.isFiltering = false;
                state.errorMessage = "Failed to fetch countries by region.";
            });
    },
});

export const { setSearchTerm, setSelectedRegion } = countryDataSlice.actions;

export default countryDataSlice.reducer;
