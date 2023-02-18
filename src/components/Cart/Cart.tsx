import React, {FC} from 'react';
import {Accordion, Offcanvas} from "react-bootstrap";
import {fakeStoreAPI} from "../../services/fakeStore";
import CartItem from "./CartItem";
import styles from "../../styles/cart.module.css";
import {ICart} from "../../models/IStore";
import {TbH5} from "react-icons/all";

interface OffCanvasProps {
    show: boolean,
    handleClose: () => void,
    isAuthorize: string | null,
    userCart: ICart
}

const Cart: FC<OffCanvasProps> = ({show, handleClose, isAuthorize, userCart}) => {

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

                <Accordion>
                    {/*{userCart && userCart.map((cartItem, index) => {*/}
                    {/*    return <CartItem*/}
                    {/*        cartItem={cartItem}*/}
                    {/*        index={index}*/}
                    {/*        key={`cart-${index}`}*/}
                    {/*    />*/}
                    {/*})}*/}
                    {userCart.products.length
                        ? <>
                            <h5>Active carts</h5>
                            <CartItem
                                cartItem={userCart}
                                index={0}
                            />
                        </>
                        : <h5>You have nothing in your cart</h5>
                    }
                </Accordion>

                {localStorage.getItem('token') && <Accordion className={styles.accordion}>
                    <h5>Previous carts</h5>
                    {userCarts && userCarts.map((cartItem, index) => {
                        return <CartItem
                            cartItem={cartItem}
                            index={index}
                            key={`cart-${index}`}
                        />
                    })}
                </Accordion>}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;
