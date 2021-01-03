import React, { Fragment } from 'react';
import Header from './Header';
import FilterMenu from './FilterMenu';
import ProductList from './ProductList';

const Home = () => {
    return (
        <Fragment>
            <h1>Home</h1>
            <Header />
            <FilterMenu />
            <ProductList />
        </Fragment>
    );
};

export default Home;