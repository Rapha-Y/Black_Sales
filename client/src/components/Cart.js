import React, { Fragment } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

import Header from './Header';
import './Cart.css';

const fakeData = [
    {
        name: 'Spoontaneously',
        price: 1000
    },
    {
        name: 'Fork You',
        price: 2050
    },
    {
        name: 'Knife to Meet You',
        price: 1525
    }
];

const Cart = ({ isAuth }) => {
    return (
        <Fragment>
            <Header isAuth={isAuth} />
            <Container>
                <ListGroup>
                    {
                        fakeData.map(product =>
                            <ListGroup.Item className='cartItem'>
                                <div>
                                   {product.name}
                                </div>
                                <div>
                                    U${(product.price / 100).toFixed(2)}
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