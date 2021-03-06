import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetAllTasks } from '../api/taskAPI';
import { selectTasks } from '../features/tasks/tasksSlice';
import DeleteTask from '../features/tasks/DeleteTask';
import { CircularProgress } from '@mui/material';
import CircularIndeterminate from './Spinner';
import Spinner from './Spinner';
import { useTranslation } from 'react-i18next';
import { TablePagination } from '@mui/material';
import { selectMetadata } from '../features/taskmetadata/metadataSlice';
import { fetchGetMetadataById } from '../api/metadataAPI';

function RowComponent(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { row } = props;
  const metadata = useSelector(selectMetadata);
  const [open, setOpen] = useState(false);

  const handleGetMetadata = (id) => {
    if (id && !open) {
      dispatch(fetchGetMetadataById(id));
    }
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => handleGetMetadata(row.id)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.title}
        </TableCell>
        <TableCell align='center'>{row.description}</TableCell>
        <TableCell align='center'>{row.status}</TableCell>
        <DeleteTask id={row.id} title='Deleting Task' description='Are you sure you want to delete this task?' />
      </TableRow>
      {/* {metadata && ( */}
        <TableRow style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              <Table size='medium' arial-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Details</TableCell>
                    <TableCell>Task Activated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      {metadata.details ? metadata.details : null}
                    </TableCell>
                    <TableCell>{metadata.isDeactivated ? 'Is Deactivated' : 'not Deactivated'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableRow>
      {/* )} */}
    </React.Fragment>
  );
}

function CollapsibleTable() {
  const tasks = useSelector(selectTasks);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const userIsAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('user');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (userIsAuthenticated) {
      dispatch(fetchGetAllTasks(token));
    }
  }, [dispatch, userIsAuthenticated, token]);

  return (
    <TableContainer component={Paper}>
      {tasks.isPending ? (
        <Spinner />
      ) : (
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>title</TableCell>
              <TableCell align='center'>description</TableCell>
              <TableCell>status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => {
              return <RowComponent key={index} row={value} />;
            })}
          </TableBody>
        </Table>
      )}
      <TablePagination
        component='div'
        rowsPerPageOptions={[5, 10, 20]}
        count={tasks.tasks.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default CollapsibleTable;
