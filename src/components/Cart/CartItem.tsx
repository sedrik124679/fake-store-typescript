import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {Accordion, Card, Image} from "react-bootstrap";
import {ICart} from "../../models/IStore";
import {formatDate} from "../../utils/helpers";
import CartCard from "./CartCard";

interface CartItemProps {
    cartItem: ICart,
    index: number,
    userCart?: ICart,
    setUserCart?: Dispatch<SetStateAction<ICart>>
}

const CartItem: FC<CartItemProps> = ({cartItem, index, userCart, setUserCart}) => {

    const {id, userId, products, date} = cartItem;
    const [totalPrice, setTotalPrice] = useState<number>(0);

    return (
        <Accordion.Item eventKey={String(index)}>
            <Accordion.Header>{formatDate(date)} / Total: {Math.trunc(totalPrice)}$</Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default CartItem;
