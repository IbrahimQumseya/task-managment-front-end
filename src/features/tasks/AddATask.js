import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateTask } from "../../api/taskAPI";
import { addTaskStatePost, selectTasks } from "./tasksSlice";

function AddATask() {
  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);
  const handleSubmit = (e) => {
    // e.preventDefault();
    const data = new FormData(e.currentTarget);
    const allData = {
      title: data.get("title"),
      description: data.get("description"),
      status: "OPEN",
      token: sessionStorage.getItem("user"),
    };

    if (allData.title && allData.description) {
      // const token = sessionStorage.getItem("user");
      dispatch(fetchCreateTask(allData));
      // console.log(dispatch(addTaskStatePost(allData)));
    }
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
      </Avatar> */}
      <Typography component="h1" variant="h5">
        Create A task
      </Typography>
      <Box sx={{ m1: 3 }} component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
        />
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Add a task
        </Button>
      </Box>
    </Box>
  );
}

export default AddATask;
