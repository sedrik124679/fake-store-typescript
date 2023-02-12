import React from 'react';
import {Col, Row} from "react-bootstrap";
import {fakeStoreAPI} from "../../services/fakeStore";
import ProductCard from "./ProductCard";

interface ProductsSectionProps {
    categoryName: string
}

const ProductsSection = () => {
    const {data: products, error, isLoading} = fakeStoreAPI.useGetAllProductsQuery(5);

    if (isLoading) {
        return <h4 style={{textAlign: 'center'}}>Loading...</h4>
    }

    return (
        <div style={{marginTop: '2rem'}}>
            <h4>All:</h4>
            <Row xs={1} md={2} lg={4} className="g-4">
                {products && products.map(product => <Col key={product.id}><ProductCard productItem={product} /></Col>)}
            </Row>
        </div>
    );
};

export default ProductsSection;
