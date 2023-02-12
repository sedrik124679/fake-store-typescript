import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IProduct} from "../models/IStore";

export const fakeStoreAPI = createApi({
    reducerPath: 'fakeStoreAPI',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_STORE_API_ROUTE }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], number>({
            query: (limit: number) => ({
                url: '/products'
            }),
        }),
        getAllCategories: builder.query<string[], number>({
            query: (limit: number) => ({
                url: '/products/categories'
            })
        })
    }),
});
