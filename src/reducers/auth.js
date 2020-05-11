import { REGISTER_SUCCESS, REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGOUT, LOGIN_SUCCESS } from "../actions/types"

const initialState = {
    token:localStorage.getItem("token"),
    isAuthenticated: null,
    loading:true,
    user:null
}

export default function(state= initialState,action) {
    // console.log("outside of action");
    
    const {type,payload} = action
    // console.log(action);
    
    

    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            // console.log("REG_SUC");
            // console.log(payload.token);         
            
            localStorage.setItem("token", payload.token)
            // var data = localStorage.getItem("token")
            // console.log("data");
            // console.log(data);
            
            
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem("token")
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }
        default:
            return state
    }
}