import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Col, Row, Button } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import './Body.css';

const ProductPage = ({ isReady, isAuth }) => {
    const [productData, setProductData] = useState({});
    const params = useParams();

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

    const addToCart = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('token', localStorage.token);

            const product_id = params.id;

            await fetch(
                `http://localhost:5000/cart/item/${product_id}`,
                {
                    method: 'POST',
                    headers: myHeaders
                }
            );

            window.location.href = 'http://localhost:3000/cart'
        } catch (error) {
            console.log(error.message);
        }
    };

    const buyProductNow = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('token', localStorage.token);

            const product_id = params.id;

            await fetch(
                `http://localhost:5000/cart/instant/item/${product_id}`,
                {
                    method: 'POST',
                    headers: myHeaders
                }
            );

            window.location.href = 'http://localhost:3000/purchases'
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getProduct(params.id);
    }, [params.id]);

    function getDate(dateString) {
        const date = new Date(dateString);

        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }

    return (
        <Fragment>
            <Header isReady={isReady} isAuth={isAuth} />
            <Container className='pageBody'>
                <Row>
                    <Col sm={6}>
                        <Image src={productData.product_image} fluid />
                    </Col>
                    <Col sm={6}>
                        <h1>{productData.product_name}</h1>
                        Published {getDate(productData.product_date)} by {productData.user_name}
                        <hr />
                        <div style={{display: 'flex'}}>
                            <div className='mr-2'>For:</div>
                            <h2 style={{color: 'firebrick'}}>U${(productData.product_price / 100).toFixed(2)}</h2>
                        </div>
                        <hr />
                        <Button variant='success' className='mr-2' onClick={() => addToCart()}>
                            Add to cart
                        </Button>
                        <Button variant='danger' onClick={() => buyProductNow()}>
                            Buy now!
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Fragment>
    );
};

export default ProductPage;