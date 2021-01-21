import React, { Fragment, useState } from 'react';

import Header from './Header';
import FilterMenu from './FilterMenu';
import ProductList from './ProductList';
import Footer from './Footer';

const Home = ({ isAuth }) => {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('All');

    return (
        <Fragment>
            <Header isAuth={isAuth} />
            <FilterMenu setSearchText={setSearchText} setCategory={setCategory} />
            <ProductList searchText={searchText} category={category} />
            <Footer />
        </Fragment>
    );
};

export default Home;