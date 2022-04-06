import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import { useSnackbar } from 'react-simple-snackbar'
import {BASE_URL, TOKEN_STR} from "../utils/Constants";
import AuthContext from "./AuthContext";
const initValue = {
    carts:[],
    loading:true,
    total:0,
    count:0,
    addToCarts:(obj)=>{},
    getCart:()=>{},
    removeCart:(id)=>{},
    addQty:(id,qt)=>{}
}
const CartContext = createContext(initValue)
export const CartProvider = ({children})=>{
const {isAuth} = useContext(AuthContext)
    const options = {
        position: 'bottom-right',
        style: {
            backgroundColor: '#39818d',
            border: '1px',
            color: 'white',
            fontFamily: 'Poppins',
            fontSize: '17px',
            textAlign: 'center',
        },
        closeStyle: {
            color: 'red',
            fontSize: '15px',
        },
    }
    const [openSnackbar, closeSnackbar] = useSnackbar(options)
    const [carts, setCarts] = useState([])
    const [msg, setMsg] = useState(null)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)
    const getCart = () =>{
        isAuth &&
        axios.get(`${BASE_URL}/cart/my`, { headers: {"Authorization" : `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
            .then((res)=>{
                setCarts([...res.data])
                setLoading(false)
                if(carts){
                setCount(res.data.length)
                }
            }).catch((err)=>[
                console.log(err)
        ])

    }

    useEffect(()=>{
        setCount(carts?.length)
        if(isAuth){
            setCount(0)
        }
    }, [carts, isAuth])
    const addToCarts = (cart)=>{
        let cartsTemp = carts
        if(isAuth){
            setMsg('Added To Cart Successfully')
        cartsTemp.push(cart)
        setCarts([...cartsTemp])
        axios.post(`${BASE_URL}/cart/my`, {  "product_id": cart,"item_qty": 1},
            { headers: {"Authorization" : `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
            .then((res)=>{
                getCart()
            })

        }
        if(!isAuth){
            setMsg('Login To Add To Cart')
        }
        openSnackbar(msg)
    }
    const removeCart = ((id)=>{
        isAuth &&
        axios.delete(`${BASE_URL}/cart/item/delete/${id}`, { headers: {"Authorization":
                    `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} }).then(()=>{
        setTotal(carts.reduce((total, item)=>total+(item.product.lowest*item.item_qty),0))

        })
        let newCart = carts.filter((item) => item.id !== id);
        setCarts(newCart);
    })
    const addQty = ((id, qt)=>{
        isAuth &&
        axios.post(`${BASE_URL}/cart/item/change-qty/${id}?new_qty=${qt}`, {params: {id: id, new_qty: qt}},
            { headers: {"Authorization": `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
            .then((res)=>{
            setCarts(res.data)
            setTotal(carts.reduce((total, item)=>total+(item.product.lowest*item.item_qty),0))
        }).catch((err)=>{
            console.log(err)
        })
    })
    return <CartContext.Provider
        value={{
            carts:carts,
            loading:loading,
            total:total,
            count:count,
            addToCarts,
            removeCart,
            addQty,
            getCart,
        }}
    >
        {children}
    </CartContext.Provider>
}
export default CartContext;