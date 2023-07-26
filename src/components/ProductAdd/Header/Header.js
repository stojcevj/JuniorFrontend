import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return(
        <header className='header'>
            <div className='header-elements'>
                <div className='home-text'>
                    <p className='product-text'>Product Add</p>
                </div>
                <div className='side-buttons'>
                    <button form='product_form' className='add-button'>Save</button>
                    <Link className='add-button' to='/'>Cancel</Link>
                </div>
            </div>
            <hr className='header-hr'/>
        </header>
    );
};

Header.defaultProps = {
    
};

Header.propTypes = {

};

export default Header;