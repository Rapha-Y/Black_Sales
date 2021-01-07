import React, { Fragment, useState, useEffect } from 'react';
import { Container, Image, Col, Row, Button } from 'react-bootstrap';

const ProductPage = ({ id }) => {
    const [productData, setProductData] = useState({});

    async function getProduct(product_id) {
        try {
            const response = await fetch(
                `http://localhost:5000/products/${product_id}`
            );

            const parseRes = await response.json();

            setProductData(parseRes);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProduct(id);
    }, [id]);

    function getDate(dateString) {
        const date = new Date(dateString);

        const month = date.getDate();
        const day = date.getDay();
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col sm={6}>
                        <Image src={productData.product_image} fluid />
                    </Col>
                    <Col sm={6}>
                        <h1>{productData.product_name}</h1>
                        Published {getDate(productData.product_date)} by FETCH USERNAME
                        <hr />
                        <div style={{display: 'flex'}}>
                            <div className='mr-2'>For:</div>
                            <h2 style={{color: 'firebrick'}}>U${productData.product_price / 100}</h2>
                        </div>
                        <hr />
                        <Button variant='success' className='mr-2'>
                            Add to cart
                        </Button>
                        <Button variant='danger'>
                            Buy now!
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ProductPage;