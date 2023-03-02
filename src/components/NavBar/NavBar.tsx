import React, {FC} from 'react';
import {Badge, Button, Container, Navbar} from "react-bootstrap";
import {BsFillCartCheckFill} from "react-icons/bs";
import styles from "../../styles/navbar.module.css";
import {Link} from "react-router-dom";

interface NavBarProps {
    handleShow: () => void,
    handleLoginModalShow: () => void,
    isAuthorize: string | null,
    setIsAuthorize: (prev: string) => void,
    productsCount: number
}

const NavBar: FC<NavBarProps> = ({handleShow, handleLoginModalShow, isAuthorize, setIsAuthorize, productsCount}) => {

    const logout = () => {
        localStorage.clear();
        setIsAuthorize('');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to={'/'}>
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
                    <div onClick={handleShow} className={styles.cartIconContainer}>
                <span>
                        <BsFillCartCheckFill color={'white'} size={24}></BsFillCartCheckFill>
                    {productsCount ? <Badge style={{
                        position: 'absolute',
                        width: '12px',
                        height: '16px',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        right: '-2px',
                        top: '0'
                    }} className={styles.badge} bg="secondary">{productsCount}</Badge> : null}
                    </span>
                    </div>
                </div>
            </Container>
        </Navbar>
    );
};

export default NavBar;
