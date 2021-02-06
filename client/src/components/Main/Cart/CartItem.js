import React, { Fragment } from 'react';
import { ListGroup, Button } from 'react-bootstrap';

import './Cart.css';

const CartItem = ({ id, name, price, onDelete }) => {
    return (
        <Fragment>
            <ListGroup.Item className='cartItem'>
                <div>
                    {name}
                </div>
                <div>
                    U${(price / 100).toFixed(2)}
                    <Button 
                        aria-label='Close' 
                        className='ml-3' 
                        variant='danger' 
                        size='sm'
                        onClick={() => onDelete(id)}
                    >
                        <span aria-hidden='true'>&times;</span>
                    </Button>
                </div>
            </ListGroup.Item>
        </Fragment>
    );
};

export default CartItem;