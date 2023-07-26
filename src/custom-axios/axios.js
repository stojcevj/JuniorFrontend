import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jovanjuniorwebdeveloper.000webhostapp.com/backend/',
    headers: {
        'Access-Control-Allow-Origin' : '*',
    }
});

export default instance;