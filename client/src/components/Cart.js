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
                                </div>
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
                <Button className='btn-success cartBuyBtn mt-2'>
                    Confirm purchase
                </Button>
            </Container>
        </Fragment>
    );
};

export default Cart;