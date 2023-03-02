import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {Accordion, Button, Modal} from "react-bootstrap";
import {ICart} from "../../models/IStore";
import {formatDate} from "../../utils/helpers";
import CartCard from "./CartCard";
import styles from "../../styles/cart.module.css";
import {fakeStoreAPI} from "../../services/fakeStore";

interface CartItemProps {
    cartItem: ICart,
    index: number,
    userCart?: ICart,
    setUserCart?: Dispatch<SetStateAction<ICart>>,
    userCarts: ICart[],
    setUserCarts: Dispatch<SetStateAction<ICart[]>>,
    handleLoginShow: () => void
}

const CartItem: FC<CartItemProps> = ({
                                         handleLoginShow,
                                         cartItem,
                                         index,
                                         userCart,
                                         setUserCart,
                                         userCarts,
                                         setUserCarts
                                     }) => {
    const {id, userId, products, date} = cartItem;
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const [addProducts, response] = fakeStoreAPI.useAddProductsToCartMutation();
    const [showSubmitOrderModal, setShowSubmitOrderModal] = useState<boolean>(false);

    const handleBuy = async (userCart: ICart | undefined) => {
        if (userCart && localStorage.getItem('token')) {
            await addProducts(userCart);
            return
        }
        setShowSubmitOrderModal(false);
        handleLoginShow();
    }

    useEffect(() => {
        if (response) {
            if (response.data && userCart) {
                setUserCarts && setUserCarts([response.data, ...userCarts]);
                setTotalPrice(prev => prev - totalPrice);
                setUserCart && setUserCart({
                    id: 3,
                    userId: 1,
                    date: new Date(Date.now()).toISOString().split('T')[0],
                    products: []
                });
            }
        }
    }, [response]);

    return (
        <>
            <Accordion.Item eventKey={String(index)}>
                <Accordion.Header>{formatDate(date)} / Total: {Math.trunc(totalPrice)}$</Accordion.Header>
                <Accordion.Body className={styles.accordionBody}>
                    {products.map(product => {
                        return <CartCard
                            setUserCart={setUserCart || null}
                            userCart={userCart || null}
                            setTotalPrice={setTotalPrice}
                            key={`${date}-${index}-${product.productId}`}
                            productId={product.productId}
                            quantity={product.quantity}
                        />
                    })}
                    {userCart && <Button variant={'dark'}
                                         onClick={() => setShowSubmitOrderModal(true)}
                                         className={styles.accordionButton}
                    >Make an order</Button>
                    }
                </Accordion.Body>
            </Accordion.Item>
            <Modal
                onHide={() => setShowSubmitOrderModal(false)}
                show={showSubmitOrderModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Your cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>To be paid: {Math.trunc(totalPrice)}$</Modal.Title>
                    {products.map(product => {
                        return <CartCard
                            setUserCart={null}
                            userCart={null}
                            setTotalPrice={() => {}}
                            key={`${date}-${index}-${product.productId}`}
                            productId={product.productId}
                            quantity={product.quantity}
                        />
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleBuy(userCart)}>Submit an order</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CartItem;
