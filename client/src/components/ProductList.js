import React, { Fragment } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Product from './Product';

const tempList = [
    {
        id: 1,
        img: 'https://img.youtube.com/vi/pc9ptF7A5ec/maxresdefault.jpg',
        title: 'Trident',
        price: 2495
    },
    {
        id: 2,
        img: 'https://img.youtube.com/vi/NFQot-w_CrA/maxresdefault.jpg',
        title: 'Drawing book',
        price: 1299
    },
    {
        id: 3,
        img: 'https://img.youtube.com/vi/-sihZLgIO_k/maxresdefault.jpg',
        title: 'Wine glass',
        price: 2025
    },
    {
        id: 4,
        img: 'https://img.youtube.com/vi/pimxVr2fP9U/maxresdefault.jpg',
        title: 'Magnifying glass',
        price: 1895
    },
    {
        id: 5,
        img: 'https://img.youtube.com/vi/noQOk93TwLM/maxresdefault.jpg',
        title: 'Motor',
        price: 35294
    }
];

const ProductList = () => {
    return (
        <Fragment>
            <h2>--ProductList</h2>
            <Container>
                <Row>
                    {
                        tempList.map(product => 
                            <Col xs={12} sm={6} md={4} lg={3} xl={2} style={{ marginTop: '15px', marginBottom: '15px' }}>
                                <Product id={product.id} img={product.img} title={product.title} price={product.price} />
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </Fragment>
    );
};

export default ProductList;