import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotLogedIn from './NotLogedIn';
import LogedIn from './LogedIn';

const User = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    setAuthState({
      id: 0,
      email: "",
      isAdmin: false,
      status: false
    })
    navigate("/");
    console.log("first");
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
