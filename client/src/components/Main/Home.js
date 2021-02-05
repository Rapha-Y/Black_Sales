import React, { Fragment, useState } from 'react';

import Header from './Header';
import FilterMenu from './FilterMenu';
import ProductList from './ProductList';
import Footer from './Footer';
import '../Body.css';

const Home = ({ isReady, isAuth }) => {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('All');

    return (
        <Fragment>
            <Header isReady={isReady} isAuth={isAuth} />
            <div className='pageBody'>
                <FilterMenu setSearchText={setSearchText} setCategory={setCategory} />
                <ProductList searchText={searchText} category={category} />
            </div>
            <Footer />
        </Fragment>
    );
};

export default Home;