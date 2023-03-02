import React, {useCallback, useState} from 'react';
import NavBar from "./components/NavBar/NavBar";
import {ICart} from "./models/IStore";
import Footer from "./components/Footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthorizationModal from "./components/AuthorizationModal/AuthorizationModal";
import Home from "./pages/Home";

function App() {
    const [isAuthorize, setIsAuthorize] = useState(localStorage.getItem('token'));
    const [showCart, setShowCart] = useState(false);
    const handleCartShow = useCallback(() => setShowCart(true), []);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleLoginClose = useCallback(() => setShowLoginModal(false), []);
    const handleLoginShow = useCallback(() => setShowLoginModal(true), []);
    const handleCartClose = useCallback(() => setShowCart(false), []);
    const [userCart, setUserCart] = useState<ICart>({
        id: 3,
        userId: 1,
        date: new Date(Date.now()).toISOString().split('T')[0],
        products: []
    });

    return (
        <BrowserRouter>
            <NavBar
                isAuthorize={isAuthorize}
                setIsAuthorize={setIsAuthorize}
                handleShow={handleCartShow}
                handleLoginModalShow={handleLoginShow}
                productsCount={userCart.products.length}
            />
            <Routes>
                <Route path="*" element={<Home userCart={userCart}
                                               showCart={showCart}
                                               setUserCart={setUserCart}
                                               handleCartShow={handleCartShow}
                                               handleCartClose={handleCartClose}
                                               handleLoginClose={handleLoginClose}
                                               handleLoginShow={handleLoginShow}
                                               isAuthorize={isAuthorize || null}
                                               setIsAuthorize={setIsAuthorize}
                                        />
                }
                />
            </Routes>
            <Footer/>
            <AuthorizationModal
                setIsAuthorize={setIsAuthorize}
                show={showLoginModal}
                handleClose={handleLoginClose}
            />
        </BrowserRouter>
    );
}

export default App;
