import { useContext } from "react";
import AuthContext from "../context/JWTAuthContext";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;