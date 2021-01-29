import React, { Fragment, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import './Body.css';
import './Profile.css';

const Profile = ({ isReady, isAuth, setAuth }) => {
    const [inputs/*, setInputs*/] = useState({
        name: 'Haachama', //fetch it
        email: 'akai.haato@gmail.com', //fetch it
        password: 'password' //no need to fetch
    });

    const logOut = () => {
        localStorage.removeItem('token');

        setAuth(false);
    };

    return (
        <Fragment>
            <Header isReady={isReady} isAuth={isAuth} />
            <Container className='pageBody pt-3 profileBody'>
                <Form>
                    <Form.Group style={{display: 'flex', alignItems: 'center'}}>
                        <Form.Label className='mr-1' style={{width: '100px'}}>Username:</Form.Label>
                        <div className='input-group'>
                            <Form.Control
                                type='text'
                                name='name'
                                value={inputs.name}
                                disabled
                                className='mr-2'
                            />
                        </div>
                    </Form.Group>
                    <Form.Group style={{display: 'flex', alignItems: 'center'}}>
                        <Form.Label className='mr-1' style={{width: '100px'}}>E-mail:</Form.Label>
                        <div className='input-group'>
                            <Form.Control
                                type='email'
                                name='email'
                                value={inputs.email}
                                disabled
                                className='mr-2'
                            />
                        </div>
                    </Form.Group>
                </Form>
                <a href='#'>Change password</a>
                <div className='mt-4 logOutBtnContainer'>
                    <Button className='btn-danger logOutBtn' onClick={() => logOut()}>
                        Log out
                    </Button>
                </div>
            </Container>
            <Footer />
        </Fragment>
    );
};

export default Profile;