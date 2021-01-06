import React, { Fragment } from 'react';
import { ToggleButton } from 'react-bootstrap';

const Tag = ({ buttonName, selectedValue, setValue }) => {
    return (
        <Fragment>
            <ToggleButton 
                name={buttonName} 
                value={buttonName} 
                type='radio'
                checked={buttonName === selectedValue}
                onChange={e => setValue(e.currentTarget.value)}
            >
                {buttonName}
            </ToggleButton>
        </Fragment>
    );
};

export default Tag;