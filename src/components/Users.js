import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import ListItems from './Users_List/ListItems'
import Loader from "react-loader-spinner";

import { connect } from 'react-redux'
import * as actions from '../redux/usersActions'

function Users({ users, loading, onLoad }) {
    useEffect(() => {
        if (users.length === 0) {
            onLoad()
        } else {
            return
        }   
    }, [])

    const navigate = useNavigate();

    const handleGoBack = () => {
     navigate(-1)
    }
    
    return (
        <>
            <button type="button" onClick={handleGoBack} className="btn btn-primary hBack">
              &larr; Go back 
            </button>
          <div className="App">
            
                {loading && <Loader
                    className="loader"
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />}

                <ListItems arr={users} />
                
          </div>
        </>
    )
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loading: state.users.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(actions.fetchOnPageLoad())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)