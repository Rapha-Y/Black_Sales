import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <Fragment>
            <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
                <Navbar.Brand href='#'>[Logo + Site name]</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='ml-auto'>
                        <Nav.Link href='#'>[Log in or Profile]</Nav.Link>
                        <Nav.Link href='#'>Announce</Nav.Link>
                        <Nav.Link href='#'>Purchases</Nav.Link>
                        <Nav.Link href='#'>Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
};

export default Header;