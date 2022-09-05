import axios from 'axios';
import {USE_DEV_API} from "../config";


const axiosInstance = axios.create({
        baseURL: !USE_DEV_API ? "" : '',
    }
);

export default axiosInstance;
