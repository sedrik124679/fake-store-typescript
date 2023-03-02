import { useMemo } from "react";
import { IProduct } from "../models/IStore";

export const useProducts = (products: IProduct[], query: string): IProduct[] => {
    const searchedProducts = useMemo(() => {
        return products.filter(products => products.title.toLowerCase().includes(query.toLowerCase()))
    }, [products, query]);

    return searchedProducts;
}
