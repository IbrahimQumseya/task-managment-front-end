import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../api/newAPI";
import { useDispatch } from "react-redux";
import { fetchDeleteTask } from "../../api/taskAPI";

const DeleteTask = ({ id, title, description }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    setOpen(!open);
    if (id && open) {
      dispatch(fetchDeleteTask(id));
      //   console.log(id);
    }
  };
  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={1} style={{}}>
      <IconButton aria-label="deleteTask" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default DeleteTask;
