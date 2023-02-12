import {IProduct} from "../../models/IStore";
import {createSlice} from "@reduxjs/toolkit";

interface ProductsSlice {
    allProducts: IProduct[],
    error: string,
    isLoading: boolean
}

const initialState: ProductsSlice = {
    allProducts: [],
    error: '',
    isLoading: false
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {}
})

export const {} = productsSlice.actions;

export default productsSlice.reducer;
