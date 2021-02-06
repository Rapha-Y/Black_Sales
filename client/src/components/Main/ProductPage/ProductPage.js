import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Col, Row, Button } from 'react-bootstrap';

import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import '../../Body.css';
import './ProductPage.css';

const ProductPage = ({ isReady, isAuth }) => {
    const [productData, setProductData] = useState({});
    const [infoIsReady, setInfoIsReady] = useState(false);
    const params = useParams();

    async function getProduct(product_id, setInfoIsReady) {
        try {
            //update product data
            const response = await fetch(
                `http://localhost:5000/products/${product_id}`
            );

            const parseRes = await response.json();

            setProductData(parseRes);
            setInfoIsReady(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    const addToCart = async () => {
        try {
            //add product to active cart
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
            //add product to new cart and order it
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
        getProduct(params.id, setInfoIsReady);
    }, [params.id, setInfoIsReady]);

    function getDate(dateString) {
        //turn date to string
        const date = new Date(dateString);

        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }

    return (
        <Fragment>
            <Header isReady={isReady} isAuth={isAuth} />
            {
                infoIsReady &&
                <Container className='pageBody mt-3'>
                    <Row>
                        <Col sm={7} className='mb-3'>
                            <Image src={productData.product_image} fluid />
                        </Col>
                        <Col sm={5} className='mb-5 productInfoBox'>
                            <h1>{productData.product_name}</h1>
                            Published {getDate(productData.product_date)} by {productData.user_name}
                            <div className='lineSeparator'>
                                <hr />
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className='mr-2'>For:</div>
                                <h2 className='mb-0 priceValue'>U${(productData.product_price / 100).toFixed(2)}</h2>
                            </div>
                            <div className='lineSeparator'>
                                <hr />
                            </div>
                            <div>
                                <Button variant='success' className='mr-2' onClick={() => addToCart()}>
                                    Add to cart
                                </Button>
                                <Button variant='danger' onClick={() => buyProductNow()}>
                                    Buy now!
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
            <Footer />
        </Fragment>
    );
};

export default ProductPage;