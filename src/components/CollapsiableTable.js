import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useToken from "./useToken";
const axios = require("axios");

async function getTasks(token, setData) {
  try {
    const instance = axios.create({
      baseURL: "https://some-domain.com/api/",
      timeout: 1000,
      headers: { Authorization: "Bearer " + token },
    });
    const response = await instance.get("http://localhost:3000/tasks");
    setData(response.data);
    // response.data.map((value) => {
    //   return setData([value]);
    // });
  } catch (error) {
    console.error(error);
  }
}
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
  console.log(row);
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="center">{row.description}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
      </TableRow>
      <TableRow style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              History
            </Typography>
            <Table size="medium" arial-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Details</TableCell>
                  <TableCell>Task Activated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {row.taskMetadata.details}
                  </TableCell>
                  <TableCell>
                    {row.taskMetadata.isDeactivated.toString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [
//   //   createData(data[0].title, "Description", "true", {
//   //     isDeactivated: "true",
//   //     details: "helllo",
//   //   }),
//   createData("title", "Description", "true", {
//     isDeactivated: "true",
//     details: "helllo",
//   }),
//   createData("Ice cream sandwich", "Description1", "true", {
//     isDeactivated: "true",
//     details: "helllo",
//   }),
//   createData("Eclair", "Description2", "true", {
//     isDeactivated: "true",
//     details: "helllo",
//   }),
//   createData("Cupcake", "Description3", "true", {
//     isDeactivated: "true",
//     details: "helllo",
//   }),
//   createData("Gingerbread", "Description4", "true", {
//     isDeactivated: "true",
//     details: "helllo",
//   }),
// ];
function CollapsibleTable() {
  const { token } = useToken();
  const [data, setData] = useState([]);
  useEffect(() => {
    getTasks(token, setData);
  }, [token]);
  //   data.map((value) => {
  //   console.log(data.map);
  //   });
  //   const { id, title, description } = data;
  //   console.log(title);
  //   data.map((value, index) => {
  //     console.log(value);
  //   });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>title</TableCell>
            <TableCell align="center">description</TableCell>
            <TableCell>status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((value, index) => {
            createData(value.title, value.description, value.status, {
              isDeactivated: value.taskMetadata.isDeactivated,
              details: value.taskMetadata.details,
            });
            return <RowComponent key={index} row={value} />;
          })}
          {/* {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// RowComponent.propTypes = {
//   row: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     taskMetadata: PropTypes.objectOf(
//       PropTypes.shape({
//         id: PropTypes.isRequired,
//         details: PropTypes.string.isRequired,
//         isDeactivated: PropTypes.bool.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

export default CollapsibleTable;
