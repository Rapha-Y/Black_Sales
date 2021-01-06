import React, { Fragment } from 'react';
import SearchBar from './SearchBar';
import TagList from './TagList';

const FilterMenu = ({ setSearchText }) => {
    return (
        <Fragment>
            <h2>--FilterMenu</h2>
            <SearchBar setSearchText={setSearchText} />
            <TagList />
        </Fragment>
    );
};

export default FilterMenu;