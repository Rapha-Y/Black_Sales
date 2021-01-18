import React, { Fragment, useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

import Header from './Header';
import './Cart.css';

const Cart = ({ isAuth }) => {
    const [products, setProducts] = useState([]);

    async function getProducts() {
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

            /* CHANGE THIS FOR PURCHASES PAGE LATER */
            window.location.href = 'http://localhost:3000'
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Fragment>
            <Header isAuth={isAuth} />
            <Container>
                <ListGroup>
                    {
                        products.length !== 0 &&
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
                    }
                </ListGroup>
                <Button className='btn-success cartBuyBtn mt-2' onClick={() => submitCart()}>
                    Confirm purchase
                </Button>
            </Container>
        </Fragment>
    );
};

export default Cart;