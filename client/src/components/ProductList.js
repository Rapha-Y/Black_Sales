import React, { Fragment } from 'react';
import Product from './Product';

const ProductList = () => {
    return (
        <Fragment>
            <h2>--ProductList</h2>
            <Product />
            <Product />
            <Product />
        </Fragment>
    );
};

export default ProductList;