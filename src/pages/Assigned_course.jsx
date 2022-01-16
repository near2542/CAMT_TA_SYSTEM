import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogContentText} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
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
import { title } from "../store/title";
import Data from "./components/tableHeader.json";
import axios from "../shared/axios";
// import
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
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export const AssignCouse = () => {
  const dispatch = useDispatch();
  const titleName = {
    title: "Assign Course",
  };
  dispatch(title(titleName));
  const classes = useStyles();
  const fetchCourses = async() => {
    const {data} = await axios.get('/assign_courses.php');
  }
  const state = useSelector((state) => state.auth);
  const options = ['ALL','Course_id','course_name','teacherß']
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false)
  const [currentModal,setCurrentModal] = useState({});
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [SearchBy, setSearchBy] = useState("All");
  const [tableHeader, SetTableHeader] = useState([]);
  useEffect(() => {
    if (state.role == 2) {
      SetTableHeader(Data.assigned_course.StudentTA);
    } else if (state.role == 3) {
      SetTableHeader(Data.assigned_course.ExternalTA);
    }
  }, []);
  return (
    <>
      <div>
        <CssBaseline />
        <div className={classes.searchField}>
          {/* <div class="select">
            <FormControl required className={classes.formControl}>
              <InputLabel id="demo-simple-select-required-label">
                Search By
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={SearchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className={classes.selectEmpty}
              >
                <MenuItem default value={"All"}>
                  All
                </MenuItem>
                <MenuItem value={"Course_Name"}>Course Name</MenuItem>
                <MenuItem value={"Course_ID"}>Course ID</MenuItem>
                <MenuItem value={"Teacher_Name"}>Teacher Name</MenuItem>
                <MenuItem value={"Year"}>Teacher Name</MenuItem>
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
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={SearchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className={classes.selectEmpty}
            >
              <MenuItem default value={"All"}>
                All
              </MenuItem>
              <MenuItem value={"Course_Name"}>Course Name</MenuItem>
              <MenuItem value={"Course_ID"}>Course ID</MenuItem>
              <MenuItem value={"Teacher_Name"}>Teacher Name</MenuItem>
              <MenuItem value={"Year"}>Teacher Name</MenuItem>
            </Select>
          </FormControl> */}
          <Button variant="contained" color="primary" onClick={() => setCreateOpen(true)}>Create</Button>
        </div>

        <Divider />
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {tableHeader.map((Data) => (
                  <TableCell>{Data}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableRow>
                <TableCell component="th" scope="row">
                  {"test"}
                </TableCell>
                <TableCell align="right">{"test"}</TableCell>
                <TableCell align="right">{"test"}</TableCell>
                <TableCell align="right">{"test"}</TableCell>
                <TableCell align="right">{"test"}</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
        {createOpen && <CreateDialog setOpen={setCreateOpen} open={createOpen} refetch={fetchCourses} />}
        {editOpen && <EditDialog setOpen={setEditOpen} open={editOpen} data={currentModal} refetch={fetchCourses} />}
        {deleteOpen && <DeleteDialog setOpen={setDeleteOpen} open={deleteOpen} data={currentModal} refetch={fetchCourses} />}
      </div>
    </>
  );
};

const CreateDialog = ({ data, setOpen, open, refetch }) => {

  const [form, setForm] = useState({});
  const classes = useStyles();
  const majorList = useSelector((state) => state.master.major);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //request
      await axios.post('/allcourses.php', form)
      refetch();
      setOpen(false);
      alert('success');
    }
    catch (err) {
      alert(err)
      console.log(err)
    }
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div>
      <form name="create" onSubmit={handleSubmit}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Create Course</DialogTitle>
          <DialogContent>

            <TextField
              autoFocus
              required
              margin="dense"
              id="course_id"
              label="Course ID"
              name="course_id"
              type="text"
              value={form.course_id}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="course_name"
              name="course_name"
              value={form.course_name}
              onChange={handleChange}
              label="Course Name"
              type="text"
              fullWidth
            />

            <FormControl required className={classes.selectField}>
              <InputLabel id="demo-simple-select-required-label">
                Major
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                name="major_id"
                onChange={handleChange}
                value={form.major_id}
                className={classes.selectEmpty}
              >
                {majorList.map(major =>
                  (<MenuItem value={major.major_id}>{major.major_name}</MenuItem>))
                }

              </Select>
            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleSubmit} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}


const EditDialog = ({ data, setOpen, open, refetch }) => {
  const [form, setForm] = useState(data)
  const majorList = useSelector((state) => state.master.major);
  const classes = useStyles();



  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    console.log(form)
  }
  const handleSubmit = async (e) => {
    console.log('submit');
    try {
      e.preventDefault();
      //request
      await axios.patch('/allcourses.php',
        form
      )
      refetch();
      setOpen(false);
      alert('success');

    }
    catch (err) {
      alert(err)
      setOpen(false);
      console.log(err)
    }
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Course</DialogTitle>
          <DialogContent>

            <TextField
              autoFocus
              margin="dense"
              id="course_id"
              label="Course ID"
              name="course_id"
              type="text"
              value={form.course_id}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="course_name"
              name="course_name"
              value={form.course_name}
              onChange={handleChange}
              label="Course Name"
              type="text"
              fullWidth
            />

            <FormControl required className={classes.selectField}>
              <InputLabel id="demo-simple-select-required-label">
                Major
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={form.major_id}
                onChange={handleChange}
                className={classes.selectEmpty}
                name="major_id"
              >
                {majorList.map(major =>
                  (<MenuItem value={major.major_id}>{major.major_name}</MenuItem>))
                }

              </Select>
            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button type="submit" onClick={handleSubmit} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}

const DeleteDialog = ({ data, setOpen, open, refetch }) => {

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();


      //request
      await axios.delete(`/allcourses.php?id=${data.id}`)
      refetch();
      setOpen(false);
      alert('success');
    }
    catch (err) {
      setOpen(false);
      alert('something went wrong')
      console.log(err)
    }
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div>
      <form >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Course</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to Delete <b>{data.course_id}</b> <b>{data.course_name}</b> ??
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}