import React, { Fragment, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Header from './Header';
import './Profile.css';

const Profile = ({ isAuth }) => {
    const [inputs, setInputs] = useState({
        name: 'Haachama', //fetch it
        email: 'akai.haato@gmail.com', //fetch it
        password: 'password' //no need to fetch
    });

    return (
        <Fragment>
            <Header isAuth={isAuth} />
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <div className='input-group'>
                            <Form.Control
                                type='text'
                                name='name'
                                value={inputs.name}
                                disabled
                                className='mr-2'
                            />
                            <Button setInputs={setInputs}>
                                Edit
                            </Button>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-mail:</Form.Label>
                        <div className='input-group'>
                            <Form.Control
                                type='email'
                                name='email'
                                value={inputs.email}
                                disabled
                                className='mr-2'
                            />
                            <Button setInputs={setInputs}>
                                Edit
                            </Button>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <div className='input-group'>
                            <Form.Control
                                type='password'
                                name='password'
                                value={inputs.password}
                                disabled
                                className='mr-2'
                            />
                            <Button>
                                Edit
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
                <Button className='btn-danger' block>
                    Log out
                </Button>
            </Container>
        </Fragment>
    );
};

export default Profile;