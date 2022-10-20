import { Box, createTheme, ThemeProvider, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { ModeContext } from "./context/ModeContext";
import { ServerContext } from "./context/ServerContext";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import Login from "./components/SigningPage/Login";
import Register from "./components/SigningPage/Register";
import AdminPage from "./components/AdminPage/AdminPage";
import Collections from "./components/Collections/Collections";
import UserCollections from "./components/Collections/UserCollections";
import Items from "./components/Items/Items";

function App() {
  const [mode, setMode] = useState("light");
  const [serverURL, setServerURL] = useState("https://books-app-server-mysql.herokuapp.com");
  // http://localhost:3001
  // https://books-app-server-mysql.herokuapp.com
  const { authState, setAuthState } = useContext(AuthContext);

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  })

  useEffect(() => {
    axios.get(`${serverURL}/api/auth`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    })
    .then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, isAdmin: false, status: false});
      } else {
        setAuthState({
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          isAdmin: response.data.user.isAdmin ? true : false,
          status: true
        });
      }
    })
    .catch((err) => {
      return err;
    })
  }, [])

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <ServerContext.Provider value={{ serverURL, setServerURL }}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box bgcolor={"background.default"} color={"text.primary"}>
            <Router>
              <Navbar />
              <Stack direction="row" justifyContent="space-between" sx={{ height: "calc(100vh - 70px)" }}>
                <Sidebar/>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/admin" element={<AdminPage />} />
                  <Route exact path="/collections" element={<Collections />} />
                  <Route exact path="/collections/:user" element={<UserCollections />} />
                  <Route exact path="/items/:collection" element={<Items />} />
                </Routes>
              </Stack>
            </Router>
          </Box>
        </ThemeProvider>
      </ServerContext.Provider>
    </ModeContext.Provider>
  );
}

export default App;
