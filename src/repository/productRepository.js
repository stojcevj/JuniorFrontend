import axios from '../custom-axios/axios';

const productRepository = {
    fetchProducts: () => {
        return axios.get('/');
    },
    deleteProducts: (elements) => {
        return axios.post('/', {
            body: JSON.stringify(elements)
        });
    },
    addProduct: (elements, type) => {
        return axios.post('/addProduct?type=' + type, {
            elements: elements,
            headers: { 'Content-Type' : 'application/json'}
        });
    }
};

export default productRepository;