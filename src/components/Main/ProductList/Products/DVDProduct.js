import React from 'react';
import { object } from 'prop-types';
import '../../Main.scss';

const DVDProduct = ({ product }) => {
    var object = JSON.parse(product.product.object);
    return(
        <div className='card'>
            <div className='card-checkbox'>
                <input className='delete-checkbox' type='checkbox' product-id={ product.product.sku } />
            </div>
            <div className='card-body'>
                <p>{ product.product.sku }</p>
                <p>{ product.product.name }</p>
                <p>{ product.product.price.toFixed(2) } $</p>
                <p>Size: { object['size'] } MB</p>
            </div>
        </div>
    );
};

DVDProduct.defaultProps = {
    product:{},
};

DVDProduct.propTypes = {
    product:object,
};

export default DVDProduct;