// import { createStore } from 'redux';
import { configureStore, createReducer } from '@reduxjs/toolkit'
import * as actions from './usersActions'
import * as registerActions from './authActions'
import userReducer from './authStore'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = { users: [], loading: false, selected: [] }

const users = createReducer(initialState, {
    [actions.fetchStart]: (state, action) => {
        return {
            ...state,
            loading: true,
            selected: []
        }
    },
    [actions.fetchSuccess]: (state, action) => {
        return {
            ...state,
            loading: false,
            users: [...state.users, ...action.payload.data],
        }
    },
    [actions.fetchFailure]: (state, action) => {
        return {
            ...state,
            loading: false,
        }
    },
    [actions.selectUsers]: (state, action) => {
        return {
            ...state,
            selected: state.selected.concat(action.payload)
        }
    },
    [actions.unselectUsers]: (state, action) => {
        state.selected.splice(action.payload, 1)
    },
    [actions.fetchPatchSuccess]: (state, action) => {
        return {
            ...state,
            loading: false,
            users: action.payload.data,
        }
    },
    [actions.deleteFetchSuccess]: (state, action) => {
        const newUsers = state.users.filter(contact => contact.id != action.payload)
        return {
            ...state,
            loading: false,
            users: newUsers
        }
    },
    [actions.unselectAll]: (state, action) => {
        return {
            ...state,
            selected: []
        }
    },
    [registerActions.logoutFetchSuccess]: (state, action) => {
        return {
            ...state,
            users: [],
            selected: []
        }
    },
    [actions.currentUserInactive]: (state, action) => {
        return {
            ...state,
            users: [],
            selected: []
        }
    },
})

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ['token'],
}

const store = configureStore({
    reducer: {
        users: users,
        userReducer: persistReducer(authPersistConfig, userReducer)
    },
    devTools: process.env.NODE_ENV === "development",
})

export const persistor = persistStore(store)

export default store;

// const reducer = (state = initialState, action) => {
//     console.log(action)
//     switch (action.type) {
//         case 'form/addContact':
//             return {
//                 ...state,
//                 contacts: [...state.contacts, action.payload]
//             };

//         case 'form/deleteContact':
//             const contactsList = state.contacts.filter(contact => contact.name !== action.payload.target.id);
//             return {
//                 ...state,
//                 contacts: contactsList
//             };
        
//         case 'filter/changeFilter':
//             return {
//                 ...state,
//                 filter: action.payload.target.value
//             };
        
//         case 'page/pageLoaded':
//             return {
//                 ...state,
//                 contacts: action.payload
//             }
        
//         default:
//             return state;
//     }
// };

// const store = createStore(reducer, composeWithDevTools());