import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from "../api/axios";
import {IAuthState} from "./interfaces/IAuth";





const initialState: IAuthState = {
    isLoading: true,
    user: {
        email: null
    },
    isAuth: false
};


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user['email'] = action.payload;
        },
        toggleLoading(state, action) {
            state.isLoading = action.payload;
        },


        setAuth(state, action) {
            state.isAuth = action.payload;
        },


    }
});
export const {reducer, actions} = authSlice;


export const login = (email: string, password: string) => async (dispatch): Promise<void> => {
    try {
        dispatch(actions.toggleLoading(true));
        const {data} = await axiosInstance.post('/login', {email, password});
        console.log('data', data)

        localStorage.setItem('accessToken', data.accessToken)

        dispatch(actions.setAuth(true));
        dispatch(actions.setUser(data.email));

        dispatch(actions.toggleLoading(false));
    } catch (e: any) {
        console.log('err', e.message)
        dispatch(actions.toggleLoading(false));
    }
};

export const register = (email: string, password: string, username: string) => async (dispatch): Promise<void> => {
    try {
        dispatch(actions.toggleLoading(true));
        const {data} = await axiosInstance.post('/registration', {email, password,username});
        console.log('data', data)

        localStorage.setItem('accessToken', data.accessToken)

        dispatch(actions.setAuth(true));
        dispatch(actions.setUser(data.email));

        dispatch(actions.toggleLoading(false));


        return data
    } catch (e: any) {
        console.log('err', e.response?.data?.message)
        dispatch(actions.toggleLoading(false));
    }
};

export const logout = () => async (dispatch): Promise<void> => {
    try {
        dispatch(actions.toggleLoading(true));
        await axiosInstance.post('/logout');
        localStorage.removeItem('accessToken')

        dispatch(actions.setAuth(false));
        dispatch(actions.setUser(''));

        dispatch(actions.toggleLoading(false));
    } catch (e: any) {
        console.log('err', e.response?.data?.message)
        dispatch(actions.toggleLoading(false));
    }
};


