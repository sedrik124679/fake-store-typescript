import React, {FC, useState} from 'react';
import {Accordion, Card, Image} from "react-bootstrap";
import {ICart} from "../../models/IStore";
import {formatDate} from "../../utils/helpers";
import CartCard from "./CartCard";

interface CartItemProps {
    cartItem: ICart,
    index: number
}

const CartItem: FC<CartItemProps> = ({cartItem, index}) => {

    const {id, userId, products, date} = cartItem;
    const [totalPrice, setTotalPrice] = useState<number>(0);

    return (
        <Accordion.Item eventKey={String(index)}>
            <Accordion.Header>{formatDate(date)} / Total: {totalPrice}$</Accordion.Header>
            <Accordion.Body>
                {products.map(product => {
                    return <CartCard
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
