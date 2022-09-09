import {FC} from "react";
import {useLocation, Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";

//@ts-ignore
export const AuthPrivateRout:FC<JSX.ElementChildrenAttribute> = ({children})  =>{

    const location = useLocation()
    //@ts-ignore
    const {auth} = useAuth()
    if(!auth.auth) {
        return <Navigate to="/login" state={{from: location}}/>
    }

    return  children;


}