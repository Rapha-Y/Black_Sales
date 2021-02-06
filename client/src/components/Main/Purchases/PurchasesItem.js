import React, { Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';

import PurchasesProduct from './PurchasesProduct';

const PurchasesItem = ({ date, product_list }) => {
    function getDate(dateString) {
        //turn date to string
        const date = new Date(dateString);

        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }

    return(
        <Fragment>
            <div className='my-3'>
                <span>Bought on {getDate(date)}</span>
                <ListGroup className='mt-2'>
                    {
                        product_list.map(product => 
                            <PurchasesProduct
                                key={product.product_id}
                                name={product.product_name}
                                price={product.product_price}
                            />
                        )
                    }
                </ListGroup>
            </div>   
        </Fragment>
    );
};

export default PurchasesItem;