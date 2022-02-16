import { IconButton, Stack } from '@mui/material';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import DialogComponent from '../dialog/DialogComponent';
import { setDescription, setIsOpen, setTitle } from '../dialog/dialogSlice';

const DeleteTask = ({ id }) => {
  // const _isOpen = useSelector((state) => state.dialog.isOpen);
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === id));
  const dispatch = useDispatch();
  const description = 'Are you sure you want to delete this task?';
  const title = 'Deleting Task';
  if (title && description) {
    dispatch(setTitle(title));
    dispatch(setDescription(description));
  }
  // dispatch(setContent();
  // if (!isOpen) {
  //   dispatch(setTitle(''));
  //   dispatch(setDescription(''));
  // }

  // const handleDelete = (e) => {
  //   setOpen(!open);
  //   if (id && open) {
  //     dispatch(fetchDeleteTask(id));
  //   }
  // };

  return (
    <Stack spacing={1}>
      <IconButton
        aria-label='deleteTask'
        style={{
          width: 40,
        }}
        onClick={() => dispatch(setIsOpen(true))}
      >
        <DeleteForeverIcon />
      </IconButton>
      <DialogComponent taskId={task.id} />
      {/* <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog> */}
    </Stack>
  );
};

export default DeleteTask;
