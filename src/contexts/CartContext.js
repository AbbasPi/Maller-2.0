import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {BASE_URL, TOKEN_STR} from "../utils/Constants";
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
    const [carts, setCarts] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)
    const getCart = () =>{
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
    }, [carts])
    const addToCarts = (cart)=>{
        let cartsTemp = carts
        cartsTemp.push(cart)
        setCarts([...cartsTemp])
        axios.post(`${BASE_URL}/cart/my`, {  "product_id": cart,"item_qty": 1},
            { headers: {"Authorization" : `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
            .then((res)=>{
                getCart()
            })
    }
    const removeCart = ((id)=>{
        axios.delete(`${BASE_URL}/cart/item/delete/${id}`, { headers: {"Authorization":
                    `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
        const newCart = carts.filter((item) => item.id !== id);
        setCarts(newCart);
        setTotal(carts.reduce((total, item)=>total+(item.product.lowest*item.item_qty),0))
    })
    const addQty = ((id, qt)=>{
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
            getCart
        }}
    >
        {children}
    </CartContext.Provider>
}
export default CartContext;