import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ setSearchText }) => {
    return (
        <Fragment>
            <Form>
                <Form.Group>
                    <Form.Control 
                        type='text' 
                        placeholder='Search...'
                        onChange={e => setSearchText(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </Fragment>
    );
};

export default SearchBar;