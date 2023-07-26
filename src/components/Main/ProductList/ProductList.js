import React from 'react';
import { object, array } from 'prop-types';
import BookProduct from './Products/BookProduct';
import DVDProduct from './Products/DVDProduct';
import FurnitureProduct from './Products/FurnitureProducts';
import '../Main.scss';

const ProductList = ( { products } ) => {   

    const productTypes = new Map();
    productTypes.set('weight', <BookProduct product={ undefined }/>);
    productTypes.set('size', <DVDProduct product={ undefined }/>);
    productTypes.set('width', <FurnitureProduct product={ undefined }/>);

    return (
        <div className='products'>
            {
                products.map(( product ) => {
                    let type = JSON.parse(product['object']);
                    var numericArray = [];
                    
                    for(let itm in type){
                        numericArray.push(itm);
                    }
                    
                    if(productTypes.get(numericArray[0]) != undefined){
                        return React.cloneElement(productTypes.get(numericArray[0]), { product: { product } , key:  product['sku'] });
                    }
                    
                })
            }
        </div>
    );
};

ProductList.defaultProps = {
    props: {},
    products: []
};

ProductList.propTypes = {
    props: object,
    products: array
};

export default ProductList;