import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import DialogComponent from '../dialog/DialogComponent';
// import { openDialog } from '../dialog/dialogSlice';
import { fetchDeleteTask } from '../../api/taskAPI';

const DeleteTask = ({ id }) => {
  // const _isOpen = useSelector((state) => state.dialog.isOpen);
  const [open, setOpen] = React.useState(false);
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === id));
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    setOpen(!open);
    if (id && open) {
      dispatch(fetchDeleteTask(id));
    }
  };

  return (
    <Stack spacing={1}>
      <IconButton
        aria-label='deleteTask'
        style={{
          width: 40,
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 13,
          marginRight: 10,
        }}
        onClick={() => setOpen(true)}
      >
        <DeleteForeverIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{task.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{task.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default DeleteTask;
