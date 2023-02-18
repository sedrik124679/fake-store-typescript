import React, {FC, useState} from 'react';
import {Button, Container, Navbar} from "react-bootstrap";
import {BsFillCartCheckFill} from "react-icons/bs";

interface NavBarProps {
    handleShow: () => void,
    handleLoginModalShow: () => void,
    isAuthorize: string | null,
    setIsAuthorize: (prev: string) => void
}

const NavBar: FC<NavBarProps> = ({ handleShow, handleLoginModalShow, isAuthorize, setIsAuthorize }) => {

    const logout = () => {
        localStorage.clear();
        setIsAuthorize('');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    Eugene Krabs
                </Navbar.Brand>
                <div>
                    {isAuthorize
                        ? <Button onClick={logout} style={{marginRight: '2rem'}}>
                            Logout
                        </Button>
                        : <Button style={{marginRight: '2rem'}} onClick={handleLoginModalShow}>
                            Login
                        </Button>
                    }
                    <BsFillCartCheckFill onClick={handleShow} style={{cursor: 'pointer'}} color={'white'} size={24} />
                </div>
            </Container>
        </Navbar>
    );
};

export default NavBar;
