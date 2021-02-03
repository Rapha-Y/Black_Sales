import React, { Fragment, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import './Body.css';
import './Announce.css';

const Announce = ({ isReady, isAuth }) => {
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

            if (nameError !== '' || priceError !== '') {
                setErrors({ nameError, priceError });
            } else {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('token', localStorage.token);
                
                const body = { name, price, category, image };

                await fetch(
                    'http://localhost:5000/products',
                    {
                        method: 'POST',
                        headers: myHeaders,
                        body: JSON.stringify(body)
                    }
                );

                window.location.href = 'http://localhost:3000';
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Fragment>
            <Header isReady={isReady} isAuth={isAuth} />
            <Container className='pageBody pt-3 announceBody'>
                <Form onSubmit={onSubmitForm}>
                    <Form.Group as={Row} controlId='name'>
                        <Form.Label column sm={2}>Product name:</Form.Label>
                        <Col sm={10}>
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
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='price'>
                        <Form.Label column sm={2}>Unit price:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type='number'
                                name='price'
                                value={price}
                                step={0.01}
                                placeholder='Enter the product price'
                                onChange={e => onChange(e)}
                            />
                            {
                                errors.priceError !== '' && 
                                <Form.Text className='text-danger'>
                                    {errors.priceError}
                                </Form.Text>
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='category'>
                        <Form.Label column sm={2}>Category:</Form.Label>
                        <Col sm={10}>
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
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='image'>
                        <Form.Label column sm={2}>Image URL:</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type='text' 
                                name='image'
                                value={image}
                                placeholder='Enter the image URL' 
                                onChange={e => onChange(e)}
                            />
                        </Col>
                    </Form.Group>
                    <div className='mt-4 announceBtnSection'>
                        <Button className='announceBtn' variant='primary' type='submit'>
                            Submit product
                        </Button>
                    </div>
                </Form>
            </Container>
            <Footer />
        </Fragment>
    );
}

export default Announce;