import React, { Fragment, useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Product from './Product';

import './ProductList.css';

const ProductList = ({ searchText, category }) => {
    const [products, setProducts] = useState([]);

    async function getProducts(text, tag) {
        try {
            const response = await fetch(
                `http://localhost:5000/products?category=${tag}&text=${text}`
            );

            const parseRes = await response.json();

            setProducts(parseRes);
        } catch(error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProducts(searchText, category);
    }, [searchText, category]);

    return (
        <Fragment>
            <Container>
                <Row>
                    {
                        products.length === 0 ?
                        (
                            <Container className='zeroMatchContainer mb-5'>
                                <h3 className='text-muted'>
                                    No matches found for the provided criteria
                                </h3>
                            </Container>
                        ) :
                        (
                            products.map(product => 
                                <Col 
                                    xs={12} sm={6} md={4} lg={3} xl={2} 
                                    className='mb-5'
                                    key={product.product_id}
                                >
                                    <Product 
                                        id={product.product_id} 
                                        img={product.product_image} 
                                        title={product.product_name} 
                                        price={product.product_price} 
                                    />
                                </Col>
                            )
                        )
                    }
                </Row>
            </Container>
        </Fragment>
    );
};

export default ProductList;