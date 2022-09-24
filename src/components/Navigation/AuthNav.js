import * as authActions from '../../redux/authActions'

import Loader from 'react-loader-spinner';

import { connect } from 'react-redux'

import { useNavigate } from 'react-router-dom'

function AuthNav({ userName, loading, onLogout }) {

  const navigate = useNavigate()
    
    const handleLogOut = () => {
      onLogout()
      navigate("/")
    }

    return (
        <>
        {loading &&
        <div className="register-loader_backdrop">
            <Loader
                className="register-loader"
                type="Puff"
                color="#00BFFF"
            />
          </div>}
        <div className="auth_content">
            <p className="welcome-text">Welcome, <strong>{ userName }</strong>!</p>
            <button type="button" className="btn btn-primary hBack log-out_button" onClick={handleLogOut}>Log Out</button>
        </div>
        </>
    )
}

const mapStateToProps = state => {
  return {
    loading: state.userReducer.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: (config) => dispatch(authActions.fetchOnUserLogout(config))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthNav)