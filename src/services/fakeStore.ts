import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IProduct} from "../models/IStore";

interface IGetProductsByCategoryQuery {
    category: string,
    limit: string
}

export const fakeStoreAPI = createApi({
    reducerPath: 'fakeStoreAPI',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_STORE_API_ROUTE }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], string>({
            query: (limit: string) => ({
                url: `/products?limit=${limit}`,
            }),
        }),
        getAllCategories: builder.query<string[], number>({
            query: (limit: number) => ({
                url: '/products/categories'
            })
        }),
        getProductsByCategory: builder.query<IProduct[], IGetProductsByCategoryQuery>({
            query: (params: IGetProductsByCategoryQuery) => ({
                url: `/products/category/${params.category}?limit=${params.limit}`
            })
        }),
    }),
});
