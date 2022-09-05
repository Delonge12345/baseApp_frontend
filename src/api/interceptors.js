import React from 'react'


// const handle422 = (error, api) => {
//     api.logout()
// }
//
// const handle401 = (error, api) => {
//     const { config } = error
//     const originalRequest = config
//     if (~error.response.config.url.indexOf('login')) {
//         return Promise.reject(error)
//     }
//     if (~error.response.config.url.indexOf('refresh')) {
//         api.logout()
//
//         return
//     }
//     api.refreshToken()
//
//     return new Promise((resolve) => {
//         api.addSubscriber((access_token) => {
//             originalRequest.headers.Authorization = `Bearer ${access_token}`
//             resolve(api.service(originalRequest))
//         })
//     })
// }

const handle402 = () => {

}

const handle404 = () => {

}

const handle332 = () => {

}

const handle331 = () => {

}
const handle330 = () => {

}

const handle418 = () => {

}


const handle429 = () => {

}

const handle500 = () => {

}

function handleSuccess(response) {
    return response
}

function handleError(error) {
    switch (error.response.status) {
        // let ui handle this code status
        case 400:
            break
        case 401:
            return handle401(error, this)
        case 422:
            return handle422(error, this)
        case 402:
            handle402(error)
            break
        case 404:
            handle404(error)
            break
        case 331:
            handle331(error)
            break
        case 330:
            handle330(error)
            break
        case 332:
            handle332(error)
            break
        case 429:
            handle429(error)
            break
        default:
            handle500(error)
            break
    }

    return Promise.reject(error)
}

export { handleSuccess, handleError }
