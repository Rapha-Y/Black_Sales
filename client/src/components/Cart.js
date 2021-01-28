import React, { Fragment, useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import './Body.css';
import './Cart.css';

const Cart = ({ isReady, isAuth }) => {
    const [products, setProducts] = useState([]);
    const [productsAreReady, setProductsAreReady] = useState(false);

    async function getProducts(setProductsAreReady) {
        try {
            const response = await fetch(
                'http://localhost:5000/cart',
                {
                    method: 'GET',
                    headers: {
                        token: localStorage.token
                    }
                }
            );

            const parseRes = await response.json();

            setProducts(parseRes);
            setProductsAreReady(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function deleteProduct(id) {
        try {
            await fetch(
                `http://localhost:5000/cart/item/${id}`,
                {
                    method: 'DELETE',
                    headers: { 
                        token: localStorage.token 
                    }
                }
            );

            setProducts(products.filter(product => product.product_id !== id));
        } catch (error) {
            console.log(error.message);
        }
    }

    async function submitCart() {
        try {
            await fetch(
                'http://localhost:5000/cart',
                {
                    method: 'POST',
                    headers: {
                        token: localStorage.token
                    }
                }
            );

            window.location.href = 'http://localhost:3000/purchases'
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProducts(setProductsAreReady);
    }, [setProductsAreReady]);

    return (
        <Fragment>
            <Header isReady={isReady} isAuth={isAuth} />
            {
                productsAreReady &&
                <Container className='pageBody'>
                    <ListGroup>
                        {
                            products.length === 0 ? 
                            (
                                <Container className='zeroProductContainer mb-5'>
                                    <h3 className='text-muted'>
                                        Your cart is empty! <a href='/'>Check out the store!</a>
                                    </h3>
                                </Container>
                            ) :
                            (
                                products.map(product =>
                                    <ListGroup.Item key={product.product_id} className='cartItem'>
                                        <div>
                                            {product.product_name}
                                        </div>
                                        <div>
                                            U${(product.product_price / 100).toFixed(2)}
                                            <Button 
                                                aria-label='Close' 
                                                className='ml-3' 
                                                variant='danger' 
                                                size='sm'
                                                onClick={() => deleteProduct(product.product_id)}
                                            >
                                                <span aria-hidden='true'>&times;</span>
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )
                            )
                        }
                    </ListGroup>
                    {
                        products.length !== 0 &&
                        <div className='cartBuyBtnContainer'>
                            <Button className='btn-success cartBuyBtn mt-2' onClick={() => submitCart()}>
                                Confirm purchase
                            </Button>
                        </div>
                    }
                </Container>
            }
            <Footer />
        </Fragment>
    );
};

export default Cart;