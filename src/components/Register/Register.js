import './Register.scss'

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';

import { connect, useDispatch, useSelector } from "react-redux";

import * as authActions from '../../redux/authActions'

import Loader from 'react-loader-spinner';

import { Link } from 'react-router-dom'

function Register({loading, isLoggedIn, onSubmit}) {
    const [ name, setName ] = useState('')
    const [ mail, setMail ] = useState('')
    const [ password, setPassword ] = useState('')

    //const { location } = useSelector(state=>state)
    //const dispatch = useDispatch();

    const navigate = useNavigate();
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/contacts")
      } else {
        return
      }
    }, [isLoggedIn])

    const handleGoBack = () => {
     navigate(-1)
    }

    const handleChange = (e) => {
        e.target.name === "name" && setName(e.target.value)
        e.target.name === "mail" && setMail(e.target.value)
        e.target.name === "password" && setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userObj = { name: name, email: mail, password: password }
        await onSubmit(userObj)
        setName('')
        setMail('')
        setPassword('')
    }

    return (
        <>
          <button type="button" onClick={handleGoBack} className="btn btn-primary hBack">
              &larr; Go back 
            </button> {loading &&
                <div className="register-loader_backdrop">
                    <Loader
                        className="register-loader"
                        type="Puff"
                        color="#00BFFF"
                    />
                </div>}
          <form className="register-form" onSubmit={handleSubmit} onChange={handleChange}>
            <label className="register-label">
                <p className="label-txt">ENTER YOUR EMAIL</p>
                    <input required className="register-input" name="mail" value={ mail } type="email"/>
                <div className="line-box">
                <div className="line"></div>
                </div>
            </label>
            <label className="register-label">
                <p className="label-txt">ENTER YOUR NAME</p>
                    <input required type="text" className="register-input" name="name" value={ name }/>
                <div className="line-box">
                <div className="line"></div>
                </div>
            </label>
            <label className="register-label">
                <p className="label-txt">ENTER YOUR PASSWORD</p>
                    <input required type="password" className="register-input" name="password" value={ password }/>
                <div className="line-box">
                <div className="line"></div>
                </div>
            </label>
          <button type="submit" className="register-button">Register</button>
          <Link to="/login" className="register-button login-link"> Log-in </Link>
          </form>
        </>
    )
}

const mapStateToProps = state => {
  return {
    loading: state.userReducer.loading,
    isLoggedIn: state.userReducer.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (userObj) => dispatch(authActions.fetchOnUserRegister(userObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)