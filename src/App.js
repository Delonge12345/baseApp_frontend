import {renderRoutes} from "./routes";
import useAuth from "./hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";





function App() {

    const {isAuthenticated} = useAuth()
    let navigate = useNavigate();

    useEffect(() => {
        if(!window.location.pathname.includes('restore')){
            if (!isAuthenticated) {
                navigate("/login");
            } else {
                navigate("/");
            }

        }

    },[isAuthenticated])


    return (
        <div>
            {renderRoutes()}
        </div>


    )
}

export default App
