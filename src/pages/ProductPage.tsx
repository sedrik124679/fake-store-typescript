import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';

interface Product {
    name: string;
    image: string;
    description: string;
    rating: number;
    numReviews: number;
    price: number;
    category: string;
}

interface Props {
    product: Product;
}

const ProductPage: React.FC<Props> = ({ product }) => {
    const { name, image, description, rating, numReviews, price, category } = product;

    return (
        <Container>
            <Row className="mt-3">
                <Col md={6}>
                    <Image src={image} fluid />
                </Col>
                <Col md={6}>
                    <h3>{name}</h3>
                    <p>Price: ${price}</p>
                    <p>Category: {category}</p>
                    <p>Description: {description}</p>
                    <p>
                        Rating: {rating} from {numReviews} reviews
                    </p>
                    <Button variant="primary">Add to Cart</Button>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Header>Product Details</Card.Header>
                        <Card.Body>
                            <ul>
                                <li>Size: </li>
                                <li>Color: </li>
                                <li>Material: </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Header>Reviews</Card.Header>
                        <Card.Body>
                            <ul>
                                <li>Review 1</li>
                                <li>Review 2</li>
                                <li>Review 3</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;
