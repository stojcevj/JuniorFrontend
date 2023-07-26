import React, { useEffect } from 'react';
import './ProductAdd.scss';
import Header from './Header/Header';
import { useState } from 'react';
import DvdProductPartial from './Partials/DvdProductPartial';
import BookProductPartial from './Partials/BookProductPartial';
import FurnitureProductPartial from './Partials/FurnitureProductPartial';
import productRepository from '../../repository/productRepository';
import { useNavigate } from 'react-router-dom';

const ProductAdd = () => {
    const [type, setType] = useState('Type Switcher');
    const [DvdProduct, setDvdProduct] = useState(false);
    const [BookProduct, setBookProduct] = useState(false);
    const [FurnitureProduct, setFurnitureProduct] = useState(false);
    const [errors, setErrors] = useState({});
    const [childErrors] = useState({});
    const navigate = useNavigate();

    const dvdProductSelected = () => {
        setDvdProduct(true);
        setBookProduct(false);
        setFurnitureProduct(false);
    };

    const furnitureProductSelected = () => {
        setDvdProduct(false);
        setBookProduct(false);
        setFurnitureProduct(true);
    };

    const bookProductSelected = () => {
        setDvdProduct(false);
        setBookProduct(true);
        setFurnitureProduct(false);
    };

    const noProductSelected = () => {
        setDvdProduct(false);
        setBookProduct(false);
        setFurnitureProduct(false);
    };

    const [formData, setFormData] = useState({
        'sku' : '',
        'name': '',
        'price': 0
    });

    const handleOnFormDataChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value
        });
    };

    const handleOnFormSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(formData));

        if(childErrors.emptyErr == '' && childErrors.typeErr == '' && (childErrors.typeSelectorError == '' || childErrors.typeSelectorError == undefined)){
            addProduct(e);
        }
    };

    const addProduct = (data) => {
        var dataToPost = {};
        var typeToPost = '';

        for(var i = 1; i < Object.keys(data.target).length-2; i++){
            if(data.target[i].name == 'type'){
                typeToPost = data.target[i].value;
            }else if(data.target[i].name == 'lengthForm'){
                dataToPost['length'] = data.target[i].value;
            }else{
                dataToPost[data.target[i].name] = data.target[i].value;
            }            
        }

        productRepository.addProduct(dataToPost, typeToPost)
            .then(() => {
                navigate('/');
            });
    };

    const handleOnTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleChildErrors = (emptyErr, typeErr) => {
        if(emptyErr){
            childErrors.emptyErr = 'Please fill the required fields';
        }else{
            childErrors.emptyErr = '';
        }
        if(typeErr){
            childErrors.typeErr = 'Please fill the required type';
        }else{
            childErrors.typeErr = '';
        }
    };

    const validate = (values) => {
        const errors = {};
        
        if(!values.sku || !values.name || !values.price){
            errors.emptyErr = 'Please fill the required fields';
        }

        if(isNaN(values.price)){
            errors.typeErr = 'Please fill the required type';
        }

        if(type === 'Type Switcher'){
            errors.typeSelectorError = 'Please select type';
        }

        if(childErrors.emptyErr && !errors.emptyErr){
            errors.emptyErr = childErrors.emptyErr;
        }

        if(childErrors.typeErr && !errors.typeErr){
            errors.typeErr = childErrors.typeErr;
        }

        return errors;
    };

    const productTypes = new Map();
    productTypes.set('DvdProduct', dvdProductSelected);
    productTypes.set('FurnitureProduct', furnitureProductSelected);
    productTypes.set('BookProduct', bookProductSelected);
    productTypes.set('Type Switcher', noProductSelected);

    useEffect(() => {
        productTypes.get(type)();
    }, [type]);

    return (
        <div className='container'>
            <Header />
            <div className='form-container'>
                <form className='form' id='product_form' onSubmit={ handleOnFormSubmit }>
                    <div className='errors'>
                        <p className='txt-desc'>{ errors.emptyErr }</p>
                        <p className='txt-desc'>{ errors.typeErr }</p>  
                        <p className='txt-desc'>{ errors.typeSelectorError }</p>                 
                    </div>
                    <div className='duo-input'>
                        <label htmlFor='sku'>SKU</label>
                        <input value={ formData.sku } type='text' id='sku' name='sku' className='form-control' onChange={ handleOnFormDataChange }></input>
                    </div>
                    <div className='duo-input'>
                        <label htmlFor='name'>Name</label>
                        <input value={ formData.name } type='text' id='name' name='name' className='form-control' onChange={ handleOnFormDataChange }></input>
                    </div>
                    <div className='duo-input'>
                        <label htmlFor='price'>Price ($)</label>
                        <input value={ formData.price } type='text' id='price' name='price' className='form-control' onChange={ handleOnFormDataChange }></input>
                    </div>
                    <div className='duo-input'>
                        <label htmlFor='productType'>Type Switcher</label>
                        <select value={ type } id='productType' name='type' onChange={ handleOnTypeChange }>
                            <option value='Type Switcher' id='Type Switcher'>Type Switcher</option>
                            <option value='DvdProduct' id='DVD'>DVD</option>
                            <option value='FurnitureProduct' id='Furniture'>Furniture</option>
                            <option value='BookProduct' id='Book'>Book</option>
                        </select>
                    </div>

                    {DvdProduct && <DvdProductPartial parentErrors = { handleChildErrors } />}
                    {BookProduct && <BookProductPartial parentErrors = { handleChildErrors } />}
                    {FurnitureProduct && <FurnitureProductPartial parentErrors = { handleChildErrors } />}

                </form>
            </div>
        </div> 
    );
};

export default ProductAdd;