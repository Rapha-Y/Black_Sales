import React, { Fragment, useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Product from './Product';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    async function getProducts() {
        try {
            const response = await fetch(
                'http://localhost:5000/products'
            );

            const parseRes = await response.json();

            setProducts(parseRes);
        } catch(error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Fragment>
            <h2>--ProductList</h2>
            <Container>
                <Row>
                    {
                        products.length !== 0 &&
                        products.map(product => 
                            <Col 
                                xs={12} sm={6} md={4} lg={3} xl={2} 
                                style={{ marginTop: '15px', marginBottom: '15px' }}
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
                    }
                </Row>
            </Container>
        </Fragment>
    );
};

export default ProductList;