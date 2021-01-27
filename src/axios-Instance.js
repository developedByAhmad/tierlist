import axios from 'axios';

// var userToken = localStorage.getItem('userToken')
const axiosInstance = axios.create({
    baseURL: process.env.PORT || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
        // 'Authorization': `Bearer ${userToken}`
    }
});

export default axiosInstance;

