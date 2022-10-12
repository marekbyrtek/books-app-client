import { Box, createTheme, ThemeProvider, Stack } from "@mui/material";
import React, { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  })

  const { authState } = useContext(AuthContext);

  console.log(authState);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
