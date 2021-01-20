import React, { Fragment } from 'react';
import { Jumbotron } from 'react-bootstrap';

import SearchBar from './SearchBar';
import TagList from './TagList';

const FilterMenu = ({ setSearchText, setCategory }) => {
    return (
        <Fragment>
            <Jumbotron className='py-4'>
                <SearchBar setSearchText={setSearchText} />
                <TagList setCategory={setCategory} />
            </Jumbotron>
        </Fragment>
    );
};

export default FilterMenu;