import {FC} from "react";
import {Outlet} from 'react-router-dom';
import {Box, Button} from "@material-ui/core";


import useAuth from '../../hooks/useAuth';

export const MainLayout: FC = () => {
    const { logout } = useAuth();
    const {isAuthenticated} = useAuth()
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
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
            </Box>}</div>
            <Outlet/>
        </div>
    )
}