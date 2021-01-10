import React, { Fragment, useState } from 'react';
import Header from './Header';
import FilterMenu from './FilterMenu';
import ProductList from './ProductList';

const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('All');

    return (
        <Fragment>
            <Header />
            <FilterMenu setSearchText={setSearchText} setCategory={setCategory} />
            <ProductList searchText={searchText} category={category} />
        </Fragment>
    );
};

export default Home;