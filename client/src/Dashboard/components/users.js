import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Users() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const handleDelete = (_id) => {
    axios
      .delete(`/user/${_id}`)
      .then(setData((data) => data.filter((datum) => datum._id !== _id)))
      .catch(console.log("not deleted"));
  };
  const [searchTerm, setSearchTerm] = useState("");
  useState(() => {
    axios
      .get("http://localhost:5000/user/")
      .then((data) => setData(data.data.user));
  }, []);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              User Details
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              type="input"
              marginRight="10px"
            >
              <SearchIcon />

              <InputBase
                placeholder="Search by First Name"
                inputProps={{ "aria-label": "search" }}
              />
            </Button>
            <Typography>
              <Button
                variant="outlined"
                color="inherit"
                type="link"
                href="./createuser"
              >
                Create User
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>First Name</strong>
            </TableCell>
            <TableCell>
              <strong>Full Name</strong>
            </TableCell>
            <TableCell>
              <strong>Role</strong>
            </TableCell>
            <TableCell>
              <strong>Work Place</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell colspan="2">
              <strong>Action</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter((datum) => {
              if (searchTerm == "") {
                return datum;
              } else if (
                datum.firstName.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return datum;
              }
            })
            .map((datum) => (
              <TableRow key={datum._id}>
                <TableCell>{datum.firstName}</TableCell>
                <TableCell>{datum.fullName}</TableCell>
                <TableCell>{datum.role}</TableCell>
                <TableCell>{datum.workPlace}</TableCell>
                <TableCell>{datum.email}</TableCell>

                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="inherit"
                    type="link"
                    href={`/dashboard/profile/${datum._id}`}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(datum._id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more users
        </Link>
      </div>
    </React.Fragment>
  );
}
