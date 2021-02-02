import React, { Fragment, useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import './Body.css';
import './Profile.css';

const Profile = ({ isReady, isAuth, setAuth }) => {
    const [inputs, setInputs] = useState({
        user_name: '',
        user_email: ''
    });

    async function getUserInfo() {
        try {
            const response = await fetch(
                'http://localhost:5000/user',
                {
                    method: 'GET',
                    headers: {
                        token: localStorage.token
                    }
                }
            );

            const parseRes = await response.json();

            setInputs(parseRes);
        } catch (error) {
            console.log(error.message);
        }
    }

    const [passwordInputsAreVisible, setPasswordInputsAreVisible] = useState(false);

    const [passwordInputs, setPasswordInputs] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const { currentPassword, newPassword, confirmPassword } = passwordInputs;

    const onChange = e => {
        setPasswordInputs({
            ...passwordInputs,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            console.log('Rewrite this error later');
            return;
        }

        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('token', localStorage.token);

            const body = { currentPassword, newPassword };

            const response = await fetch(
                'http://localhost:5000/user',
                {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify(body)
                }
            );

            if (response.status === 200) {
                setPasswordInputsAreVisible(false);
            }
        } catch(error) {
            console.log(error.message);
        }
    }

    const logOut = () => {
        localStorage.removeItem('token');

        setAuth(false);
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <Fragment>
            <Header isReady={isReady} isAuth={isAuth} />
            <Container className='pageBody pt-3 profileBody'>
                <Form>
                    <Form.Group style={{display: 'flex', alignItems: 'center'}}>
                        <Form.Label className='mr-3' style={{width: '100px'}}>Username:</Form.Label>
                        <div className='input-group'>
                            <Form.Control
                                type='text'
                                name='name'
                                value={inputs.user_name}
                                disabled
                            />
                        </div>
                    </Form.Group>
                    <Form.Group style={{display: 'flex', alignItems: 'center'}}>
                        <Form.Label className='mr-3' style={{width: '100px'}}>E-mail:</Form.Label>
                        <div className='input-group'>
                            <Form.Control
                                type='email'
                                name='email'
                                value={inputs.user_email}
                                disabled
                            />
                        </div>
                    </Form.Group>
                </Form>
                {
                    !passwordInputsAreVisible ?
                    (
                        <Fragment>
                            <Button 
                                className='px-0' 
                                variant='link' 
                                onClick={() => {
                                    setPasswordInputsAreVisible(true);
                                }}
                            >
                                Change password
                            </Button>
                            <div className='profileBottomBtnContainer'>
                                <Button className='btn-danger profileBottomBtn' onClick={() => logOut()}>
                                    Log out
                                </Button>
                            </div>
                        </Fragment>
                    ) : 
                    (
                        <Fragment>
                            <hr className='mt-4' />
                            <Form onSubmit={onSubmitForm}>
                                <Form.Group style={{display: 'flex', alignItems: 'center'}}>
                                    <Form.Label className='mr-3' style={{width: '100px'}}>Current password:</Form.Label>
                                    <div className='input-group'>
                                        <Form.Control
                                            type='password'
                                            name='currentPassword'
                                            value={currentPassword}
                                            placeholder='Enter your current password'
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group style={{display: 'flex', alignItems: 'center'}}>
                                    <Form.Label className='mr-3' style={{width: '100px'}}>New password:</Form.Label>
                                    <div className='input-group'>
                                        <Form.Control
                                            type='password'
                                            name='newPassword'
                                            value={newPassword}
                                            placeholder='Enter your new password'
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group style={{display: 'flex', alignItems: 'center'}}>
                                    <Form.Label className='mr-3' style={{width: '100px'}}>Confirm new password:</Form.Label>
                                    <div className='input-group'>
                                        <Form.Control
                                            type='password'
                                            name='confirmPassword'
                                            value={confirmPassword}
                                            placeholder='Confirm your new password'
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </Form.Group>
                                <div className='mt-3 profileBottomBtnContainer'>
                                    <Button className='profileBottomBtn' type='submit'>
                                        Confirm changes
                                    </Button>
                                </div>
                            </Form>
                        </Fragment>
                    )
                }
            </Container>
            <Footer />
        </Fragment>
    );
};

export default Profile;