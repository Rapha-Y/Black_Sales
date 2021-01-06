import React, { Fragment, useState } from 'react';
import { ButtonGroup, Container } from 'react-bootstrap';
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
            <Container>
                <ButtonGroup toggle onChange={e => handleChange(e.target.value)}>
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
            </Container>
        </Fragment>
    );
};

export default TagList;