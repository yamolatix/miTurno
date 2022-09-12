import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import PATH from '../path';

export const userRegister = createAsyncThunk("USER_REGISTER", (data) => {
    return axios.post(`${PATH}/api/user/register`, data) // chequear ruta
        .then(user => {
            localStorage.setItem('registered', JSON.stringify(user.data))
            return user.data
        })
        .catch(err => console.log(err))
});

export const userLogin = createAsyncThunk("USER_LOGIN", (data) => {
    return axios.post(`${PATH}/api/user/login`, data)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.data))
            return user.data
        });
});

export const userLogout = createAsyncThunk("USER_LOGOUT", () => {
    return axios.post(`${PATH}/api/user/logout`)
        .then(() => {
            localStorage.removeItem('user')
            return { }
        })
});

const userReducer = createReducer({}, {
    [userRegister.fulfilled]: (state, action) => action.payload,
    [userLogin.fulfilled]: (state, action) => action.payload,
    [userLogout.fulfilled]: (state, action) => action.payload,
});

export default userReducer;