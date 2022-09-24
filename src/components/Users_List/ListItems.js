import { connect } from 'react-redux'
import * as actions from '../../redux/usersActions'
import { useState, useEffect } from 'react';

import { format, startOfYesterday } from 'date-fns'

import './Users.scss'

function ListItems({ arr, selected, selectUsers, unselectUsers, blockUsers, unblockUsers, deleteUsers, unselectAll }) {

    const handleCheckAll = (event) => {
        const arrToSelect =  []
        document.querySelectorAll('.form-check-input').forEach(e => {
            if (event.target.checked === true) {
                e.checked = true
                arrToSelect.push(e.parentElement.parentElement.id)
            } else {
                e.checked = false
            }
        })
        event.target.checked === false ? unselectAll() : selectUsers(arrToSelect)
    }

    const handleSelection = async (e) => {
        if (selected.includes(e.target.parentElement.parentElement.id)) {
            unselectUsers(selected.indexOf(e.target.parentElement.parentElement.id))
        } else {
            selectUsers(e.target.parentElement.parentElement.id)
        }
    }

    const handleBlock = (e, arr) => {
        const obj = {id: arr }
        blockUsers(obj)
        document.querySelector('.form-check-all').checked = false
        document.querySelectorAll('.form-check-input').forEach(e => {
            e.checked = false
        })
    }

    const handleUnblock = (e, arr) => {
        const obj = {id: arr }
        unblockUsers(obj)
        document.querySelector('.form-check-all').checked = false
        document.querySelectorAll('.form-check-input').forEach(e => {
            e.checked = false
        })
    }

    const handleDelete = (e, arr) => {
        const obj = {id: arr }
        deleteUsers(obj)
        document.querySelector('.form-check-all').checked = false
        document.querySelectorAll('.form-check-input').forEach(e => {
            e.checked = false
        })
    }
    
    const listMarkup = arr.map((val, index) => {
        const dateReg = Date.parse(val.timeRegistered)
        const timeReg = format(dateReg, 'dd/MM/yyyy hh:mm')

        const dateLog = Date.parse(val.timeLogged)
        const timeLog = format(dateLog, 'dd/MM/yyyy hh:mm')
        
        return ( 
            <tr key={val._id} id={val._id}>
                <th scope="row">{ val._id }</th>
                <td>{ val.name }</td>
                <td>{ val.email }</td>
                <td>{ timeReg }</td>
                <td>{ timeLog }</td>
                <td>{val.active.toString()}</td>
                <td className='check'>
                    <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={handleSelection} />
                </td>
            </tr>
        )
    })     
    return (
        <div>
            <div className="toolbar">
                <button type="button" className="btn btn-warning" onClick={(e) => { handleBlock(e, selected) }}>
                    Block selected users
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                    </svg>
                </button>
                <button type="button" className="btn btn-success" onClick={(e) => { handleUnblock(e, selected) }}>
                    Unblock selected users
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-unlock" viewBox="0 0 16 16">
                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
                    </svg>
                </button>
                <button type="button" className="btn btn-danger" onClick={(e) => { handleDelete(e, selected) }}>
                    Delete selected users
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            
        </div>
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">registered</th>
                    <th scope="col">logged in</th>
                    <th scope="col">active</th>
                    <th scope="col">
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                check all
                            </label>
                            <input className="form-check-all" type="checkbox" value="" id="flexCheckDefault" onChange={(event) => { handleCheckAll(event) } }/>
                        </div>
                    </th>
                </tr>
            </thead>
            
            <tbody>
                { listMarkup }
            </tbody>
        </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        arr: state.users.users,
        selected: state.users.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteUsers: (id) => dispatch(actions.deleteUsers(id)),
        selectUsers: (id) => dispatch(actions.selectUsers(id)),
        unselectUsers: (index) => dispatch(actions.unselectUsers(index)),
        blockUsers: (obj) => dispatch(actions.blockUsers(obj)),
        unblockUsers: (obj) => dispatch(actions.unblockUsers(obj)),
        deleteUsers: (obj) => dispatch(actions.deleteUsers(obj)),
        unselectAll: () => dispatch(actions.unselectAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);