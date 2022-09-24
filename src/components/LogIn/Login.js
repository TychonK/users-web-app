import '../Register/Register.scss'

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';

import { connect, useDispatch, useSelector } from "react-redux";

import * as registerActions from '../../redux/authActions'

import Loader from 'react-loader-spinner';

function Login({loading, isLoggedIn, onSubmit}) {
    const [ mail, setMail ] = useState('')
    const [ password, setPassword ] = useState('')

    //const dispatch = useDispatch();

    const navigate = useNavigate();
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/")
      } else {
        return
      }
    }, [isLoggedIn])

    const handleGoBack = () => {
     navigate(-1)
    }

    const handleChange = (e) => {
        e.target.name === "mail" && setMail(e.target.value)
        e.target.name === "password" && setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userLoginObj = { email: mail, password: password }
        await onSubmit(userLoginObj)
        setMail('')
        setPassword('')
    }

    return (
        <>
          <button type="button" onClick={handleGoBack} className="btn btn-primary hBack">
              &larr; Go back 
            </button>
            {loading &&
                <div className="register-loader_backdrop">
                    <Loader
                        className="register-loader"
                        type="Puff"
                        color="#00BFFF"
                    />
                </div>}
          <form className="register-form" onChange={handleChange} onSubmit={handleSubmit}>
            <label className="register-label">
                <p className="label-txt">ENTER YOUR EMAIL</p>
                    <input required className="register-input" type="email" name="mail" value={ mail }/>
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
            <button type="submit" className="register-button">Log-in</button>
          </form>
        </>
    )
}

const mapStateToProps = state => {
  return {
    loading: state.userReducer.loading,
    isLoggedIn: state.userReducer.isLoggedIn,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (userLoginObj) => dispatch(registerActions.fetchOnUserLogin(userLoginObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)