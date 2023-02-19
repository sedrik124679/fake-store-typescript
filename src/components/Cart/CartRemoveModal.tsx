import React, {Dispatch, FC, SetStateAction} from 'react';
import {Button, Modal} from "react-bootstrap";
import {ICart} from "../../models/IStore";

interface CartRemoveModalProps {
    productName: string,
    productId: number,
    userCart: ICart | null,
    setUserCart: Dispatch<SetStateAction<ICart>> | null,
    show: boolean,
    handleClose: () => void,
    setTotalPrice: (prev: (prev: number) => number) => void,
    price: number
}

const CartRemoveModal: FC<CartRemoveModalProps> = ({
                                                       setTotalPrice,
                                                       handleClose,
                                                       productName,
                                                       productId,
                                                       userCart,
                                                       setUserCart,
                                                       show,
                                                       price
                                                   }) => {

    const handleCancelAction = (id: number) => {
        handleClose();
    }

    const handleSubmitAction = (id: number) => {
        if (userCart && setUserCart) {
            setUserCart({
                ...userCart, products: [...userCart.products]
                    .filter(product => product.productId !== id)
            });
            setTotalPrice(prev => prev - price);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove from cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove {productName} from the cart?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCancelAction(productId)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => handleSubmitAction(productId)}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CartRemoveModal;
