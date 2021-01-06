import React, { Fragment } from 'react';
import SearchBar from './SearchBar';
import TagList from './TagList';

const FilterMenu = ({ setSearchText, setCategory }) => {
    return (
        <Fragment>
            <SearchBar setSearchText={setSearchText} />
            <TagList setCategory={setCategory} />
        </Fragment>
    );
};

export default FilterMenu;