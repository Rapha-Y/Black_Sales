import React, { Fragment } from 'react';
import { Container, Form } from 'react-bootstrap';

const SearchBar = ({ setSearchText }) => {
    return (
        <Fragment>
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Control 
                            type='text' 
                            placeholder='Search...'
                            onChange={e => setSearchText(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Container>
        </Fragment>
    );
};

export default SearchBar;