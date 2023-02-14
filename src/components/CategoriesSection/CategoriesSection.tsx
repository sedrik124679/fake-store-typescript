import React, {FC} from 'react';
import {Button} from "react-bootstrap";
import {fakeStoreAPI} from "../../services/fakeStore";
import styles from "../../styles/categories.module.css";

interface CategoriesSectionProps {
    setSelectedCategory: (prev: string) => void
}

const CategoriesSection: FC<CategoriesSectionProps> = ({setSelectedCategory}) => {

    const {data: productsCategories, error: productsCategoriesError, isLoading: productsCategoriesIsLoading} = fakeStoreAPI.useGetAllCategoriesQuery(5);

    if (productsCategoriesIsLoading) {
        return <h3 style={{textAlign: 'center'}}>Loading...</h3>
    }

    return (
        <div className={styles.categoriesContainer}>
            <h4>Categories:</h4>
            <div className={styles.categoriesButtons}>
                <Button
                    onClick={() => setSelectedCategory('All')}
                    style={{minWidth: '70px'}}
                    variant={'dark'}
                >All
                </Button>
                {productsCategories && productsCategories.map(category => {
                    return <Button
                        key={`${category}-category-name`}
                        onClick={() => setSelectedCategory(category)}
                        variant={'dark'}
                    >
                        {category[0].toUpperCase() + category.slice(1)}
                    </Button>
                })}
            </div>
        </div>
    );
};

export default CategoriesSection;
