import React, { Fragment } from 'react';

import './Footer.css';

const Footer = () => {
    return (
        <Fragment>
            <div className='bg-dark p-3 pageFooter'>
                <span className='text-light'>Copyright &copy; 2021 ADD_MY_NAME_LATER</span>
                <div className='text-light'>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
        </Fragment>
    );
};

export default Footer;