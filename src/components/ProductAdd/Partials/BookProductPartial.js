import React, { useEffect, useState } from 'react';
import '../ProductAdd.scss';
import { func } from 'prop-types';

const BookProductPartial = ({parentErrors}) => {
    const [formData, setFormData] = useState({
        'weight': 0
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

            if(!values.weight){
                emptyErr = true;
                typeErr = false;
            }

            if(isNaN(values.weight)){
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
                <label htmlFor='weight'>Weight (KG)</label>
                <input value={ formData.weight } type='text' id='weight' name='weight' className='form-control' onChange={ handleOnFormDataChange }></input>
            </div>
            <div className='duo-input'>
                <p>*Please provide a weight for the book.</p>
            </div>
        </div>
    );
};

BookProductPartial.defaultProps = {
    parentErrors: () => undefined,
};

BookProductPartial.propTypes = {
    parentErrors:func,
};

export default BookProductPartial;