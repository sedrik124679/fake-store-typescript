import React, {FC, useState} from 'react';
import {Badge, Button, Container, Navbar} from "react-bootstrap";
import {BsFillCartCheckFill} from "react-icons/bs";

interface NavBarProps {
    handleShow: () => void,
    handleLoginModalShow: () => void,
    isAuthorize: string | null,
    setIsAuthorize: (prev: string) => void,
    productsCount: number
}

const NavBar: FC<NavBarProps> = ({ handleShow, handleLoginModalShow, isAuthorize, setIsAuthorize, productsCount }) => {

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
                    <span onClick={handleShow} style={{cursor: 'pointer'}}>
                        <BsFillCartCheckFill color={'white'} size={24}></BsFillCartCheckFill>
                        {productsCount && <Badge style={{
                            width: '16px',
                            height: '16px',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} bg="secondary">{productsCount}</Badge>}
                    </span>
                </div>
            </Container>
        </Navbar>
    );
};

export default NavBar;
