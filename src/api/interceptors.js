import axiosInstance from "./axios";

import {refreshOutdatedToken} from "../context/JWTAuthContext";



// axiosInstance.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
//     return config
// })


const AuthGuard = ({ children }) => {
    axiosInstance.interceptors.response.use((response) => {

        return response
    }, async (error) => {
        const originalRequest = error.config;



        // if (originalRequest._retry === true && !error.response) {
        //     history.push('/login'); //navigate
        //     return;
        // }
        //
        //
        // if (error.response.status === 401 && error.config && !originalRequest._isRetry || !error.response) {
        //     // const originalRequest = error.config
        //     history.push('/login');
        //     return
        // }

        if (((error.response && error.response.status === 401 && !originalRequest._retry) || (!error.response))) {
            console.log('REFRESH')
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
                // case 500:
                //     const { headers, data, baseURL, url } = originalRequest;
                //     if (url === '/latestVideos' || url === '/latestTweets') {
                //         break;
                //     } else {
                //         dispatch(handleHttpMeta({
                //             headers,
                //             data,
                //             endpoint: baseURL + url.slice(1)
                //         }));
                //     }
                //     dispatch(changeHttpErrorStatus(error.response.status));
                //     return history.push('/error');
                // case 402:
                //     dispatch(changeHttpErrorStatus(402));
                //     return history.push('/error');
                // case 404:
                //     dispatch(changeHttpErrorStatus(404));
                //     return history.push('/error');
                // case 400:
                //     break;
                // case 403:
                //     // todo: handle 403 error status too
                //     break;
                // case 401:
                //     return history.push('/login');
                // default:
                //     // throwing 800 fake status in case of other unexpected errors
                //     dispatch(changeHttpErrorStatus(error.response.status));
                //     return history.push('/error');
            }
        }
        return Promise.reject(error);

    })


// // const handle422 = (error, api) => {
// //     api.logout()
// // }
// //
// // const handle401 = (error, api) => {
// //     const { config } = error
// //     const originalRequest = config
// //     if (~error.response.config.url.indexOf('login')) {
// //         return Promise.reject(error)
// //     }
// //     if (~error.response.config.url.indexOf('refresh')) {
// //         api.logout()
// //
// //         return
// //     }
// //     api.refreshToken()
// //
// //     return new Promise((resolve) => {
// //         api.addSubscriber((access_token) => {
// //             originalRequest.headers.Authorization = `Bearer ${access_token}`
// //             resolve(api.service(originalRequest))
// //         })
// //     })
// // }
//
// const handle402 = () => {
//
// }
//
// const handle404 = () => {
//
// }
//
// const handle332 = () => {
//
// }
//
// const handle331 = () => {
//
// }
// const handle330 = () => {
//
// }
//
// const handle418 = () => {
//
// }
//
//
// const handle429 = () => {
//
// }
//
// const handle500 = () => {
//
// }
//
// function handleSuccess(response) {
//     return response
// }
//
// function handleError(error) {
//     switch (error.response.status) {
//         // let ui handle this code status
//         case 400:
//             break
//         case 401:
//             return handle401(error, this)
//         case 422:
//             return handle422(error, this)
//         case 402:
//             handle402(error)
//             break
//         case 404:
//             handle404(error)
//             break
//         case 331:
//             handle331(error)
//             break
//         case 330:
//             handle330(error)
//             break
//         case 332:
//             handle332(error)
//             break
//         case 429:
//             handle429(error)
//             break
//         default:
//             handle500(error)
//             break
//     }
//
//     return Promise.reject(error)
// }
//
// export { handleSuccess, handleError }

    return (
        <>
            {children}
        </>
    );
}

export default AuthGuard;