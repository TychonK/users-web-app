import { connect } from 'react-redux'

import HomeInitial from './HomeInitial'
import HomeLoggedin from './HomeLoggedin'

function HomePage({ isLoggedIn }) {
    return (
        <div className="home-wrapper">
            {isLoggedIn ? <HomeLoggedin /> : <HomeInitial />}
        </div>
    )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
  }
}

export default connect(mapStateToProps, null)(HomePage)