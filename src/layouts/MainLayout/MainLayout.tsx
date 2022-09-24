import {FC, useEffect} from "react";
import {Outlet} from 'react-router-dom';
import {Box, Button} from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


import IconButton from '@mui/material/IconButton';


import useAuth from '../../hooks/useAuth';
import {useDispatch} from "react-redux";
import {getUsers} from "../../slices/desktopSlice";
// import {useSelector} from "../../store";

export const MainLayout: FC = () => {

    const dispatch = useDispatch()
    const {logout} = useAuth();
    const {isAuthenticated} = useAuth()

    // const {usersData, isLoading} = useSelector(state => state.desktop)
    //
    // console.log('usersData',usersData)
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if(isAuthenticated) {
            dispatch(getUsers())
        }
    },[ isAuthenticated])

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar style={{display:'flex', justifyContent:'flex-end'}}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}>
                        </IconButton>
                        {isAuthenticated && <Button color="inherit" onClick={handleLogout}>Выйти</Button>}
                    </Toolbar>
                </AppBar>
            </Box>

            <Outlet/>
        </div>
    )
}