import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from 'uuid';


export const setAlert = (msg, alertType,timeout=3000) => dispatch => {
    const id = uuid.v4()
    console.log(msg);
    
    // dispatch({ type:REMOVE_ALERT, payload:id })
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    })
    setTimeout(() => dispatch({ type:REMOVE_ALERT, payload:id }), timeout )

}