import UserList from "./UserList";
import './App.css';
import { AppBar, Toolbar, Container, Typography } from "@mui/material";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Find users
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="container">
        <UserList />
      </Container>
    </>
  );
}

export default App;
