import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import './Product.css';

const Product = ({ id, img, title, price }) => {
    const onClick = (product_id) => {
        window.location.href = `http://localhost:3000/product/${product_id}`
    }
    
    return (
        <Fragment>
            <Card className='product' style={{ height: '100%' }} onClick={() => onClick(id)}>
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