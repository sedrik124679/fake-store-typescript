import React, {FC} from 'react';
import {Offcanvas} from "react-bootstrap";

interface OffCanvasProps {
    show: boolean,
    handleClose: () => void
}

const OffCanvas: FC<OffCanvasProps> = ({ show, handleClose }) => {
    return (
        <Offcanvas show={show} onHide={handleClose} placement={'end'}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OffCanvas;
