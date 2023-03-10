import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {Accordion, Offcanvas} from "react-bootstrap";
import {fakeStoreAPI} from "../../services/fakeStore";
import CartItem from "./CartItem";
import styles from "../../styles/cart.module.css";
import {ICart} from "../../models/IStore";

interface OffCanvasProps {
    show: boolean,
    handleClose: () => void,
    isAuthorize: string | null,
    userCart: ICart,
    setUserCart: Dispatch<SetStateAction<ICart>>,
    handleLoginShow: () => void
}

const Cart: FC<OffCanvasProps> = ({handleLoginShow, show, handleClose, isAuthorize, userCart, setUserCart}) => {

    const {data: userCarts, error, isLoading} = fakeStoreAPI.useGetUserCartsQuery(localStorage.getItem('userId'));
    const [userCartsState, setUserCartsState] = useState<ICart[]>([]);

    useEffect(() => {
        userCarts && setUserCartsState([...userCarts]);
    }, [userCarts])

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
                    {userCart.products.length
                        ? <>
                            <h5>Active carts</h5>
                            <CartItem
                                handleLoginShow={handleLoginShow}
                                userCarts={userCartsState}
                                setUserCarts={setUserCartsState}
                                setUserCart={setUserCart}
                                userCart={userCart}
                                cartItem={userCart}
                                index={0}
                            />
                        </>
                        : <h5>You have nothing in your cart</h5>
                    }
                </Accordion>

                {localStorage.getItem('token') && <Accordion className={styles.accordion}>
                    <h5>Previous carts</h5>
                    {userCarts && userCartsState.map((cartItem, index) => {
                        return <CartItem
                            handleLoginShow={handleLoginShow}
                            userCarts={userCartsState}
                            setUserCarts={setUserCartsState}
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
