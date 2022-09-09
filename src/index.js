import React from 'react'
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom'
import './index.css'

import reportWebVitals from './reportWebVitals'
import {Provider} from "react-redux";
import store from "./store";
import App from "./App";
import theme from "./theme/theme";
import {ThemeProvider} from "@material-ui/core/styles";
import {CssBaseline} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider";


// const root = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <BrowserRouter>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
