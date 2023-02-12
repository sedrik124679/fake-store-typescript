import React, {FC} from 'react';
import {Button, Card} from "react-bootstrap";
import {IProduct} from "../../models/IStore";
import styles from "../../styles/products.module.css";

interface ProductCardProps {
    productItem: IProduct
}

const ProductCard: FC<ProductCardProps> = ({productItem}) => {
    const {image, title, category, price, rating, description} = productItem;
    return (
        <Card>
            <Card.Header className={styles.cardHeader}>
                <Card.Img className={styles.cardImage} src={image}/>
            </Card.Header>
            <Card.Body className={styles.cardBody}>
                <Card.Title>{title.length > 25 ? title.slice(0, 40).trim() + '...' : title}</Card.Title>
                <Card.Subtitle style={{color: 'gray'}}>{category[0].toUpperCase() + category.slice(1)}</Card.Subtitle>
                <Card.Text>{price} $</Card.Text>
            </Card.Body>
            <Card.Footer className={styles.cardFooter}>
                <Button style={{alignSelf: 'flex-end'}}>Add to cart</Button>
            </Card.Footer>
        </Card>
    );
};

export default ProductCard;
