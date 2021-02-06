import React, { Fragment, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import PurchasesItem from './PurchasesItem';
import '../../Body.css';
import './Purchases.css';

const Purchases = ({ isReady, isAuth }) => {
    const [purchases, setPurchases] = useState([]);
    const [purchasesIsReady, setPurchasesIsReady] = useState(false);

    async function getPurchases() {
        try {
            //get purchase list
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
            setPurchasesIsReady(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getPurchases(setPurchasesIsReady);
    }, [setPurchasesIsReady]);

    return (
        <Fragment>
            <Header isReady={isReady} isAuth={isAuth} />
            {
                purchasesIsReady &&
                <Container className='pageBody'>
                    {
                        purchases.length === 0 ?
                        (
                            <Container className='zeroOrderContainer mb-5'>
                                <h3 className='text-muted'>
                                    You haven't ordered anything yet! <a href='/'>Check out the store!</a>
                                </h3>
                            </Container>
                        ) :
                        (
                            purchases.map(purchase => 
                                <PurchasesItem
                                    key={purchase.order_id}
                                    date={purchase.order_date}
                                    product_list={purchase.product_list}
                                />
                            )
                        )
                    }
                </Container>
            }
            <Footer />
        </Fragment>
    );
};

export default Purchases;