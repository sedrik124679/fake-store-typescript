import React, {FC} from 'react';
import {Container, Navbar} from "react-bootstrap";
import {BsFillCartCheckFill} from "react-icons/bs";

interface NavBarProps {
    handleShow: () => void
}

const NavBar: FC<NavBarProps> = ({ handleShow }) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    Eugene Krabs
                </Navbar.Brand>
                <BsFillCartCheckFill onClick={handleShow} style={{cursor: 'pointer'}} color={'white'} size={24} />
            </Container>
        </Navbar>
    );
};

export default NavBar;
