import { NavLink } from "react-router-dom";

export default function DefaultNav() {
    return (
        <>
            <NavLink to="/register" className="nav-link">Register</NavLink>
            <NavLink to="/login" className="nav-link">Log In</NavLink>
        </>
    )
}