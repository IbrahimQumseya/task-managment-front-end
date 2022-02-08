import { IconButton, Stack } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../api/newAPI";
const DeleteTask = ({ id }) => {
  const handleDelete = (e) => {
    if (id) {
      axios.delete(`/tasks/${id}`);
      //   console.log(id);
    }
  };

  return (
    <Stack spacing={1} style={{}}>
      <IconButton aria-label="deleteTask" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default DeleteTask;
