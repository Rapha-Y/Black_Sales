import React, { Fragment, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import './Body.css';
import './Profile.css';

const Profile = ({ isAuth, setAuth }) => {
    const [inputs/*, setInputs*/] = useState({
        name: 'Haachama', //fetch it
        email: 'akai.haato@gmail.com', //fetch it
        password: 'password' //no need to fetch
    });

    const logOut = () => {
        localStorage.removeItem('token');

        setAuth(false);

        window.location.href = 'http://localhost:3000';
    };

    return (
        <Fragment>
            <Header isAuth={isAuth} />
            <Container className='pageBody'>
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
                            <Button /*setInputs={setInputs}*/>
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
                            <Button /*setInputs={setInputs}*/>
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
                <Button className='btn-danger' block onClick={() => logOut()}>
                    Log out
                </Button>
            </Container>
            <Footer />
        </Fragment>
    );
};

export default Profile;