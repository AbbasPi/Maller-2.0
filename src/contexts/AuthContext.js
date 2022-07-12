import {createContext, useEffect, useReducer, useState} from "react";
import axios from '../utils/axios'
import {BASE_URL, TOKEN_KEY} from '../utils/Constants'
import {useNavigate} from "react-router-dom";

let initState = {
    isAuth:false,
    user:null,
    passwordAlert:false,
    login:()=>{},
    signup:()=>{},
    logout: ()=>{}
}
const AuthContext = createContext(initState)
const reducer = (oldState, action)=>{
    switch(action.type)
    {
        case 'LOGIN':
            return {
                ...oldState,
                isAuth:true
            }
        case 'LOGOUT':
            return {
                ...oldState,
                isAuth:false
            }
            default: return {...oldState}
    }
}


export const AuthProvider = ({children})=>{
    const navigate = useNavigate()
    const [passwordAlert, setPasswordAlert] = useState(false)
    const [user, setUser] = useState({})
    const [state, dispatch] = useReducer(reducer, initState)
    const logout = ()=>{
        localStorage.removeItem(TOKEN_KEY);
        dispatch({
            type:'LOGOUT'
        })
    }
    const login = (data)=>{
        axios.post(`${BASE_URL}/auth/signin`, data).then((response)=>{
            dispatch({
                    type:'LOGIN'
                })
                let data = response.data;
                setUser(data.token)
                localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
                navigate('/')
            })
            .catch((err)=>{
                console.log(err)

            })
    }

    const signup = data => {
        if (data.password1 !== data.password2) {
            setPasswordAlert(true)
            return 0
        } else setPasswordAlert(false)
        axios.post(`${BASE_URL}/auth/signup`, data).then((res) => {
            dispatch({
                type:'LOGIN'
            })
            const data = res.data;
            setUser(data.token)
            localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }



    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem(TOKEN_KEY))
        if(data)
        {
            setUser(data.token)
            dispatch({
                type:'LOGIN'
            })
        }
    },[])
    return <AuthContext.Provider
        value={{
            ...state,
            login,
            logout,
            signup,
            user:user,
            passwordAlert:passwordAlert,
        }}
    >

        {children}
    </AuthContext.Provider>
}
export default AuthContext;