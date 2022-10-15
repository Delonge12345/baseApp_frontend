import React, {
    createContext,
    useEffect,
    useReducer
} from 'react';
import jwtDecode from 'jwt-decode';
import axiosInstance from "../api/axios";
import {LoadingScreen} from "../components/LoadingScreen";


const initialAuthState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null
};

/**
 * Checking for valid token
 * */
const isValidToken = async (accessToken) => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime ? true : await refreshOutdatedToken();
};

/**
 * Refreshing token if it's outdated
 * @returns status of operation for setting session (true|false)
 * */
export const refreshOutdatedToken = async () => {

    try {
        const refresh_token = localStorage.getItem('refreshToken');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${refresh_token}`;
        const response = await axiosInstance.post('/refresh');
        const {accessToken, refreshToken} = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return true;
    } catch (e) {
        return false;
    }
};

/**
 *  Setting current session with first app init
 * */
const setSession = (accessToken, refreshToken) => {
    if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete axiosInstance.defaults.headers.common.Authorization; // for all requests
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INITIALISE': {
            const {isAuthenticated, user} = action.payload;
            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user
            };
        }
        case 'LOGIN': {
            const {user} = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                user
            };
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        }
        case 'REGISTER': {

            console.log('TRUE')
            return {
                ...state,
                isAuthenticated: true,
            };
        }
        default: {
            return {...state};
        }
    }
};

const AuthContext = createContext({
    ...initialAuthState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {
    },
    registerUser: () => Promise.resolve()
});

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialAuthState);

    const login = async (loginData, password) => {
        const response = await axiosInstance.post('/login', {loginData, password});
        const {accessToken, refreshToken} = response.data;

        if (response.data.status === 'OK') {
            // Fetch personal user data if login is okay
            setSession(accessToken, refreshToken);

            dispatch({
                type: 'LOGIN',
                payload: {
                    user: {
                        email: 'user'
                    }
                }
            });
            return 'OK';
        } else
            return response.data.status;
    };


    const registerUser = async (values, registerAvatar) => {
        try {
            const {data} = await axiosInstance.post('/registration', {
                email: values.email,
                password: values.password,
                username: values.name,
                phone: values.phone,
                registerAvatar
            });
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            dispatch({
                type: 'REGISTER',
                payload: {
                    user: {
                        email: 'user'
                    }
                }
            });
            return 'OK';
        } catch (e) {
            return e.response?.data?.message
        }
    }

    const logout = async () => {
        await axiosInstance.post('/logout');
        setSession(null);
        dispatch({type: 'LOGOUT'});
    };


    useEffect(() => {
        const initApp = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken && await isValidToken(accessToken)) {
                    const newAccessToken = localStorage.getItem('accessToken');
                    const newRefreshToken = localStorage.getItem('refreshToken');
                    setSession(newAccessToken, newRefreshToken);


                    dispatch({
                        type: 'INITIALISE',
                        payload: {
                            isAuthenticated: true,
                            user: {
                                // avatar, name, email
                            }
                        }
                    });
                } else {
                    dispatch({
                        type: 'INITIALISE',
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                dispatch({
                    type: 'INITIALISE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };
        initApp();
    }, []);

    if (!state.isInitialised) {
        return <LoadingScreen/>;
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                registerUser
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
