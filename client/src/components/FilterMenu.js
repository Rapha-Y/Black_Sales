import React, { Fragment } from 'react';
import SearchBar from './SearchBar';
import TagList from './TagList';

const FilterMenu = () => {
    return (
        <Fragment>
            <h2>--FilterMenu</h2>
            <SearchBar />
            <TagList />
        </Fragment>
    );
};

export default FilterMenu;