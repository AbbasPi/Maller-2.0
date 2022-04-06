import {createContext, useContext, useEffect, useReducer} from "react";
import axios from '../utils/axios'
import {BASE_URL, TOKEN_KEY} from '../utils/Constants'
import {useNavigate} from "react-router-dom";
import CartContext from "./CartContext";
let initState = {
    isAuth:false,
    user:null,
    login:()=>{},
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

    }
}


export const AuthProvider = ({children})=>{
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer,initState)

    const logout = ()=>{
        localStorage.removeItem(TOKEN_KEY);
        console.log('logout event')
        dispatch({
            type:'LOGOUT'
        })
    }
    const login = (data)=>{
        axios.post(`${BASE_URL}/auth/signin`, data).then((response)=>{
                console.log(response)
                let data = response.data;
                localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
                dispatch({
                    type:'LOGIN'
                })
                navigate('/')
            })
            .catch((err)=>{
                console.log(err)

            })
    }
    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem(TOKEN_KEY))
        console.log('use effect , data is : ',data)
        if(data)
        {
            dispatch({
                type:'LOGIN'
            })
        }
    },[])
    return <AuthContext.Provider
        value={{
            ...state,
            login,
            logout
        }}
    >

        {children}
    </AuthContext.Provider>
}
export default AuthContext;