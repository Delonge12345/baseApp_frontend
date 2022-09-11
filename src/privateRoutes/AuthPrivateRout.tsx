import {FC} from "react";
import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

//@ts-ignore
export const AuthPrivateRout:FC<JSX.ElementChildrenAttribute> = ({children})  =>{

    const location = useLocation()

    //@ts-ignore
    const {isAuth} = useSelector(state => state.auth)

    if(!isAuth) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    return  children;


}