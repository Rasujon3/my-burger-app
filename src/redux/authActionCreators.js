import axios from 'axios';
import * as actionTypes from './actionTypes';

export const auth = (email,password, mode) => dispatch => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }
    let authUrl = null;
    if (mode==="Sign Up") {
        authUrl="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    }else{
        authUrl="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    const API_KEY= "AIzaSyAzvgPYiUaWdV3_g5r0GY-3MXR9kda6yCs";
    axios.post(authUrl + API_KEY, authData)
    .then(response => console.log(response))
}