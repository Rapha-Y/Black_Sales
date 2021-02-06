import React, { Fragment, useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import CartItem from './CartItem';
import '../../Body.css';
import './Cart.css';

const Cart = ({ isReady, isAuth }) => {
    const [products, setProducts] = useState([]);
    const [productsAreReady, setProductsAreReady] = useState(false);

    async function getProducts(setProductsAreReady) {
        try {
            //get product list
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
            //delete a product
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
            //order products in cart
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
                <Container className='pageBody pt-3 cartBody'>
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
                                    <CartItem
                                        key={product.product_id}
                                        id={product.product_id}
                                        name={product.product_name}
                                        price={product.product_price}
                                        onDelete={deleteProduct}
                                    />
                                )
                            )
                        }
                    </ListGroup>
                    {
                        products.length !== 0 &&
                        <div className='mt-4 cartBuyBtnContainer'>
                            <Button className='btn-success cartBuyBtn' onClick={() => submitCart()}>
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