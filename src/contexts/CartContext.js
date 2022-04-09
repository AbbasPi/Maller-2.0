import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import { useSnackbar } from 'react-simple-snackbar'
import {BASE_URL, TOKEN_STR} from "../utils/Constants";
import AuthContext from "./AuthContext";
const initValue = {
    carts:[],
    loading:true,
    empty:0,
    total:0,
    count:0,
    addToCarts:(obj)=>{},
    getCart:()=>{},
    removeCart:(id)=>{},
    addQty:(id,qt)=>{}
}
const CartContext = createContext(initValue)
export const CartProvider = ({children})=>{
const {isAuth, user} = useContext(AuthContext)
    const options = {
        position: 'bottom-right',
        style: {
            backgroundColor: '#39818d',
            border: '1px',
            color: 'white',
            fontFamily: 'Poppins',
            fontSize: '17px',
            textAlign: 'center',
            padding: '1px'
        },
        closeStyle: {
            color: 'red',
            fontSize: '15px',
        },
    }
    const [openSnackbar, closeSnackbar] = useSnackbar(options)
    const [carts, setCarts] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [empty, setEmpty] = useState(404)
    const [count, setCount] = useState(0)


    const getCart = () =>{
        if(user || isAuth === true){
        axios.get(`${BASE_URL}/cart/my`, { headers: {"Authorization" :
                    `${user.token_type} ${user.access_token}`} })
            .then((res)=>{
                setCarts([...res.data])
                if(carts){
                setLoading(false)
                setEmpty(0)
                setCount(carts.length)
                setTotal(carts.reduce((total, item)=>total+(item.product.lowest*item.item_qty),0))

                }
            }).catch(function (error) {
                if (error.response) {
                    setEmpty(error.response.status)
                }
            })
        }
    }


    useEffect(()=>{
        if(carts.length){
        setCount(carts.length)
        }
        else {
            setCount(0)
        }
    }, [isAuth, user, carts])


    const addToCarts = (cart)=>{
        let cartsTemp = carts
        if(isAuth){
        openSnackbar('Added To Cart')
        cartsTemp.push(cart)
        setCarts([...cartsTemp])
        axios.post(`${BASE_URL}/cart/my`, {  "product_id": cart,"item_qty": 1},
            { headers: {"Authorization" : `${user.token_type} ${user.access_token}`} })
            .then((res)=>{
                getCart()
                setEmpty(0)
            }).catch((err)=>{
                console.log(err)
        })
            if(carts.includes(cart)){
                setCount(count)
            }
            else setCount(count + 1)
        }
        if(!isAuth){
            openSnackbar('Login To Add To Cart')
        }
    }


    const removeCart = ((id)=>{
        isAuth &&
        axios.delete(`${BASE_URL}/cart/item/delete/${id}`, { headers: {"Authorization":
                    `${user.token_type} ${user.access_token}`} }).then(()=>{
        let newCart = carts.filter((item) => item.id !== id);
        setCarts(newCart);
        }).catch((err)=>{
            console.log(err)})
        setTotal(carts.reduce((total, item)=>total+(item.product.lowest*item.item_qty),0))
            setCount(count - 1)
        if(count === 0){
            setEmpty(404)
        }
    })



    const addQty = ((id, qt)=>{
        isAuth &&
        axios.post(`${BASE_URL}/cart/item/change-qty/${id}?new_qty=${qt}`, {params: {id: id, new_qty: qt}},
            { headers: {"Authorization": `${user.token_type} ${user.access_token}`} })
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
            empty:empty,
            addToCarts,
            removeCart,
            addQty,
            getCart,
            setCount,
        }}
    >
        {children}
    </CartContext.Provider>
}
export default CartContext;