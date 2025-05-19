import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiData, HistoryQueryArgs } from './type';
import type { Category, Country, TopHistory } from '../type';
import { env } from '../constants';

const baseUrl = env.PROD ? env.API_URL : document.location.origin;

export const api = createApi({
  tagTypes: ['country', 'category', 'topHistory'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    mode: 'cors',
  }),
  endpoints: (build) => ({
    getCountries: build.query<ApiData<Country[]>, void>({
      providesTags: ['category'],
      query: () => {
        return {
          url: '/v1/geo',
          method: 'GET',
          params: {
            [env.API_QUERY_KEY]: env.API_QUERY_VALUE,
          },
        };
      },
    }),
    getCategories: build.query<ApiData<Category[]>, void>({
      providesTags: ['country'],
      query: () => {
        return {
          url: '/v1/applicationCategory',
          params: {
            [env.API_QUERY_KEY]: env.API_QUERY_VALUE,
            platform: 1,
          },
        };
      },
    }),
    getTopHistory: build.query<ApiData<TopHistory>, HistoryQueryArgs>({
      providesTags: ['topHistory'],
      query: ({ countryId, dateFrom, dateTo }) => {
        return {
          url: `/package/top_history/9379/${countryId}`,
          params: {
            [env.API_QUERY_KEY]: env.API_QUERY_VALUE,
            date_from: dateFrom,
            date_to: dateTo,
            platforms: 1,
          },
        };
      },
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetCategoriesQuery,
  useGetTopHistoryQuery,
  useLazyGetCountriesQuery,
  useLazyGetCategoriesQuery,
  useLazyGetTopHistoryQuery,
} = api;
