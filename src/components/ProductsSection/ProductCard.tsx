import React, {FC} from 'react';
import {Button, Card} from "react-bootstrap";
import {IProduct} from "../../models/IStore";
import styles from "../../styles/products.module.css";
import FancyBox from "../FancyBox/FancyBox";
import {BsFullscreenExit} from "react-icons/bs";

interface ProductCardProps {
    productItem: IProduct,
    setSelectedCategory: (prev: string) => void
}

const ProductCard: FC<ProductCardProps> = ({productItem, setSelectedCategory}) => {
    const {image, title, category, price, rating, description} = productItem;
    return (
        <Card>
            <Card.Header className={styles.cardHeader}>
                <FancyBox>
                    <BsFullscreenExit size={28} className={styles.fullScreenIcon} data-fancybox='gallery' data-src={image}/>
                    <Card.Img className={styles.cardImage} src={image} />
                </FancyBox>
            </Card.Header>
            <Card.Body className={styles.cardBody}>
                <Card.Title>{title.length > 25 ? title.slice(0, 40).trim() + '...' : title}</Card.Title>
                <Card.Subtitle style={{color: 'gray', cursor: 'pointer'}} onClick={() => setSelectedCategory(category)}>{category[0].toUpperCase() + category.slice(1)}</Card.Subtitle>
                <Card.Text>{price} $</Card.Text>
            </Card.Body>
            <Card.Footer className={styles.cardFooter}>
                <Button style={{alignSelf: 'flex-end'}}>Add to cart</Button>
            </Card.Footer>
        </Card>
    );
};

export default ProductCard;
