import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.black, 0.05),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.15),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  
    searchField: {
      margin: theme.spacing(1, 1, 1, 1),
      display: "flex",
      alignItems: "center",
    },
    selectField: {
      display: 'flex',
  
    },
    createButton: {
      color: '#002884',
      textAlign: 'right',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      backgroundColor:theme.palette.common.white,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "40ch",
        },
      },
    },
  }));

  
export default function Searchbox({searchBy,setSearchBy,setSearch,options}) {
    
    const classes = useStyles()

    return (
        <div className={classes.searchField}>
        <div className="select">
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Search By
            </InputLabel>

            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className={classes.selectEmpty}
            >
              {options.map(data => <MenuItem value={data.value}>{data.label}</MenuItem>)}
              <MenuItem default value={"All"}>
                All
              </MenuItem>
              <MenuItem value={"Course_Name"}>Course Name</MenuItem>
              <MenuItem value={"Course_ID"}>Course ID</MenuItem>

            </Select>
          </FormControl>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            variant="outlined"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(e) => setSearch(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
        </div>

      </div>
        )
}
