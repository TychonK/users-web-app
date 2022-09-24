import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Swal from 'sweetalert2'

export default function PrivateRoute({children}) {
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn)
    if (!isLoggedIn) {
        Swal.fire('You are not logged in yet',
            `Please login or create an accound before accessing the users pannel.`,
            'question')
    }
    return (
            isLoggedIn ? children : <Navigate to="/register" />
    )
}