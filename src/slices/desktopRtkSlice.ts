import axiosInstance from "../api/axios";
import {createApi} from '@reduxjs/toolkit/query/react'
import type {BaseQueryFn} from '@reduxjs/toolkit/query'
import type {AxiosError, AxiosRequestConfig} from 'axios'


const axiosBaseQuery = (): BaseQueryFn<{
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
},
    unknown,
    unknown> =>
    async ({url, method, data, params}) => {
        try {
            const result = await axiosInstance({url: url, method, data, params})
            return {data: result.data}
        } catch (axiosError) {
            const err = axiosError as AxiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }



    export const emptySplitApi = createApi({
        baseQuery: axiosBaseQuery(),
        endpoints: () => ({})
    })


// type User = {
//
// }
// /////////////////////////////////////////////////////////////////////////////
// const extendedApi = emptySplitApi.injectEndpoints({
//     endpoints: (build) => ({
//         getAllUsers: build.query<User[], void>({
//             query: () => ({ url: "users", method: "get" }),
//             transformResponse(baseQueryReturnValue: BaseQueryResult<BaseQuery>, meta: BaseQueryMeta<BaseQuery>, arg: QueryArg): Promise<ResultType> | ResultType {
//
//
//             }
//         })
//     }),
//     overrideExisting: false,
// })




export const getAllUsers = createApi({
    reducerPath: "getAllUsersApi",
    baseQuery: axiosBaseQuery(),
    endpoints(build) {
        return {
            getAllUsers: build.query({
                query: () => ({ url: "users", method: "get" }),
            }),
        };
    },
});


export const {useGetAllUsersQuery} = getAllUsers
