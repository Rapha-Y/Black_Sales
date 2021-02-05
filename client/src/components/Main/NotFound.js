import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import '../Body.css';
import './NotFound.css';

const NotFound = ({ isReady, isAuth }) => {
    return (
        <Fragment>
            <Header isReady={isReady} isAuth={isAuth} />
            <Container className='notFoundContainer mb-5'>
                <h3 className='text-muted'>
                    Page not found. <a href='/'>Go back to browsing!</a>
                </h3>
            </Container>
            <Footer />
        </Fragment>
    );
};

export default NotFound;