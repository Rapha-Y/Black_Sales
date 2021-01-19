import React, { Fragment } from 'react';
import { Container, ListGroup } from 'react-bootstrap';

import Header from './Header';

const Purchases = ({ isAuth }) => {
    return (
        <Fragment>
            <Header isAuth={isAuth} />
            <Container>
                <h2>Placeholder title</h2>
                <ListGroup>
                    <ListGroup.Item>Placeholder product</ListGroup.Item>
                    <ListGroup.Item>Placeholder product</ListGroup.Item>
                </ListGroup>
                <h2>Placeholder title</h2>
                <ListGroup>
                    <ListGroup.Item>Placeholder product</ListGroup.Item>
                    <ListGroup.Item>Placeholder product</ListGroup.Item>
                </ListGroup>
            </Container>
        </Fragment>
    );
};

export default Purchases;