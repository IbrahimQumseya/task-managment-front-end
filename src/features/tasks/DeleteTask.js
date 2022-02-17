import { IconButton, Stack } from '@mui/material';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import DialogComponent from '../dialog/DialogComponent';
import { openDialog, setIsOpen } from '../dialog/dialogSlice';

<<<<<<< HEAD
const DeleteTask = ({ id }) => {
  // const _isOpen = useSelector((state) => state.dialog.isOpen);
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === id));
=======
const DeleteTask = ({ id, title, description }) => {
  const [open, setOpen] = React.useState(false);

>>>>>>> cypress-end-2-end-home-page
  const dispatch = useDispatch();

  const dialogObj = {
    title: 'Delete Task',
    content: `"${task.description}"`,
    description: `Are you sure you want to delete this task "${task.title}"`,
  };

  if (dialogObj) {
  }

  return (
    <Stack spacing={1}>
      <IconButton
        aria-label='deleteTask'
        style={{
          width: 40,
        }}
        onClick={() => dispatch(openDialog(dialogObj))}
      >
        <DeleteForeverIcon />
      </IconButton>
      <DialogComponent taskId={task.id} />
    </Stack>
  );
};

export default DeleteTask;
