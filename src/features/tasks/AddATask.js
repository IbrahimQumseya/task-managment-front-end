import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
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
    <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, mb: 3, borderRadius: 3 }}>
      <Typography component='h2' variant='h5' sx={{ mb: 0.5 }}>
        Create a task
      </Typography>
      <Typography color='text.secondary' sx={{ mb: 3 }}>
        Adds a new row to the board and persists through the REST API in production mode.
      </Typography>
      <Box component='form' noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
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
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              required
              fullWidth
              id='description'
              label={t('Description')}
              name='description'
              value={description}
              autoComplete='description'
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' fullWidth sx={{ height: 56 }}>
              Add task
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default AddATask;
