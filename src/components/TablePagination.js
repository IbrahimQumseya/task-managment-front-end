import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useSelector } from 'react-redux';
import { selectTasks } from '../features/tasks/tasksSlice';

export default function TablePaginationDemo() {
  const tasks = useSelector(selectTasks);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    for (let index = 0; index < tasks.tasks.length; index++) {
      const element = tasks.tasks[index];
      console.log(element);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component='div'
      count={tasks.tasks.length + 100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
