import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

// const addContact = (value) => ({
//     type: 'form/addContact',
//     payload: value,
// })

// const deleteContact = (value) => ({
//     type: 'form/deleteContact',
//     payload: value,
// })
// const filter = (value) => ({
//     type: 'filter/changeFilter',
//     payload: value,
// })

// const pageLoaded = (value) => ({
//     type: 'page/pageLoaded',
//     payload: value,
// })

//export const addContact = createAction('form/addContact')
//export const pageLoaded = createAction('page/pageLoaded')
//export const deleteContact = createAction('form/deleteContact')

export const filter = createAction('filter/changeFilter')

export const fetchStart = createAction('users/FETCH_START')
export const fetchSuccess = createAction('users/FETCH_SUCCESS')
export const fetchFailure = createAction('users/FETCH_FAILURE')
export const deleteFetchSuccess = createAction('users/FETCH_DELETE_SUCCESS')

export const fetchOnPageLoad = args => dispatch => {
  dispatch(fetchStart());

  axios.get('/users')
    .then(r => r.data)
      .then(data => {
          dispatch(fetchSuccess(data))
      })
      .catch(err => {
          console.log("Error fetching users:", err)
          dispatch(fetchFailure(err))
      });
};

export const fetchPatchSuccess = createAction('users/REFRESH')
export const currentUserInactive = createAction('users/CURRENT_INACTIVE')

export const fetchOnPatchSuccess = args => dispatch => {
  dispatch(fetchStart());

  axios.get('/users')
    .then(r => r.data)
      .then(data => {
          dispatch(fetchPatchSuccess(data))
      })
      .catch(err => {
          console.log("Error fetching contacts:", err)
          if (err.response.status === 401) {
              dispatch(currentUserInactive())
          }
            dispatch(fetchFailure(err))
      });
};

export const selectUsers = createAction('users/SELECT_ONE')
export const unselectUsers = createAction('users/UNSELECT_ONE')

export const fetchPatchActiveSuccess = createAction('users/PATCH_USERS_SECCESS')
export const fetchBlockFail = createAction('users/BLOCK_USERS_FAIL')

export const blockUsers = args => dispatch => {
    dispatch(fetchStart())

    axios.patch('/users/block', args)
    .then(r => r.data)
    .then(data => {
        dispatch(fetchPatchActiveSuccess())
        dispatch(fetchOnPatchSuccess())
        })
      .catch(err => {
          console.log("Error patching users:", err)
          dispatch(fetchBlockFail())
      });
}

export const unblockUsers = args => dispatch => {
    dispatch(fetchStart())

    axios.patch('/users/unblock', args)
    .then(r => r.data)
    .then(data => {
        dispatch(fetchPatchActiveSuccess())
        dispatch(fetchOnPatchSuccess())
        })
      .catch(err => {
          console.log("Error patching users:", err)
          dispatch(fetchFailure())
      });
}

export const fetchDeleteSuccess = createAction('users/DELETE_USERS_SECCESS')

export const deleteUsers = args => dispatch => {
    dispatch(fetchStart())

    axios.put('/users/delete', args)
    .then(r => r.data)
    .then(data => {
        dispatch(fetchDeleteSuccess())
        dispatch(fetchUsersDeleteSuccess())
        })
      .catch(err => {
          console.log("Error patching users:", err)
          dispatch(fetchFailure())
      });
}

export const fetchUsersDeleteSuccess = args => dispatch => {
  dispatch(fetchStart());

  axios.get('/users')
    .then(r => r.data)
      .then(data => {
          dispatch(fetchPatchSuccess(data))
      })
      .catch(err => {
          console.log("Error fetching contacts:", err)
          if (err.response.status === 401) {
              dispatch(currentUserInactive())
          }
            dispatch(fetchFailure(err))
      });
};



export const unselectAll = createAction('users/UNSELECT_ALL')