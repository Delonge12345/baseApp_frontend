import {FC} from "react";
import {Outlet} from 'react-router-dom';
import {Box, Button} from "@material-ui/core";


import useAuth from '../../hooks/useAuth';
import {useDispatch} from "react-redux";
import {getUsers} from "../../slices/desktopSlice";

export const MainLayout: FC = () => {

    const dispatch = useDispatch()
    const {logout} = useAuth();
    const {isAuthenticated} = useAuth()
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };


    const toggleGetUsers = () => {
        dispatch(getUsers())
    };


    return (
        <div>
            <div>{isAuthenticated && <Box mt={2}>
                <Button
                    onClick={handleLogout}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Log out
                </Button>
                <Button
                    onClick={toggleGetUsers}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Get users
                </Button>
            </Box>}</div>
            <Outlet/>
        </div>
    )
}