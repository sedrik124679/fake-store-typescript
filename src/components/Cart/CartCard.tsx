import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {Card, CloseButton, Image} from "react-bootstrap";
import {fakeStoreAPI} from "../../services/fakeStore";
import styles from "../../styles/cart.module.css";
import {ICart} from "../../models/IStore";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import CartRemoveModal from "./CartRemoveModal";

interface CartCardProps {
    productId: number,
    quantity: number,
    setTotalPrice: (prev: (prev: number) => number) => void,
    userCart: ICart | null,
    setUserCart: Dispatch<SetStateAction<ICart>> | null
}

const CartCard: FC<CartCardProps> = ({productId, quantity, setTotalPrice, userCart, setUserCart}) => {

    const {data: singleProduct, error, isLoading} = fakeStoreAPI.useGetSingleProductQuery(productId);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (singleProduct) {
            const total = quantity * singleProduct.price;
            setTotalPrice((prev: number) => prev + total);
        }
    }, [singleProduct])

    const handleDeleteProductFromCart = (id: number) => {
        if (userCart && setUserCart && singleProduct) {
            setUserCart({...userCart, products: [...userCart.products]
                    .filter(product => product.productId !== id)});
            setTotalPrice(prev => prev - quantity * singleProduct.price)
        }
    }

    const handleChangeQuantityPlus = (id: number) => {
        if (userCart && setUserCart) {
            setUserCart({
                ...userCart, products: [...userCart.products].map(product => {
                    if (product.productId === id && singleProduct) {
                        product.quantity++;
                        setTotalPrice((prev: number) => prev + singleProduct.price);
                        return product
                    }
                    return product
                })
            })
        }
    }

    const handleChangeQuantityMinus = (id: number) => {
        if (userCart && setUserCart) {
            setUserCart({
                ...userCart, products: [...userCart.products].map(product => {
                    if (product.productId === id && singleProduct) {
                        if (product.quantity - 1 > 0) {
                            product.quantity--;
                            setTotalPrice((prev: number) => prev - singleProduct.price);
                            return product
                        }
                        handleShow();
                    }
                    return product
                })
            })
        }
    }

    if (isLoading) {
        return null
    }

    return (
        <>
            <Card className={styles.card}>
                {singleProduct && <>
                    <Card.Body className={styles.cardBody}>
                        <Image className={styles.cardImage} src={singleProduct.image} alt={'single product image'}/>
                        <Card.Subtitle title={singleProduct.title}
                                       className={styles.Subtitle}>{singleProduct.title.length > 25 ? singleProduct.title.slice(0, 25) + '...' : singleProduct.title}</Card.Subtitle>
                        {userCart && <CloseButton title={'Remove from cart'}
                                                  onClick={() => handleDeleteProductFromCart(singleProduct.id)}/>}
                    </Card.Body>
                    <Card.Footer className={styles.cardFooter}>
                    <span>
                        Total: {Math.trunc(quantity * singleProduct.price)}$
                    </span>
                        <div className={styles.cardQuantityContainer}>
                            {userCart && <AiOutlineMinus onClick={() => handleChangeQuantityMinus(productId)}
                                                         style={{cursor: 'pointer'}}/>}
                            <Card.Subtitle className={styles.Subtitle}
                            >x{quantity}</Card.Subtitle>
                            {userCart && <AiOutlinePlus onClick={() => handleChangeQuantityPlus(productId)}
                                                        style={{cursor: 'pointer'}}/>}
                        </div>
                    </Card.Footer>
                </>}
            </Card>
            {singleProduct && show &&
                <CartRemoveModal
                    handleClose={handleClose}
                    show={show}
                    setUserCart={setUserCart}
                    userCart={userCart}
                    productId={productId}
                    productName={singleProduct.title}
                    setTotalPrice={setTotalPrice}
                    price={singleProduct.price}
                />
            }
        </>
    );
};

export default CartCard;
