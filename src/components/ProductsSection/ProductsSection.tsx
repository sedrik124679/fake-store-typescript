import React, {FC} from 'react';
import {Col, Row} from "react-bootstrap";
import {fakeStoreAPI} from "../../services/fakeStore";
import ProductCard from "./ProductCard";
import {useProducts} from "../../hooks/hooks";

interface ProductsSectionProps {
    selectedCategory: string,
    setSelectedCategory: (prev: string) => void,
    searchQuery: string
}

const ProductsSection: FC<ProductsSectionProps> = ({selectedCategory, setSelectedCategory, searchQuery}) => {

    const {data: selectedProducts, error, isLoading} = fakeStoreAPI.useGetProductsByCategoryQuery(selectedCategory);
    const {data: allProducts, error: allProductsError, isLoading: allProductsLoading} = fakeStoreAPI.useGetAllProductsQuery(5);
    const searchedAllProducts = useProducts(allProducts || [], searchQuery);
    const searchedSelectedProducts = useProducts(selectedProducts || [], searchQuery);

    if (isLoading || allProductsLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div style={{marginTop: '2rem'}}>
            <h4>{selectedCategory ? selectedCategory[0].toUpperCase() + selectedCategory.slice(1) : 'All'}:</h4>
            <Row xs={1} md={2} lg={4} className="g-4">
                {
                    selectedCategory
                        ? searchedSelectedProducts && searchedSelectedProducts.map(product => <Col key={product.id}>
                        <ProductCard setSelectedCategory={setSelectedCategory} productItem={product} />
                        </Col>
                    )
                        : searchedAllProducts && searchedAllProducts.map(product => <Col key={product.id}>
                        <ProductCard setSelectedCategory={setSelectedCategory} productItem={product} />
                        </Col>
                    )
                }
            </Row>
        </div>
    );
};

export default ProductsSection;
