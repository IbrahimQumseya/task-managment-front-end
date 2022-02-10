import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  return (
    <Box
      sx={{ display: 'flex' }}
      style={{
        flex: 1,
        flexDirection: 'row-reverse',
        marginRight: 10,
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
