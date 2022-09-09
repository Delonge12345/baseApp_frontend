import {FC, useState} from 'react'
import {useDispatch} from "react-redux";
import {login} from "../slices/authSlice";

export const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()



    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder={'email'}/>

            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder={'password'}/>

            <button onClick={() => dispatch(login(email, password))}>Login</button>
            {/*<button onClick={() => dispatch(register(email, password))}>Register</button>*/}
        </div>
    )
}