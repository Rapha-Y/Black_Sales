import React, { Fragment } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
    return (
        <Fragment>
            <Container>
                <Form>
                    <Form.Group controlId='email'>
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control type='email' placeholder='Enter your e-mail' />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder='Enter your password' />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </Container>
        </Fragment>
    );
};

export default Login;