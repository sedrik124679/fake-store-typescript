import React, {FC} from 'react';
import {Button, Card, Modal} from "react-bootstrap";
import {IProduct} from "../../models/IStore";
import ProductRating from "./ProductRating";

interface IProductModalProps {
    product: IProduct,
    showModal: boolean,
    handleClose: () => void,
    handleAddToCart: (id: number) => void
}

const ProductModal: FC<IProductModalProps> = ({
                                                  product,
                                                  showModal,
                                                  handleClose,
                                                  handleAddToCart
}) => {

    const {
        id,
        title,
        image,
        category,
        price,
        rating,
        description
    } = product;

    return (
        <Modal
            backdrop="static"
            show={showModal}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card style={{border: 'none'}}>
                    <Card.Img style={{width: '40%', margin: '0 auto'}} variant="top" src={image}/>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            {category}
                        </Card.Subtitle>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>{description}</Card.Text>
                        <Card.Text>{`Price: $${price}`}</Card.Text>
                        <Card.Text as={'div'} style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{marginRight: '1rem'}}>{`Rating:`}</span>
                            <ProductRating rating={rating.rate} numReviews={rating.count} />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => {
                    handleAddToCart(id);
                    handleClose();
                }}>Add to Cart</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;
