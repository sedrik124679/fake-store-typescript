import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {fakeStoreAPI} from "../../services/fakeStore";
import ProductCard from "./ProductCard";
import {useProducts} from "../../hooks/hooks";
import MySelect from "../MySelect/MySelect";
import styles from "../../styles/products.module.css"
import {ICart} from "../../models/IStore";

interface ProductsSectionProps {
    selectedCategory: string,
    setSelectedCategory: (prev: string) => void,
    searchQuery: string,
    setSearchQuery: (prev: string) => void,
    setUserCart: Dispatch<SetStateAction<ICart>>
    userCart: ICart
}

const limits = [
    {label: 'Show 5', value: '5'},
    {label: 'Show 10', value: '10'},
    {label: 'Show 20', value: '20'}
]

const ProductsSection: FC<ProductsSectionProps> = ({setUserCart, userCart, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery}) => {

    const [limit, setLimit] = useState<string>('10');
    const {data: selectedProducts, error, isLoading} = fakeStoreAPI.useGetProductsByCategoryQuery({category: selectedCategory, limit});
    const {data: allProducts, error: allProductsError, isLoading: allProductsLoading} = fakeStoreAPI.useGetAllProductsQuery(limit);
    const searchedAllProducts = useProducts(allProducts || [], searchQuery);
    const searchedSelectedProducts = useProducts(selectedProducts || [], searchQuery);

    if (isLoading || allProductsLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div style={{marginTop: '2rem', marginBottom: '2rem'}}>
            <div className={styles.productsTitle}>
                <h4>{selectedCategory ? selectedCategory[0].toUpperCase() + selectedCategory.slice(1) : 'All'}:</h4>
                <MySelect styles={{width: '10%'}}
                          onChange={setLimit}
                          values={limits}
                          defaultValue={limit}
                />
            </div>
            <Row xs={1} md={2} lg={4} className="g-4">
                {
                    selectedCategory
                        ? searchedSelectedProducts && searchedSelectedProducts.map(product => <Col key={product.id}>
                        <ProductCard setUserCart={setUserCart} userCart={userCart} setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} productItem={product} />
                        </Col>
                    )
                        : searchedAllProducts && searchedAllProducts.map(product => <Col key={product.id}>
                        <ProductCard setUserCart={setUserCart} userCart={userCart} setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} productItem={product} />
                        </Col>
                    )
                }
            </Row>
        </div>
    );
};

export default ProductsSection;
