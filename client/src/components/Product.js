import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';

const Product = ({ id, img, title, price }) => {
    return (
        <Fragment>
            <Card style={{ height: '100%' }}>
                <Card.Img variant='top' src={img} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>U$ {price / 100}</Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

export default Product;