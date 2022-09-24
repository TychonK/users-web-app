import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PublicRoute({children, restricted = false}) {
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn)
    const shouldRedirect = isLoggedIn && restricted;
    return (
            shouldRedirect ? <Navigate to="/" /> : children
    )
}