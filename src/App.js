import { Box, createTheme, ThemeProvider, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { ModeContext } from "./context/ModeContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AdminPage from "./components/AdminPage/AdminPage";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  })

  const { authState } = useContext(AuthContext);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Router>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Sidebar/>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/admin" element={<AdminPage />} />
              </Routes>
            </Stack>
          </Router>
        </Box>
      </ThemeProvider>
    </ModeContext.Provider>
  );
}

export default App;
