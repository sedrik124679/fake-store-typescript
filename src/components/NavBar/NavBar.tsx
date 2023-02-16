import React, {FC} from 'react';
import {Button, Container, Navbar} from "react-bootstrap";
import {BsFillCartCheckFill} from "react-icons/bs";

interface NavBarProps {
    handleShow: () => void,
    handleLoginModalShow: () => void
}

const NavBar: FC<NavBarProps> = ({ handleShow, handleLoginModalShow }) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    Eugene Krabs
                </Navbar.Brand>
                <div>
                    <Button style={{marginRight: '2rem'}} onClick={handleLoginModalShow}>
                        Login
                    </Button>
                    <BsFillCartCheckFill onClick={handleShow} style={{cursor: 'pointer'}} color={'white'} size={24} />
                </div>
            </Container>
        </Navbar>
    );
};

export default NavBar;
