import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import './Header.scss';

const Header = (props) => {
    return(
        <header className='header'>
            <div className='header-elements'>
                <div className='home-text'>
                    <p className='product-text'>Product List</p>
                </div>
                <div className='side-buttons'>
                    <Link className='add-button' to='/addProduct'>ADD</Link>
                    <button id='delete-product-btn' className='add-button' onClick={ () => props.onDelete() }>MASS DELETE</button>
                </div>
            </div>
            <hr className='header-hr'/>
        </header>
    );
};

Header.defaultProps = {
    onDelete:func,
};

Header.propTypes = {
    onDelete:func,
};

export default Header;