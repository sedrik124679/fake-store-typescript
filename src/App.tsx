import React, {useCallback, useState} from 'react';
import NavBar from "./components/NavBar/NavBar";
import {Container} from "react-bootstrap";
import SearchBar from "./components/SearchBar/SearchBar";
import OffCanvas from "./components/OffCanvas/OffCanvas";
import CategoriesSection from "./components/CategoriesSection/CategoriesSection";
import ProductsSection from "./components/ProductsSection/ProductsSection";
import {fakeStoreAPI} from "./services/fakeStore";

function App() {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [show, setShow] = useState(false);
    const handleClose = useCallback(() => setShow(false), []);
    const handleShow = useCallback(() => setShow(true), []);
    const [selectedCategory, setSelectedCategory] = useState<string>('electronics')
    const {data: allProducts, error, isLoading} = fakeStoreAPI.useGetAllProductsQuery(5);
    if (isLoading) {
        return <h1>Loading...</h1>
    }


    return (
        <div>
            <NavBar handleShow={handleShow}/>
            <Container>
                <SearchBar value={searchQuery} onChange={setSearchQuery}/>
                <div>
                    <CategoriesSection setSelectedCategory={setSelectedCategory}/>
                    <ProductsSection selectedCategory={selectedCategory}
                                     setSelectedCategory={setSelectedCategory}
                    />
                </div>
            </Container>
            <OffCanvas show={show} handleClose={handleClose}/>
        </div>
    );
}

export default App;
