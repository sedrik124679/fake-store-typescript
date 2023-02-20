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
    setUserCarts: Dispatch<SetStateAction<ICart[]>>
}

const CartItem: FC<CartItemProps> = ({setUserCarts, cartItem, index, userCart, setUserCart, userCarts}) => {

    const {id, userId, products, date} = cartItem;
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [modalShow, setModalShow] = useState(false);
    const [addProducts, response] = fakeStoreAPI.useAddProductsToCartMutation();

    const handleBuy = async (userCart: ICart | undefined) => {
        if (userCart) {
            await addProducts(userCart);
        }
    }

    useEffect(() => {
        if (response) {
            if (response.data) {
                setUserCarts([...userCarts, response.data].reverse());
            }
        }
    }, [response])

    console.log(userCarts)

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
                                         onClick={() => setModalShow(true)}
                                         className={styles.accordionButton}
                    >Make an order</Button>
                    }
                </Accordion.Body>
            </Accordion.Item>
            <Modal
                onHide={() => setModalShow(false)}
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleBuy(userCart)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CartItem;
