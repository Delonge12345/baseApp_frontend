import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axiosInstance from "../api/axios";
import {IUsersState, IUser} from "./interfaces/IAuth";

const initialState: IUsersState = {
    usersData: [],
    isLoading: false
};





type KnownError = {
    errorMessage : string;
}



export const getUsers = createAsyncThunk<Array<IUser>,
    void,
    { rejectValue: KnownError }>(
    // @ts-ignore
    'desktopSlice', async function (_, {rejectedWithValue}) {
        try {
            const {data} = await axiosInstance.get<Array<IUser>>('/users');

            return data

        } catch (e) {
            return rejectedWithValue("Error!!")
        }
    }
)


const desktopSlice = createSlice({
    name: 'desktopSlice',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<Array<IUser>>) {
            state.usersData = action.payload;

        },

        toggleLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {
        [getUsers.fulfilled.toString()]: (state, action: PayloadAction<Array<IUser>>) => {
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



