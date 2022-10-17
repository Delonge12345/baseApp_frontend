import {combineReducers} from '@reduxjs/toolkit';
import {reducer as authReducer} from '../slices/authSlice'
import {reducer as desktopReducer} from '../slices/desktopSlice'
import {getAllUsers} from '../slices/desktopRtkSlice'


const rootReducer = combineReducers({
    auth: authReducer,
    desktop:desktopReducer,
    [getAllUsers.reducerPath]: getAllUsers.reducer
});


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;