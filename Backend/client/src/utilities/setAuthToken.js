import axios from 'axios';

const setAuthToken = (token) => {
    if(token) {
        axios.defaults.headers.common['Authorization-token'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization-token'];
    }
}

export default setAuthToken;