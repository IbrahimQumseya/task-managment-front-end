import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCreateTask } from '../../api/taskAPI';
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
        {t('CreateTask')}
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
          {t('AddTask')}
        </Button>
      </Box>
    </Box>
  );
}

export default AddATask;
