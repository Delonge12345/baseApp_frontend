import {combineReducers} from '@reduxjs/toolkit';
import {reducer as authReducer} from '../slices/authSlice'
const rootReducer = combineReducers({
    auth: authReducer,
});


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;