import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotLogedIn from './NotLogedIn';
import LogedIn from './LogedIn';
import localStorageKeys from "../../config/localStorageKeys";

const User = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem(localStorageKeys.TOKEN);
    setAuthState({
      id: 0,
      email: "",
      name: "",
      isAdmin: false,
      status: false
    })
    navigate("/");
  }

  if (authState.status) {
    return (
      <LogedIn handleLogout={handleLogout} />
    )
  } else {
      return (
        <NotLogedIn />
      )
  }
}

export default User;
