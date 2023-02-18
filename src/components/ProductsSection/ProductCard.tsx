import React, {Dispatch, FC, SetStateAction} from 'react';
import {Button, Card} from "react-bootstrap";
import {ICart, IProduct} from "../../models/IStore";
import FancyBox from "../FancyBox/FancyBox";
import {BsFullscreenExit} from "react-icons/bs";
import styles from "../../styles/products.module.css";

interface ProductCardProps {
    productItem: IProduct,
    setSelectedCategory: (prev: string) => void,
    setSearchQuery: (prev: string) => void,
    setUserCart: Dispatch<SetStateAction<ICart>>
    userCart: ICart
}

const ProductCard: FC<ProductCardProps> = ({userCart, setUserCart, productItem, setSelectedCategory, setSearchQuery}) => {
    const {image, title, category, price, rating, description, id} = productItem;

    const handleChangeCategory = (category: string): void => {
        setSelectedCategory(category);
        setSearchQuery('')
    }

    const handleAddToCart = (id: number) => {
        const existedProduct = userCart.products.find(product => product.productId === id);
        if (existedProduct) {
            const newProducts = [...userCart.products].map(product => {
                if (product.productId === existedProduct.productId) {
                    product.quantity++
                    return product
                }
                return product
            });
            setUserCart({...userCart, products: [...newProducts]});
        } else {
            setUserCart({...userCart, products: [...userCart.products, {productId: id, quantity: 1}]});
        }
    }

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
                <Card.Subtitle style={{color: 'gray', cursor: 'pointer'}} onClick={() => handleChangeCategory(category)}>{category[0].toUpperCase() + category.slice(1)}</Card.Subtitle>
                <Card.Text>{price} $</Card.Text>
            </Card.Body>
            <Card.Footer className={styles.cardFooter}>
                <Button style={{alignSelf: 'flex-end'}} onClick={() => handleAddToCart(id)}>Add to cart</Button>
            </Card.Footer>
        </Card>
    );
};

export default ProductCard;
