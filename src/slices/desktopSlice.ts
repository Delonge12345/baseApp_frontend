import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from "../api/axios";
import {IUsersState} from "./interfaces/IAuth";


const initialState:IUsersState = {
    usersData:[],
    isLoading: false
};


const desktopSlice = createSlice({
    name: 'desktopSlice',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.usersData = action.payload;
        },

        toggleLoading(state, action) {
            state.isLoading = action.payload;
        },

    }
});
export const {reducer, actions} = desktopSlice;


export const getUsers = () => async (dispatch) => {
    try {
        dispatch(actions.toggleLoading(true));
        const {data} = await axiosInstance.get('/users');

        console.log('data',data)
        actions.setUsers(data)

        dispatch(actions.toggleLoading(false));
    } catch (e: any) {
        console.log('err', e.message)
        dispatch(actions.toggleLoading(false));
    }
};



