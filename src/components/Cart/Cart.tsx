import React, {FC} from 'react';
import {Accordion, Offcanvas} from "react-bootstrap";
import {fakeStoreAPI} from "../../services/fakeStore";
import CartItem from "./CartItem";
import styles from "../../styles/cart.module.css";

interface OffCanvasProps {
    show: boolean,
    handleClose: () => void,
    isAuthorize: string | null
}

const Cart: FC<OffCanvasProps> = ({show, handleClose, isAuthorize}) => {

    const {data: userCarts, error, isLoading} = fakeStoreAPI.useGetUserCartsQuery(localStorage.getItem('userId'));

    if (isLoading) {
        return null
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement={'end'}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={styles.offcanvas}>
                <Accordion className={styles.accordion}>
                    {userCarts && userCarts.map((cartItem, index) => {
                        return <CartItem
                            cartItem={cartItem}
                            index={index}
                            key={`cart-${index}`}
                        />
                    })}
                </Accordion>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;
