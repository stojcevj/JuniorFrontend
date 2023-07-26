import {React, useState, useEffect} from 'react';
import '../ProductAdd.scss';
import { func } from 'prop-types';

const FurnitureProductPartial = ({parentErrors}) => {
    const [formData, setFormData] = useState({
        'width': 0,
        'height': 0,
        'lengthForm': 0
    });

    const handleOnFormDataChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value
        });
    };

    useEffect(() => {
        const validate = (values) => {
            var emptyErr = false;
            var typeErr = false;

            if(!values.width || !values.height || !values.lengthForm){
                emptyErr = true;
                typeErr = false;
            }

            if(isNaN(values.width) || isNaN(values.height) || isNaN(values.lengthForm)){
                emptyErr = false;
                typeErr = true;
            }

            parentErrors(emptyErr, typeErr);
        };

        validate(formData);

    }, [formData,parentErrors]);

    return (
        <div>
            <div className='duo-input'>
                <label htmlFor='height'>Height (CM)</label>
                <input value={ formData.height } type='text' id='height' name='height' className='form-control' onChange={ handleOnFormDataChange }></input>
            </div>
            <div className='duo-input'>
                <label htmlFor='width'>Width (CM)</label>
                <input value={ formData.width } type='text' id='width' name='width' className='form-control' onChange={ handleOnFormDataChange }></input>
            </div>
            <div className='duo-input'>
                <label htmlFor='length'>Length (CM)</label>
                <input value={ formData.lengthForm } type='text' id='length' name='lengthForm' className='form-control' onChange={ handleOnFormDataChange }></input>
            </div>
            <div className='duo-input'>
                <p>*Please provide a WxHxL for your furniture.</p>
            </div>
        </div>
    );
};


FurnitureProductPartial.defaultProps = {
    parentErrors: () => undefined,
};

FurnitureProductPartial.propTypes = {
    parentErrors:func,
};


export default FurnitureProductPartial;