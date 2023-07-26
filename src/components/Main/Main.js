import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import './Main.scss';
import productRepository from '../../repository/productRepository';
import ProductList from './ProductList/ProductList';


const Main = () => {
    const [ products, setProducts ] = useState([]);

    const loadProducts = () => {
        productRepository.fetchProducts()
            .then((response) => {
                if(response.status == 200){
                    setProducts(response.data);
                }
            });
    };

    const deleteBooks = () => {
        var elementsToDelete = {};
        var elements = document.getElementsByClassName('delete-checkbox');
        for(var i = 0; i < elements.length; i++){
            if(elements[i].checked){
                elementsToDelete['id'+i] = elements[i].getAttribute('product-id');
            }
        }


        productRepository.deleteProducts(elementsToDelete)
            .then((response) => {
                console.log(response);
                loadProducts();
            });
    };

    useEffect(() => {
        loadProducts();
        console.log('1');
    }, []);
    
    return (
        <div className='container'>
            <Header onDelete={ deleteBooks }/>
            <ProductList products = { products } />
        </div> 
    );
};

export default Main;