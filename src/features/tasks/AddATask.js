import { Avatar, Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateTask } from '../../api/taskAPI';
import { addTaskStatePost, selectTasks } from './tasksSlice';
import { useTranslation } from 'react-i18next';

function AddATask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const allData = {
      title,
      description,
      status: 'OPEN',
      token: sessionStorage.getItem('user'),
    };

    if (allData.title && allData.description) {
      // const token = sessionStorage.getItem("user");
      dispatch(fetchCreateTask(allData));
      setDescription('');
      setTitle('');
    }
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
      </Avatar> */}
      <Typography component='h1' variant='h5'>
        Create A task
      </Typography>
      <Box sx={{ m1: 3 }} component='form' noValidate onSubmit={handleSubmit}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='title'
          label={t('Title')}
          name='title'
          value={title}
          autoComplete='title'
          onChange={handleTitleChange}
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='description'
          label={t('Description')}
          name='description'
          value={description}
          autoComplete='description'
          onChange={handleDescriptionChange}
        />
        <Button type='submit' variant='contained' sx={{ mt: 3 }}>
          Add a task
        </Button>
      </Box>
    </Box>
  );
}

export default AddATask;
