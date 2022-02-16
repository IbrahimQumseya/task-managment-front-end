import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from './dialogSlice';
import { logout } from '../user/userSlice';
import { fetchDeleteTask } from '../../api/taskAPI';

const DialogComponent = ({ taskId }) => {
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  const { isOpen, title, content, description } = dialog;

  const handleYesButton = (e) => {
    dispatch(setIsOpen(false));
    dispatch(fetchDeleteTask(taskId));
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => dispatch(setIsOpen(false))}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(setIsOpen(false))}>No</Button>
          <Button onClick={handleYesButton} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogComponent;
