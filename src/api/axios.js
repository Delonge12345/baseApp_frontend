import axios from 'axios';


export const API_URL = `http://localhost:8000/api`

const axiosInstance = axios.create({
        withCredentials: true,
        baseURL: API_URL,
        responseType: 'json',

    }
);

export default axiosInstance;
