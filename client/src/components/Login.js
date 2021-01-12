import React, { Fragment, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const { email, password } = inputs;

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

                window.location.href = 'http://localhost:3000'
            } else {
                setAuth(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
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