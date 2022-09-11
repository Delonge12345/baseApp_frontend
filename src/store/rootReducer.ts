import {combineReducers} from '@reduxjs/toolkit';
import {reducer as authReducer} from '../slices/authSlice'
import {reducer as desktopRducer} from '../slices/desktopSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    desktop:desktopRducer
});


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;