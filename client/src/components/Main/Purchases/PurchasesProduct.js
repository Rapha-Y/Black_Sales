import React, { Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';

import './Purchases.css';

const PurchasesProduct = ({ name, price }) => {
    return (
        <Fragment>
            <ListGroup.Item 
                className='orderCartItem'
            >
                <div>
                    {name}
                </div>
                <div>
                    U${(price / 100).toFixed(2)}
                </div>
            </ListGroup.Item>
        </Fragment>
    );
};

export default PurchasesProduct;