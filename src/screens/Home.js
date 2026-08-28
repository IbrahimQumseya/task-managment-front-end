import React from 'react';
import CollapsibleTable from '../components/CollapsiableTable';
import { Box, Container, Typography } from '@mui/material';
import AddATask from '../features/tasks/AddATask';

function Home() {
  return (
    <Container maxWidth='lg' sx={{ py: { xs: 3, md: 5 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            display: 'inline-flex',
            px: 1.5,
            py: 0.75,
            mb: 2,
            borderRadius: 999,
            bgcolor: 'rgba(52, 211, 153, 0.12)',
            color: '#6ee7b7',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Protected route · Task workspace
        </Typography>
        <Typography component='h1' variant='h4' sx={{ mb: 1 }}>
          Team task board
        </Typography>
        <Typography color='text.secondary' sx={{ maxWidth: 720, lineHeight: 1.7 }}>
          Create tasks, review status, and expand rows for metadata history. Demo mode uses portfolio-safe fixture data.
        </Typography>
      </Box>

      <AddATask />
      <CollapsibleTable />
    </Container>
  );
}

export default Home;
