import React, {useContext, useEffect, useState} from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import { useSnackbar } from 'react-simple-snackbar'
import {BASE_URL} from "./utils/Constants";
import axios from "axios";
import AuthContext from "./contexts/AuthContext";
const Rate = ({productId, setTrigger}) => {
    const [rate, setRate] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const {isAuth, user} = useContext(AuthContext)
    const options = {
        position: 'bottom-right',
        style: {
            backgroundColor: '#5D90E8',
            border: '1px',
            color: 'white',
            fontFamily: 'Poppins',
            fontSize: '17px',
            textAlign: 'center',
            padding: '1px'
        },
        closeStyle: {
            color: 'white',
            fontSize: '15px',
        },
    }
    const [openSnackbar, closeSnackbar] = useSnackbar(options)
    useEffect(()=>{
        axios.get(`${BASE_URL}/product-rating/user/${productId}`, {headers: {"Authorization": `${user.token_type} ${user.access_token}`}})
            .then((res)=>{
            setUserRating(res.data)
                console.log(userRating)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])
    const addRating = (rate) =>{
        openSnackbar(`Rating Added (${rate})`)
        if (isAuth === true){
            axios.post(`${BASE_URL}/product-rating`, {rate: rate, product_id: productId},
                {
                    headers: {"Authorization": `${user.token_type} ${user.access_token}`}
                })
        }
    }
    return (
        <Container>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label key={index}>
                        <Radio
                            type="radio"
                            onClick={() => {
                                setUserRating(givenRating)
                                addRating(givenRating)
                                setTrigger(prev=> prev+1)
                            }}
                        />
                        <Rating>
                            <FaStar
                                color={
                                    givenRating <= userRating
                                        ? "blue"
                                        : "gray "
                                }
                            />
                        </Rating>
                    </label>
                );
            })}
        </Container>
    );
};

export default Rate;