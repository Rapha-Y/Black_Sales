import React, { Fragment, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

import './Body.css';
import './Login.css';

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const { email, password } = inputs;

    const [error, setError] = useState(null);

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { email, password };

            const response = await fetch(
                'http://localhost:5000/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem('token', parseRes.token);

                setAuth(true);

                window.location.href = 'http://localhost:3000';
            } else {
                setAuth(false);

                setError(parseRes);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <div className='bg-dark appBody regPage'>
                <Card className='regFormCard'>
                    <Card.Body>
                        <Container>
                            <Form onSubmit={onSubmitForm}>
                                <Form.Group controlId='email'>
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control 
                                        type='email' 
                                        name='email'
                                        value={email}
                                        placeholder='Enter your e-mail' 
                                        onChange={e => onChange(e)}
                                    />
                                    {
                                        error === 'No users are registered under this e-mail' &&
                                        <Form.Text className='text-danger'>
                                            {error}
                                        </Form.Text>
                                    }
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control 
                                        type='password'
                                        name='password'
                                        value={password}
                                        placeholder='Enter your password'
                                        onChange={e => onChange(e)}
                                    />
                                    {
                                        error === 'Incorrect password' &&
                                        <Form.Text className='text-danger'>
                                            {error}
                                        </Form.Text>
                                    }
                                </Form.Group>
                                <Button className='mt-5' variant='primary' type='submit' block>
                                    Submit
                                </Button>
                                <hr />
                                <div className='logRedirectText'>
                                    Don't have an account? <a href='/register'>Sign up</a>
                                </div>
                                <div className='logRedirectText'>
                                    or <a href='/'>browse as a guest.</a>
                                </div>
                            </Form>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        </Fragment>
    );
};

export default Login;