import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'

export const userRegister = createAsyncThunk("USER_REGISTER", (data) => {
    return axios.post("http://localhost:3001/api/users/register", data) // chequear ruta
        .then(user => user.data)
});

export const userLogin = createAsyncThunk("USER_LOGIN", (data) => {
    return axios.post("http://localhost:3001/api/users/login", data)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.data))
            return user.data
        });
});

export const userLogout = createAsyncThunk("USER_LOGOUT", () => {
    return axios.post("http://localhost:3001/api/users/logout")
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