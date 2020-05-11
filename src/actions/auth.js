import axios from 'axios'
import { setAlert } from "./alert"
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
}
from "./types"
import setAuthToken from "../utils/setAuthToken"

// LOAD USER
    export const loadUser = () => async dispatch => {
        if(localStorage.token) {
            setAuthToken(localStorage)
        }

        try {
            const config={headers:{
                "x-auth-token":localStorage.token
             }
            }
            const res=await axios.get("http://127.0.0.1:5000/api/auth",config)
            // console.log("userloaded");
            // console.log(res.data);
            
            
            dispatch({
                type: USER_LOADED,
                payload:res.data
            })
        } catch (err) {
            // console.log("user is not loaded");
            
            // console.log(err.response);
            
            dispatch({type:AUTH_ERROR})
        }
    }

// Register User
export const register = ({ name, email, password }) =>async dispatch => {
    

    const config ={
        headers:{
           "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({name,email,password})
    // console.log(body);
    

    try {
        
        
        const res= await axios.post("http://127.0.0.1:5000/api/users",body,config)      
        
        // console.log(res.data);
        
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    }
    catch(err){
               
        var errors = err.response.data.errors
        if (errors===undefined)
        {
            errors = err.response.data.error
        }
        
               
        
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")))
        }
        dispatch({
            type:REGISTER_FAIL
        })

    }
}

// LOGIN
export const login = ({ email, password }) =>async dispatch => {
    // console.log(email);
    
    

    const config ={
        headers:{
           "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({email,password})
    // console.log(body);
    

    try {
        
        
        const res= await axios.post("http://127.0.0.1:5000/api/auth",body,config)      
        
        console.log(res.data);
        
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    }
    catch(err){
               
        var errors = err.response.data.errors
        if (errors===undefined)
        {
            errors = err.response.data.error
        }
        
               
        
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")))
        }
        dispatch({
            type:LOGIN_FAIL
        })

    }
}

// LOGOUT / CLEAR PROFILE
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}