import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from "../api/axios";


const initialState = {
    isLoading: true,
    user: {},
    isAuth: false
};


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser(state, action) {
            state.desktopData = action.payload;
        },
        toggleLoading(state, action) {
            state.isLoading = action.payload;
        },


        setAuth(state, action) {
            state.isAuth = action.payload;
        },


    }
});
export const reducer = authSlice.reducer;
const {actions} = authSlice;


export const login = (email, password) => async dispatch => {
    try {
        dispatch(actions.toggleLoading(true));
        const {data} = await axiosInstance.post('/login', {email, password});
        console.log('data',data)

        localStorage.setItem('accessToken',data.accessToken )

        dispatch(actions.setAuth(true));
        dispatch(actions.setUser(data.email));

        dispatch(actions.toggleLoading(false));
    } catch (e) {
        console.log('err', e.message)
        dispatch(actions.toggleLoading(false));
    }
};

export const register = (email, password) => async dispatch => {
    try {
        dispatch(actions.toggleLoading(true));
        const {data} = await axiosInstance.post('/registration', {email, password});
        console.log('data',data)

        localStorage.setItem('accessToken',data.accessToken )

        dispatch(actions.setAuth(true));
        dispatch(actions.setUser(data.email));

        dispatch(actions.toggleLoading(false));
    } catch (e) {
        console.log('err', e.response?.data?.message)
        dispatch(actions.toggleLoading(false));
    }
};

export const logout = () => async dispatch => {
    try {
        dispatch(actions.toggleLoading(true));
        const {data} = await axiosInstance.post('/logout');
        localStorage.removeItem('accessToken' )

        dispatch(actions.setAuth(false));
        dispatch(actions.setUser(''));

        dispatch(actions.toggleLoading(false));
    } catch (e) {
        console.log('err', e.response?.data?.message)
        dispatch(actions.toggleLoading(false));
    }
};


