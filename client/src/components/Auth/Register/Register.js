import React, { Fragment, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

import '../../Body.css';
import './Register.css';

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        nameError: null,
        emailError: null,
        passwordError: null,
        confirmPasswordError: null
    });

    const { name, email, password, confirmPassword } = inputs;

    const onChange = e => {
        //update inputs
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            let nameError = null;
            let emailError = null;
            let passwordError = null;
            let confirmPasswordError = null;

            if (name.length < 3) {
                nameError = 'Name must be longer than 2 characters';
            } else if (name.length > 255) {
                nameError = 'Name must be shorter than 256 characters';
            }

            if (email.length < 1) {
                emailError = 'Field must not be empty'
            } else if (email.length > 255) {
                emailError = 'Email must be shorter than 256 characters';
            }

            if (password.length < 6) {
                passwordError = 'Password must be longer than 5 characters';
            } else if (password.length > 255) {
                passwordError = 'Password must be shorter than 256 characters';
            }

            if (password !== confirmPassword) {
                confirmPasswordError = 'Passwords do not match';
            }

            if (
                nameError !== null || 
                emailError !== null || 
                passwordError !== null || 
                confirmPasswordError !== null
            ) {
                //update errors
                setErrors({ nameError, emailError, passwordError, confirmPasswordError });
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
                //log user in then redirect to home page
                localStorage.setItem('token', parseRes.token);

                setAuth(true);

                window.location.href = 'http://localhost:3000'
            } else {
                //update errors
                setAuth(false);
                
                if (parseRes === 'E-mail is already in use') {
                    setErrors({
                        nameError,
                        emailError: parseRes,
                        passwordError,
                        confirmPasswordError
                    });
                }
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
                                <Form.Group controlId='name'>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        name='name'
                                        value={name}
                                        placeholder='Enter your username'
                                        onChange={e => onChange(e)}
                                    />
                                    {
                                        errors.nameError &&
                                        <Form.Text className='text-danger'>
                                            {errors.nameError}
                                        </Form.Text>
                                    }
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
                                    {
                                        errors.emailError &&
                                        <Form.Text className='text-danger'>
                                            {errors.emailError}
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
                                        errors.passwordError &&
                                        <Form.Text className='text-danger'>
                                            {errors.passwordError}
                                        </Form.Text>
                                    }
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
                                    {
                                        errors.confirmPasswordError &&
                                        <Form.Text className='text-danger'>
                                            {errors.confirmPasswordError}
                                        </Form.Text>
                                    }
                                </Form.Group>
                                <Button className='mt-5' variant='primary' type='submit' block>
                                    Submit
                                </Button>
                                <hr />
                                <div className='regRedirectText'>
                                    Already have an account? <a href='/login'>Log in</a>
                                </div>
                            </Form>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        </Fragment>
    );
};

export default Register;