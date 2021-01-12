import React, { Fragment, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = inputs;

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            //e-mail validation
            //password validation
            //matching passwords - ok
            if (password !== confirmPassword) {
                console.log('Rewrite this error later');
                return;
            }

            const body = { name, email, password };

            const response = await fetch(
                'http://localhost:5000/auth/register',
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
                    <Form.Group controlId='name'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control 
                            type='text' 
                            name='name'
                            value={name}
                            placeholder='Enter your username'
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
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
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm password:</Form.Label>
                        <Form.Control 
                            type='password'
                            name='confirmPassword'
                            value={confirmPassword} 
                            placeholder='Confirm your password'
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

export default Register;