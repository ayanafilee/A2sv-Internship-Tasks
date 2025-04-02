import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/" }),
  endpoints: (builder) => ({
    //get all products
    getAllProduct: builder.query({
      query: () => "/opportunities/search",
    }),
    getOpportunityById: builder.query({
      query: (id) => `/opportunities/${id}`,
    }),
  }),
});

export const { useGetAllProductQuery, useGetOpportunityByIdQuery } =
  productsApi;
