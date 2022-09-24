import { connect } from 'react-redux'
import { Link } from "react-router-dom"

function HomeLoggedin({ userName }) {
    return (
        <>
            <h3>Hello, dear {userName}! Welcome to your personal admin pannel.</h3>
            <p>Here you can block, unblock, and delete as many users as you wish: <Link to="/users">users</Link></p>
        </>
    )
}

const mapStateToProps = state => {
  return {
    userName: state.userReducer.user.name,
  }
}

export default connect(mapStateToProps, null)(HomeLoggedin)