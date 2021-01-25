import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import Logo from '../icons/treasure.svg';

const Header = ({ isAuth }) => {
    return (
        <Fragment>
            <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
                <Navbar.Brand href='/'>
                    <img
                        alt='treasure-shaped site logo'
                        src={Logo}
                        width='30'
                        height='30'
                        className='d-inline-block align-top mr-2'
                    />
                    Black Sales
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='ml-auto'>
                        {
                            isAuth ?
                            <Nav.Link href='/profile'>Profile</Nav.Link> :
                            <Nav.Link href='/login'>Log in</Nav.Link>   
                        }
                        <Nav.Link href='/announce'>Announce</Nav.Link>
                        <Nav.Link href='/purchases'>Purchases</Nav.Link>
                        <Nav.Link href='/cart'>Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
};

export default Header;