import React, { Fragment, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import './Body.css';

const DefaultLoading = () => {
    return (
        <Fragment>
            <Header isReady={false} />
            <Container className='pageBody' />
            <Footer />
        </Fragment>
    );
};

export default DefaultLoading;