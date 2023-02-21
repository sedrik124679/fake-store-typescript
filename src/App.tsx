import React, {useCallback, useState} from 'react';
import NavBar from "./components/NavBar/NavBar";
import {Badge, Container} from "react-bootstrap";
import SearchBar from "./components/SearchBar/SearchBar";
import CategoriesSection from "./components/CategoriesSection/CategoriesSection";
import ProductsSection from "./components/ProductsSection/ProductsSection";
import AuthorizationModal from "./components/AuthorizationModal/AuthorizationModal";
import Cart from "./components/Cart/Cart";
import {ICart} from "./models/IStore";
import {BsFillCartCheckFill} from "react-icons/bs";
import styles from "./styles/app.module.css";

function App() {
    const [isAuthorize, setIsAuthorize] = useState(localStorage.getItem('token'));
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showCart, setShowCart] = useState(false);
    const handleCartClose = useCallback(() => setShowCart(false), []);
    const handleCartShow = useCallback(() => setShowCart(true), []);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleLoginClose = useCallback(() => setShowLoginModal(false), []);
    const handleLoginShow = useCallback(() => setShowLoginModal(true), []);
    const [userCart, setUserCart] = useState<ICart>({
        id: 3,
        userId: 1,
        date: new Date(Date.now()).toISOString().split('T')[0],
        products: []
    })

    return (
        <div>
            <NavBar
                isAuthorize={isAuthorize}
                setIsAuthorize={setIsAuthorize}
                handleShow={handleCartShow}
                handleLoginModalShow={handleLoginShow}
                productsCount={userCart.products.length}
            />
            <Container>
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
                <div>
                    <CategoriesSection
                        setSelectedCategory={setSelectedCategory}
                    />
                    <ProductsSection
                        setUserCart={setUserCart}
                        userCart={userCart}
                        setSearchQuery={setSearchQuery}
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>
            </Container>
            <Cart
                handleLoginShow={handleLoginShow}
                setUserCart={setUserCart}
                userCart={userCart}
                show={showCart}
                handleClose={handleCartClose}
                isAuthorize={isAuthorize}
            />
            <AuthorizationModal
                setIsAuthorize={setIsAuthorize}
                show={showLoginModal}
                handleClose={handleLoginClose}
            />
            <div onClick={handleCartShow} style={{position: 'relative', cursor: 'pointer'}}>
                <span className={styles.cartIcon} style={{background: userCart.products.length ? '#ee32b4' : '#747a7e',}}>
                        <BsFillCartCheckFill color={'white'} size={24}></BsFillCartCheckFill>
                    {userCart.products.length ? <Badge style={{
                        position: 'absolute',
                        width: '16px',
                        height: '16px',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        right: '5px',
                        top: '5px',
                        background: 'black'
                    }} bg={'secondary'}>{userCart.products.length}</Badge> : null}
                    </span>
            </div>
        </div>
    );
}

export default App;
