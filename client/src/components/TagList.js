import React, { Fragment, useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Tag from './Tag';

const categories = [
    'All',
    'Automotive',
    'Books',
    'Fashion',
    'Electronics',
    'Games',
    'Home',
    'Media',
    'Toys',
    'Sports',
    'Tools'
];

const TagList = ({ setCategory }) => {
    const [value, setValue] = useState('All');

    const handleChange = (val) => {
        setCategory(val);
    };

    return (
        <Fragment>
            <ButtonGroup toggle onChange={e => handleChange(e.target.value)} className='d-flex'>
                {
                    categories.map(category => 
                        <Tag
                            key={category}
                            buttonName={category}
                            selectedValue={value}
                            setValue={setValue}
                        />
                    )
                }
            </ButtonGroup>
        </Fragment>
    );
};

export default TagList;