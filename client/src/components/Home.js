import React, { Fragment, useState } from 'react';
import Header from './Header';
import FilterMenu from './FilterMenu';
import ProductList from './ProductList';

const Home = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <Fragment>
            <h1>Home</h1>
            <Header />
            <FilterMenu setSearchText={setSearchText} />
            <ProductList searchText={searchText} />
        </Fragment>
    );
};

export default Home;