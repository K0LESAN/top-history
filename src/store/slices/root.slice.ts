import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category, Country, TopHistory } from '../../type';
import { api } from '../../api';

interface RootState {
  countries: Country[];
  categories: Category[];
  topHistory: TopHistory;
  selectedCountry?: Country;
  dateFrom: string;
  dateTo: string;
}

const initialState: RootState = {
  countries: [],
  categories: [],
  topHistory: {},
  dateFrom: '',
  dateTo: '',
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
    setDateFrom: (state, { payload }: PayloadAction<string>) => {
      state.dateFrom = payload;
    },
    setDateTo: (state, { payload }: PayloadAction<string>) => {
      state.dateTo = payload;
    },
  },
  selectors: {
    getCountries: (state) => state.countries,
    getCategories: (state) => state.categories,
    getTopHistory: (state) => state.topHistory,
    getSelectedCountry: (state) => state.selectedCountry,
    getDateFrom: (state) => state.dateFrom,
    getDateTo: (state) => state.dateTo,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.getCountries.matchFulfilled,
        (state, { payload }) => {
          state.countries = payload.data;

          if (!state.selectedCountry) {
            state.selectedCountry = payload.data[0];
          }
        }
      )
      .addMatcher(
        api.endpoints.getCategories.matchFulfilled,
        (state, { payload }) => {
          state.categories = payload.data;
        }
      )
      .addMatcher(
        api.endpoints.getTopHistory.matchFulfilled,
        (state, { payload, meta }) => {
          state.topHistory = payload.data;
          state.dateFrom = meta.arg.originalArgs.dateFrom;
          state.dateTo = meta.arg.originalArgs.dateTo;
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
  getDateFrom,
  getDateTo,
} = rootSlice.selectors;
export const {
  setCountries,
  setCategories,
  setTopHistory,
  setSelectedCountry,
  setDateFrom,
  setDateTo,
} = rootSlice.actions;
