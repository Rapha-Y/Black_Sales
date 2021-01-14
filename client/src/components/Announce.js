import React, { Fragment, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Header from './Header';

const Announce = ({ isAuth }) => {
    const [inputs, setInputs] = useState({
        name: '',
        price: '',
        category: 'Automotive',
        image: ''
    });

    const { name, price, category, image } = inputs;

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        
        try {
            //Verify product name
            //Verify product price
            //Verify image url
            /* POST product */
            console.log(name, price, category, image);
            console.log('I am a placeholder');
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Fragment>
            <Header isAuth={isAuth} />
            <Container>
                <Form onSubmit={onSubmitForm}>
                    <Form.Group controlId='name'>
                        <Form.Label>Product:</Form.Label>
                        <Form.Control 
                            type='text' 
                            name='name'
                            value={name}
                            placeholder='Enter the product name' 
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control 
                            type='number'
                            name='price'
                            value={price}
                            placeholder='Enter the price'
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label>Category:</Form.Label>
                        <Form.Control 
                            as='select'
                            name='category'
                            value={category}
                            onChange={e => onChange(e)}
                        >
                            <option>Automotive</option>
                            <option>Books</option>
                            <option>Fashion</option>
                            <option>Electronics</option>
                            <option>Games</option>
                            <option>Home</option>
                            <option>Media</option>
                            <option>Toys</option>
                            <option>Sports</option>
                            <option>Tools</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.Label>Image URL:</Form.Label>
                        <Form.Control 
                            type='text' 
                            name='image'
                            value={image}
                            placeholder='Enter the image URL' 
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </Container>
        </Fragment>
    );
}

export default Announce;