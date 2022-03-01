import React, { useEffect, useState } from 'react';
import {
  Box,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  Fade,
  Paper
} from '@mui/material/';
import { TransitionGroup } from 'react-transition-group';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetAllTasks } from '../api/taskAPI';
import { selectTasks } from '../features/tasks/tasksSlice';
import DeleteTask from '../features/tasks/DeleteTask';
import Spinner from './Spinner';
import { useTranslation } from 'react-i18next';
import { TablePagination } from '@mui/material';
import { selectMetadata } from '../features/taskmetadata/metadataSlice';
import { fetchGetMetadataById } from '../api/metadataAPI';
import TransitionTable from './TransitionTable';

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
        <TableCell align='right'>
          <DeleteTask id={row.id} />
        </TableCell>
      </TableRow>
      {/* {metadata && ( */}
      <TableRow style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant='h6' gutterBottom component='div'>
              {t('History')}
            </Typography>
            <Table size='medium' arial-label='purchases'>
              <TableHead>
                <TableRow>
                  <TableCell>{t('Details')}</TableCell>
                  <TableCell>{t('TaskActivated')}</TableCell>
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
  const { t } = useTranslation();

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
    <TransitionTable/>
    // <TableContainer component={Paper}>
    //   {tasks.isPending ? (
    //     <Spinner />
    //   ) : (
    //     <TransitionGroup >
    //       <Table aria-label='collapsible table'>
    //         <TableHead>
    //           <TableRow>
    //             <TableCell />
    //             <TableCell>{t('Title')}</TableCell>
    //             <TableCell align='center'>{t('Description')}</TableCell>
    //             <TableCell>{t('Status')}</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {tasks.tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => {
    //             return (
    //               <Fade key={index}>
    //                 <RowComponent key={index} row={value} />
    //               </Fade>
    //             );
    //           })}
    //         </TableBody>
    //       </Table>
    //     </TransitionGroup>
    //   )}
    //   <TablePagination
    //     component='div'
    //     rowsPerPageOptions={[5, 10, 20]}
    //     count={tasks.tasks.length}
    //     page={page}
    //     onPageChange={handleChangePage}
    //     rowsPerPage={rowsPerPage}
    //     onRowsPerPageChange={handleChangeRowsPerPage}
    //   />
    // </TableContainer>
  );
}

export default CollapsibleTable;
