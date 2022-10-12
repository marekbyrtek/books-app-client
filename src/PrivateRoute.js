import React, { useContext } from 'react'
import { Route, useNavigate } from "react-router-dom";
import AuthContext from './context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Route
            {...rest}
            render={props => {
                return authState.isAdmin ? <Component {...props} /> : navigate("/")
            }} />
    )
}

export default PrivateRoute;
