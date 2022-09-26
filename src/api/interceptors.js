import axiosInstance from "./axios";
import {refreshOutdatedToken} from "../context/JWTAuthContext";



const AuthGuard = ({children}) => {
    axiosInstance.interceptors.response.use((response) => {
        return response
    }, async (error) => {
        const originalRequest = error.config;

        if (((error.response && error.response.status === 401 && !originalRequest._retry) || (!error.response))) {
            originalRequest._isRetry = true
            try {
                originalRequest._retry = await refreshOutdatedToken();
                originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
                return axiosInstance.request(originalRequest)
            } catch (e) {
                console.log('Unauthorized')
            }
        }

        if (error.response) {
            switch (error.response.status) {

            }
        }
        return Promise.reject(error);

    })

    return (
        <>
            {children}
        </>
    );
}

export default AuthGuard;