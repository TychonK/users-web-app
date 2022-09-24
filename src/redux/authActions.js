import { createAction, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseUrl } from './api'

import swal from 'sweetalert';

import { createAsyncThunk } from '@reduxjs/toolkit'

axios.defaults.baseURL = `${baseUrl}`

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    unset() {
        axios.defaults.headers.common.Authorization = ''
    },
}

export const fetchStart = createAction('auth/FETCH_START')
export const fetchSuccess = createAction('auth/FETCH_SUCCESS')
export const fetchFailure = createAction('auth/FETCH_FAILURE')
export const fetchRegisterSuccess = createAction('auth/FETCH_REGISTER_SUCCESS')

export const fetchOnUserRegister = args => dispatch => {
    dispatch(fetchStart())
    axios.post(`/auth/signup`, args)
        .then(response => response.data)
        .then(data => {
            dispatch(fetchRegisterSuccess(data))
            swal("Congratulations!", `You have created an account!`, "success");
        })
        .catch(err => {
            dispatch(fetchFailure())
            swal("Oops!", `Error ${err.response.data.code} occured. ${err.response.data.message}.`, "error");
        })
}

export const fetchOnUserLogin = args => dispatch => {
    dispatch(fetchStart())
    axios.post(`/auth/login`, args)
        .then(response => response.data.data)
        .then(data => {
            dispatch(fetchSuccess(data))
            token.set(data.token)
            swal(`Hello, ${data.user.name}`, `You have logged into your account!`, "success");
        })
        .catch(err => {
            dispatch(fetchFailure())
            swal("Oops! Wrong mail or password.", `Error ${err} occured.`, "error");
        })
}

export const logoutFetchSuccess = createAction('logout/FETCH_SUCCESS')
export const logoutFetchFailure = createAction('logout/FETCH_FAILURE')

export const fetchOnUserLogout = config => dispatch => {
    dispatch(fetchStart())
    axios.post(`/auth/logout`, null)
        .then(response => response)
        .then(data => {
            dispatch(logoutFetchSuccess())
            swal(`Bye!`, `You have logged out of your account!`, "success");
            token.unset()
        })
        .catch(err => {
            dispatch(logoutFetchFailure())
            console.log(err)
            swal("Oops! Something went wrong", `Error ${err.response.status} occured.`, "error");
        })
}

export const fetchCurrentUser = createAsyncThunk("auth/REFRESH", async(_, thunkAPI) => {
    const state = thunkAPI.getState()
    const persistedToken = state.userReducer.token

    if (persistedToken === '') {
        console.log("no token = no fetch")
        return thunkAPI.isRejectedWithValue()
    }

    token.set(persistedToken)

    try {
        const { data } = await axios.get('/users/current')
        return data
    } catch (err) {
        console.log(err)
        return thunkAPI.isRejectedWithValue()
    }
})