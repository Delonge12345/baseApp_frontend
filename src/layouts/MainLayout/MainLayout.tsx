import {FC} from "react";
import {Outlet} from 'react-router-dom';
export const MainLayout:FC = () => {

    return(
        <div>
            Main Layout
            <Outlet/>
        </div>
    )
}