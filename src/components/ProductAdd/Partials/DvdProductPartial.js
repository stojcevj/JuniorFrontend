import React, { useState, useEffect } from 'react';
import '../ProductAdd.scss';
import { func } from 'prop-types';

const DvdProductPartial = ({parentErrors}) => {
    const [formData, setFormData] = useState({
        'size': 0
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

            if(!values.size){
                emptyErr = true;
                typeErr = false;
            }

            if(isNaN(values.size)){
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
                <label htmlFor='size'>Size (MB)</label>
                <input value={ formData.size } type='text' id='size' name='size' className='form-control' onChange={ handleOnFormDataChange }></input>
            </div>
            <div className='duo-input'>
                <p>*Please provide a size for the dvd.</p>
            </div>
        </div>
    );
};

DvdProductPartial.defaultProps = {
    parentErrors: () => undefined,
};

DvdProductPartial.propTypes = {
    parentErrors:func,
};

export default DvdProductPartial;