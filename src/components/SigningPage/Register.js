import React, { useRef, useState, useContext } from 'react';
import { FormControl, InputLabel, Input, Button, styled, Box, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerContext } from '../../context/ServerContext';
import { FormattedMessage } from 'react-intl';

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

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { serverURL } = useContext(ServerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfRef.current.value) {
      return setError("Passwords are different");
    }
    const data = {
      email: emailRef.current.value,
      name: nameRef.current.value,
      password: passwordRef.current.value
    };
    setLoading(true);
    axios.post(`${serverURL}/api/users/register`, data)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
    setLoading(false);
  };

  return (
    <StyledBox flex={3}>
      <StyledPaper elevation={4} sx={{ marginTop: "100px" }}>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} className="sign-form">
          <StyledFormControl fullWidth variant='standard'>
            <InputLabel htmlFor='name'><FormattedMessage id="signing-page.register1" /></InputLabel>
            <Input id='name' type='text' required inputRef={nameRef} />
          </StyledFormControl>
          <StyledFormControl fullWidth variant='standard'>
            <InputLabel htmlFor='email'>email</InputLabel>
            <Input id='email' type='email' required inputRef={emailRef} />
          </StyledFormControl>
          <StyledFormControl fullWidth variant='standard'>
            <InputLabel htmlFor='password'><FormattedMessage id="signing-page.login1" /></InputLabel>
            <Input id='password' type='password' required inputRef={passwordRef} />
          </StyledFormControl>
          <StyledFormControl fullWidth variant='standard'>
            <InputLabel htmlFor='passwordConf'><FormattedMessage id="signing-page.register2" /></InputLabel>
            <Input id='passwordConf' type='password' required inputRef={passwordConfRef} />
          </StyledFormControl>
          <Button fullWidth type='submit' variant="contained" disabled={loading} sx={{ marginTop: "15px" }}><FormattedMessage id="navbar.button4" /></Button>
        </form>
      </StyledPaper>
    </StyledBox>
  )
}

export default Register;
