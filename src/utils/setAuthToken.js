import axios from 'axios'
const setAuthToken = token => {
    // console.log("util");
    
    // console.log(token);
    
    if (token) {
        // console.log("inside util and if");
        // console.log(token);
        // console.log(axios.defaults.headers.common['x-auth-token']);
        // delete axios.defaults.headers.common['x-auth-token'];
        
        // console.log(axios.defaults.headers.common);
        // console.log(token);
        
        axios.defaults.headers.common['x-auth-token'] = token
        // console.log(axios.defaults.headers.common['x-auth-token']);
        
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;