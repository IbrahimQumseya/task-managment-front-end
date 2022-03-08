import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import {
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Spinner from './Spinner';
import { selectTasks } from '../features/tasks/tasksSlice';
import { useTranslation } from 'react-i18next';
import { selectMetadata } from '../features/taskmetadata/metadataSlice';
import { fetchGetMetadataById } from '../api/metadataAPI';
import DeleteTask from '../features/tasks/DeleteTask';

const FRUITS = ['🍏 Apple', '🍌 Banana', '🍍 Pineapple', '🥥 Coconut', '🍉 Watermelon'];

function renderItem(item, value, dispatch, t, metadata, open, setOpen) {
  const handleGetMetadata = (id) => {
    if (id && !open) {
      dispatch(fetchGetMetadataById(id));
    }
    setOpen(!open);
  };
  return (
    <TableBody>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/* <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => handleGetMetadata(item.id)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell component='th' scope='row'>
          {item.title}
        </TableCell>
        <TableCell align='center'>{item.description}</TableCell>
        <TableCell align='center'>{item.status}</TableCell>
        <TableCell align='right'>
          <DeleteTask id={item.id} />
        </TableCell>
      </TableRow>
      {/* <TableRow style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
      </TableRow> */}
    </TableBody>
  );
}

function RowComponent(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { row } = props;
  const metadata = useSelector(selectMetadata);
  const [open, setOpen] = React.useState(false);

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

export default function TransitionGroupExample() {
  const getTask = useSelector((state) => state.tasks.tasks);
  const [fruitsInBasket, setFruitsInBasket] = React.useState(FRUITS.slice(0, 3));

  const metadata = useSelector(selectMetadata);
  const [open, setOpen] = React.useState(false);
  const tasks = useSelector(selectTasks);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const userIsAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('user');
  const { t } = useTranslation();

  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
    if (nextHiddenItem) {
      setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
    }
  };

  const handleRemoveFruit = (item) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  const addFruitButton = (
    <Button variant='contained' disabled={fruitsInBasket.length >= FRUITS.length} onClick={handleAddFruit}>
      Add fruit to basket
    </Button>
  );

  return (
    <div>
      {addFruitButton}
      <Box sx={{ mt: 1 }}>
        <TableContainer component={Paper}>
          {tasks.isPending ? (
            <Spinner />
          ) : (
            <Table aria-label='collapsible table'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>{t('Title')}</TableCell>
                  <TableCell align='center'>{t('Description')}</TableCell>
                  <TableCell>{t('Status')}</TableCell>
                </TableRow>
              </TableHead>

              {tasks.tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => {
                return <Collapse key={index}>{renderItem(value, dispatch, t, metadata, open, setOpen)}</Collapse>;
              })}
            </Table>
          )}
        </TableContainer>
      </Box>
    </div>
  );
}
