import React, { Fragment } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Register = () => {
    return (
        <Fragment>
            <Container>
                <Form>
                    <Form.Group controlId='name'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type='text' placeholder='Enter your username' />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control type='email' placeholder='Enter your e-mail' />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder='Enter your password' />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm password:</Form.Label>
                        <Form.Control type='password' placeholder='Confirm your password' />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </Container>
        </Fragment>
    );
};

export default Register;