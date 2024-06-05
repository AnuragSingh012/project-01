import React, { useEffect, useState } from "react";
import { fetchUsers } from "./api";
import {
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]); // State to store fetched users
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true); // Set loading to true before fetching
      const usersData = await fetchUsers(); // Fetch users from the API
      setUsers(usersData); // Set the fetched users to the state
      setLoading(false); // Set loading to false after fetching
    };
    getUsers(); // Call the fetch users
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <TextField
        className="search-bar"
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "10px",
              borderColor: "transparent",
            },
            backgroundColor: "#f1f4f5",
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#969aa2",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#969aa2",
          },
        }}
      />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} md={6} lg={4} key={user.id}>
              <List>
                <ListItem className="user-list-item">
                  <ListItemText
                    primary={user.name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Email: {user.email}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Username: {user.username}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Address: {user.address.street}, {user.address.city}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UserList;
