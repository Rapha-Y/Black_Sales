import React, { Fragment, useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';

import Header from './Header';
import './Purchases.css';

const Purchases = ({ isAuth }) => {
    const [purchases, setPurchases] = useState([]);
    
    async function getPurchases() {
        try {
            const response = await fetch(
                'http://localhost:5000/purchases',
                {
                    method: 'GET',
                    headers: {
                        token: localStorage.token
                    }
                }
            );

            const parseRes = await response.json();

            setPurchases(parseRes);
        } catch (error) {
            console.log(error.message);
        }
    }

    function getDate(dateString) {
        const date = new Date(dateString);

        const month = date.getDate();
        const day = date.getDay();
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }

    useEffect(() => {
        getPurchases();
    }, []);

    return (
        <Fragment>
            <Header isAuth={isAuth} />
            <Container>
                {
                    purchases.length !== 0 &&
                    purchases.map(purchase => 
                        <div key={purchase.order_id} className='mt-4'>
                            <span>Bought on {getDate(purchase.order_date)}</span>
                            <ListGroup className='mt-2'>
                                {
                                    purchase.product_list.map(product => 
                                        <ListGroup.Item 
                                            key={product.product_id} 
                                            className='orderCartItem'
                                        >
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
                        </div>    
                    )
                }
            </Container>
        </Fragment>
    );
};

export default Purchases;