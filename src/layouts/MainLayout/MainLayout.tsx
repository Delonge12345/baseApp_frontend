import {FC, useEffect} from "react";
import {Outlet} from 'react-router-dom';
import {Box, Button} from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import useAuth from '../../hooks/useAuth';
import {useDispatch} from "react-redux";
import {getUsers} from "../../slices/desktopSlice";
import {useSelector} from "../../store";

import {LoadingScreen} from "../../components/LoadingScreen";
import {AvatarComponent} from "../../components/AvatarComponent";


export const MainLayout: FC = () => {

    const dispatch = useDispatch()
    const {logout} = useAuth();
    const {isAuthenticated} = useAuth()

    //@ts-ignore
    const {usersData, isLoading} = useSelector(state => state.desktop)


    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUsers())
        }
    }, [isAuthenticated])

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
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

            {isAuthenticated &&

                (isLoading ? <LoadingScreen/> :
                    <Box style={{display: 'flex', flexWrap: 'wrap'}}>
                        {usersData.map((el) =>
                            //@ts-ignore
                            <Box style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <AvatarComponent avatar={el.avatar}/>
                                <p>{el.username}</p>
                            </Box>
                        )}
                    </Box>)
            }
            <Outlet/>
        </div>
    )
}