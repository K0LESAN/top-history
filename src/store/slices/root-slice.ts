import type { Category, Country, TopHistory } from '../../type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';

interface RootSlice {
  countries: Country[];
  categories: Category[];
  topHistory: TopHistory;
  selectedCountry?: Country;
}

const initialState: RootSlice = {
  countries: [],
  categories: [],
  topHistory: {},
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setCountries: (state, { payload }: PayloadAction<Country[]>) => {
      state.countries = payload;
    },
    setCategories: (state, { payload }: PayloadAction<Category[]>) => {
      state.categories = payload;
    },
    setTopHistory: (state, { payload }: PayloadAction<TopHistory>) => {
      state.topHistory = payload;
    },
    setSelectedCountry: (
      state,
      { payload }: PayloadAction<Country | undefined>
    ) => {
      state.selectedCountry = payload;
    },
  },
  selectors: {
    getCountries: (state) => state.countries,
    getCategories: (state) => state.categories,
    getTopHistory: (state) => state.topHistory,
    getSelectedCountry: (state) => state.selectedCountry,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getCountries.matchFulfilled,
      (state, { payload }) => {
        state.countries = payload.data;

        if (!state.selectedCountry) {
          state.selectedCountry = payload.data[0];
        }
      }
    );
    builder.addMatcher(
      api.endpoints.getCategories.matchFulfilled,
      (state, { payload }) => {
        state.categories = payload.data;
      }
    );
    builder.addMatcher(
      api.endpoints.getTopHistory.matchFulfilled,
      (state, { payload }) => {
        state.topHistory = payload.data;
      }
    );
  },
});

export const { reducer: rootReducer, reducerPath: rootReducerPath } = rootSlice;
export const {
  getCategories,
  getCountries,
  getTopHistory,
  getSelectedCountry,
} = rootSlice.selectors;
export const {
  setCountries,
  setCategories,
  setTopHistory,
  setSelectedCountry,
} = rootSlice.actions;
