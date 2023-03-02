import React, {Dispatch, FC, SetStateAction, useCallback, useState} from 'react';
import {Badge, Container} from "react-bootstrap";
import SearchBar from "../components/SearchBar/SearchBar";
import CategoriesSection from "../components/CategoriesSection/CategoriesSection";
import ProductsSection from "../components/ProductsSection/ProductsSection";
import Cart from "../components/Cart/Cart";
import AuthorizationModal from "../components/AuthorizationModal/AuthorizationModal";
import styles from "../styles/app.module.css";
import {BsFillCartCheckFill} from "react-icons/bs";
import {ICart} from "../models/IStore";

interface IHomeProps {
    userCart: ICart,
    setUserCart: Dispatch<SetStateAction<ICart>>,
    handleCartShow: () => void,
    handleCartClose: () => void,
    handleLoginClose: () => void,
    handleLoginShow: () => void,
    isAuthorize: string | null,
    setIsAuthorize: Dispatch<SetStateAction<string | null>>,
    showCart: boolean
}

const Home: FC<IHomeProps> = ({showCart, handleCartClose, userCart, setUserCart, handleCartShow, handleLoginShow, handleLoginClose, setIsAuthorize, isAuthorize}) => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    return (
        <div>
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
};

export default Home;
