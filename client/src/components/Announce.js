import React, { Fragment, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Header from './Header';

const Announce = ({ isAuth }) => {
    const [inputs, setInputs] = useState({
        name: '',
        price: '0',
        category: 'Automotive',
        image: ''
    });

    const [errors, setErrors] = useState({
        nameError: '',
        priceError: ''
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
            let nameError = '';
            let priceError = '';

            if (inputs.name === '') {
                nameError = 'Product must have a name';
            } else if (inputs.name.length > 255) {
                nameError = 'Product name must be under 255 characters';
            }
    
            const priceValue = parseFloat(inputs.price);
            if (priceValue <= 0) {
                priceError = 'Product price must be greater than 0'
            } else if (priceValue > 1000000) {
                priceError = 'Product price cannot go past 1,000,000';
            } else if (priceValue !== parseFloat(priceValue.toFixed(2))) {
                priceError = 'Product must have a maximum of two decimals';
            }

            setErrors({ nameError, priceError });
            //POST product
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
                        {
                            errors.nameError !== '' && 
                            <Form.Text className='text-danger'>
                                {errors.nameError}
                            </Form.Text>
                        }
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control 
                            type='number'
                            name='price'
                            value={price}
                            step={0.01}
                            placeholder='Enter the price'
                            onChange={e => onChange(e)}
                        />
                        {
                            errors.priceError !== '' && 
                            <Form.Text className='text-danger'>
                                {errors.priceError}
                            </Form.Text>
                        }
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