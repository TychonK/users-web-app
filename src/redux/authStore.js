import { createSlice } from '@reduxjs/toolkit'

import * as registerActions from './authActions'
import * as userActions from './usersActions'

const userSlice = createSlice({
    name: 'register',
    initialState: {
        user: { name: '', email: '' },
        token: '',
        isLoggedIn: false,
        loading: false,
        isFetchingCurrentUser: false,
    },
    extraReducers: {
        [registerActions.fetchStart]: (state, action) => {
            return {
                ...state,
                loading: true,
            }
        },
        [registerActions.fetchSuccess]: (state, action) => {
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                token: action.payload.token,
                user: {name: action.payload.user.name, email: action.payload.user.email,},
            }
        },
        [registerActions.fetchRegisterSuccess]: (state, action) => {
            return {
                ...state,
                loading: false
            }
        },
        [registerActions.fetchFailure]: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        [registerActions.logoutFetchSuccess]: (state, action) => {
            return {
                ...state,
                user: { name: '', email: '' },
                token: '',
                isLoggedIn: false,
                loading: false,
            }
        },
        [registerActions.logoutFetchFailure]: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        [registerActions.fetchCurrentUser.pending]: (state, action) => {
            state.isFetchingCurrentUser = true;
        },
        [registerActions.fetchCurrentUser.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                isFetchingCurrentUser: false,
                user: {name: action.payload.user.name, email: action.payload.user.email},
            }
        },
        [registerActions.fetchCurrentUser.rejected]: (state, action) => {
            state.isFetchingCurrentUser = false;
        },
        [userActions.currentUserInactive]: (state, action) => {
            return {
                ...state,
                user: { name: '', email: '' },
                token: '',
                isLoggedIn: false,
                loading: false,
            }
        },
    }
});

export default userSlice.reducer

export const { setUser } = userSlice.actions