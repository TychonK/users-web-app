import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './Navigation.scss'

import AuthNav from './AuthNav'
import DefaultNav from './DefaultNav'

export default function AppBar() {
    
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const userName = useSelector(state => state.userReducer.user.name)

    return (
        <>
        <nav className="navigation-bar">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-link">Users</NavLink>
                {isLoggedIn ? <AuthNav userName={ userName } /> : <DefaultNav />}
        </nav>
        <hr />
        </>
    )
}