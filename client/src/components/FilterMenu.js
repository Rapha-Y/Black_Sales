import React, { Fragment } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

import SearchBar from './SearchBar';
import TagList from './TagList';

const FilterMenu = ({ setSearchText, setCategory }) => {
    return (
        <Fragment>
            <Jumbotron className='py-5'>
                <Container>
                    <h2>What are you looking for?</h2>
                    <SearchBar setSearchText={setSearchText} />
                    <TagList setCategory={setCategory} />
                </Container>
            </Jumbotron>
        </Fragment>
    );
};

export default FilterMenu;