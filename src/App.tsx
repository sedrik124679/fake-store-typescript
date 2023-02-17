import React, {useCallback, useState} from 'react';
import NavBar from "./components/NavBar/NavBar";
import {Container} from "react-bootstrap";
import SearchBar from "./components/SearchBar/SearchBar";
import OffCanvas from "./components/OffCanvas/OffCanvas";
import CategoriesSection from "./components/CategoriesSection/CategoriesSection";
import ProductsSection from "./components/ProductsSection/ProductsSection";
import AuthorizationModal from "./components/AuthorizationModal/AuthorizationModal";

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


    return (
        <div>
            <NavBar
                isAuthorize={isAuthorize}
                setIsAuthorize={setIsAuthorize}
                handleShow={handleCartShow}
                handleLoginModalShow={handleLoginShow}
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
                        setSearchQuery={setSearchQuery}
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>
            </Container>
            <OffCanvas show={showCart}
                       handleClose={handleCartClose}
            />
            <AuthorizationModal
                setIsAuthorize={setIsAuthorize}
                show={showLoginModal}
                handleClose={handleLoginClose}
            />
        </div>
    );
}

export default App;
