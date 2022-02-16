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
import Spinner from './Spinner';

function createData(title, description, status, { details, isDeactivated }) {
  return {
    title,
    description,
    status,
    taskMetadata: {
      details,
      isDeactivated,
    },
  };
}
function RowComponent(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.title}
        </TableCell>
        <TableCell align='center'>{row.description}</TableCell>
        <TableCell align='center'>{row.status}</TableCell>
        <TableCell align='right'>
          <DeleteTask id={row.id} />
        </TableCell>
      </TableRow>
      {row.taskMetadata && (
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
                      {row.taskMetadata.details ? row.taskMetadata.details : null}
                    </TableCell>
                    <TableCell>
                      {row.taskMetadata.isDeactivated.toString() ? row.taskMetadata.isDeactivated.toString() : null}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableRow>
      )}
    </React.Fragment>
  );
}

function CollapsibleTable() {
  const userIsAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const token = sessionStorage.getItem('user');

  useEffect(() => {
    if (userIsAuthenticated) {
      dispatch(fetchGetAllTasks(token));
    }
    // getTasks(token, setData);
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
            {tasks.tasks.map((value, index) => {
              createData(value.title, value.description, value.status, {
                isDeactivated: value.taskMetadata?.isDeactivated,
                details: value.taskMetadata?.details,
              });
              return <RowComponent key={index} row={value} />;
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

// RowComponent.propTypes = {

export default CollapsibleTable;
