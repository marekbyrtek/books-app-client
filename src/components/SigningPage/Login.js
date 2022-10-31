import React, { useRef, useState, useContext } from 'react';
import { FormControl, InputLabel, Input, Button, styled, Box, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { ServerContext } from '../../context/ServerContext';
import { FormattedMessage } from 'react-intl';
import localStorageKeys from "../../config/localStorageKeys";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const StyledPaper = styled(Paper)({
  padding: "30px",
  width: "100%",
  maxWidth: "400px"
})

const StyledFormControl = styled(FormControl)({
  margin: "15px 0"
})

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const { serverURL } = useContext(ServerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    setLoading(true);
    axios.post(`${serverURL}/api/users/login`, data)
      .then((resp) => {
        localStorage.setItem(localStorageKeys.TOKEN, resp.data.token);
        setAuthState({
          id: resp.data.user.idusers,
          email: resp.data.user.email,
          isAdmin: resp.data.user.admin ? true : false,
          status: true
        });
        navigate("/");
      })
      .catch(err => {
        setError(err.response.data.message);
      })
    setLoading(false);
  }

  return (
    <StyledBox flex={3}>
      <StyledPaper elevation={4} sx={{ marginTop: "100px" }}>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} className="sign-form">
          <StyledFormControl fullWidth variant='standard'>
            <InputLabel htmlFor='email'>email</InputLabel>
            <Input id='email' type='email' required inputRef={emailRef} />
          </StyledFormControl>
          <StyledFormControl fullWidth variant='standard'>
            <InputLabel htmlFor='password'><FormattedMessage id="signing-page.login1" /></InputLabel>
            <Input id='password' type='password' required inputRef={passwordRef} />
          </StyledFormControl>
          <Button fullWidth type='submit' variant="contained" disabled={loading} sx={{ marginTop: "15px" }}><FormattedMessage id="signing-page.login2" /></Button>
        </form>
      </StyledPaper>
    </StyledBox>
  )
}

export default Login;
