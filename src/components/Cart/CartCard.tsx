import React, {FC, useEffect} from 'react';
import {Card, Image} from "react-bootstrap";
import {fakeStoreAPI} from "../../services/fakeStore";
import styles from "../../styles/cart.module.css";

interface CartCardProps {
    productId: number,
    quantity: number,
    setTotalPrice: (prev: (prev: number) => number) => void,
}

const CartCard: FC<CartCardProps> = ({productId, quantity, setTotalPrice}) => {

    const {data: singleProduct, error, isLoading} = fakeStoreAPI.useGetSingleProductQuery(productId);

    useEffect(() => {
        if (singleProduct) {
            const total = quantity * singleProduct.price;
            setTotalPrice((prev: number) => prev + total);
        }
    }, [singleProduct])

    if (isLoading) {
        return null
    }

    return (
        <Card className={styles.card}>
            {singleProduct && <>
                <Card.Body className={styles.cardBody}>
                    <Image className={styles.cardImage} src={singleProduct.image} alt={'single product image'}/>
                    <Card.Subtitle className={styles.Subtitle}>{singleProduct.title.length > 20 ? singleProduct.title.slice(0, 20) + '...' : singleProduct.title}</Card.Subtitle>
                    <Card.Subtitle className={styles.Subtitle}>x{quantity}</Card.Subtitle>
                </Card.Body>
                <Card.Footer>Total: {quantity * singleProduct.price}$</Card.Footer>
            </>}
        </Card>
    );
};

export default CartCard;
