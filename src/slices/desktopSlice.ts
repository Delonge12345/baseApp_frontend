import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from "../api/axios";
import {IUsersState} from "./interfaces/IAuth";


const initialState:IUsersState = {
    usersData:[],
    isLoading: false
};


export const getUsers = createAsyncThunk(
    'desktopSlice',
    async () => {
        const {data} = await axiosInstance.get('/users');
        return data
    }
)



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
    },
    extraReducers: {
        [getUsers.fulfilled.toString()]: (state, action) => {
            state.usersData = action.payload
            state.isLoading = false
        },
        [getUsers.pending.toString()]: (state) => {
           state.isLoading = true
            console.log('loading')
        },
        [getUsers.rejected.toString()]: (state) => {
            state.usersData = []
            state.isLoading = false
        },
    },
});
export const {reducer, actions} = desktopSlice;


// export const getUsers = () => async (dispatch) => {
//     try {
//         dispatch(actions.toggleLoading(true));
//         const {data} = await axiosInstance.get('/users');
//
//         dispatch(actions.setUsers(data))
//
//         dispatch(actions.toggleLoading(false));
//     } catch (e: any) {
//         console.log('err', e.message)
//         dispatch(actions.toggleLoading(false));
//     }
// };



