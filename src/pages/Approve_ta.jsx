import React, { useState, useEffect } from "react";
import axios from '../shared/axios';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { alpha, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import DialogContentText from "@material-ui/core/DialogContentText";
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
  marginTop: {
    marginTop: 10,
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
export const ApproveTa = () => {
  const dispatch = useDispatch();
  const titleName = {
    title: "Approve Ta",
  };
  dispatch(title(titleName));
  const classes = useStyles();
  const state = useSelector((state) => state.auth);
  const assignFetch = async () => {
    let assign = null;
    console.log('role', state.role);
    console.log('id', state.id);

    assign = state.role == 1 ? `/approve_ta.php` : `/approve_ta.php?user=${state.id}`
    const { data } = await axios.get(assign)
    console.log(data);
    setassignCourse(data);
  }
  const [open, setOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState({});
  const [createOpen, setCreateOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [assignCourse, setassignCourse] = useState([]);
  const [teachers, setTeachers] = useState(null)
  const [semester, setSemester] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [tableHeader, SetTableHeader] = useState([]);
  const [SearchBy, setSearchBy] = useState("All");
  const navigate = useNavigate();
  console.log(state);
  useEffect(async () => {
    try {
      const course = await axios.get('/allcourses.php');
      console.log('raw',course);
      console.log('data',course.data);
      console.log(course.status);
      //get post put patch etc.
      const teacher = await axios.get('/teachers.php');
      const semester = await axios.get('/semester.php')
      assignFetch();
      setCourse(course.data);
      setTeachers(teacher.data);
      setSemester(semester.data);
    }
    catch (err) {

      navigate('/auth',{replace:true});
      console.log(err.number);
    }
    if (state.role == 1) {
      SetTableHeader(Data.approve_ta.admin);
    }
    else if (state.role == 4) {
      SetTableHeader(Data.approve_ta.teacher);
    }

  }, []);
  return (
    <>
      <div>
        <CssBaseline />
        <div className={classes.searchField}>
          <div class="select">
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
          </FormControl>
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
              {assignCourse.map(data => (<TableRow>
                <TableCell >{data.course_id}</TableCell>
                <TableCell >{data.course_name}</TableCell>
                <TableCell >{data.section}</TableCell>
                <TableCell >{data.major_name}</TableCell>
                <TableCell >{`${data[8]} ${data[9]}`}</TableCell>
                <TableCell >{data[17] == 2 ? 'Student' : 'External'}</TableCell>
                {tableHeader.length == 13 && <TableCell>{`${data.f_name} ${data.l_name}`}</TableCell>}
                <TableCell >{data.day}</TableCell>
                <TableCell >{data.t_time}</TableCell>
                <TableCell >{data.year}</TableCell>
                <TableCell >{data.sem_number}</TableCell>
                <TableCell >{data[16].length > 0 ? data[16] : 'NONE'}</TableCell>
                <TableCell >
                  <Button color="primary" variant="contained"
                   onClick={()=>
                  {
                    setEditOpen(true)
                    setCurrentModal(data)
                  }}
                  >Approve</Button>
                  <Button className={classes.marginTop} color="secondary" variant="contained"
                  onClick={()=>{
                    setDeleteOpen(true)
                    setCurrentModal(data)
                  }}
                  >Reject</Button>
                </TableCell>
              </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
        {editOpen && <EditDialog setOpen={setEditOpen} semester={semester} teachers={teachers} course={course} open={editOpen} data={currentModal} refetch={assignFetch} />}
        {deleteOpen && <DeleteDialog setOpen={setDeleteOpen} open={deleteOpen} data={currentModal} refetch={assignFetch} />}

      </div>
    </>
  );
};


const EditDialog = ({ data, setOpen, open, refetch, semester, teachers, course }) => {
  console.log(data);
  const [form,setForm] = useState(data);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await axios.post(`/approve_ta.php`,form);
      refetch();
      setOpen(false);
      alert('TA submitted');
    }
    catch (err) {
      setOpen(false);
      alert(err)
      
    }
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div>
      <form >
        <Dialog
          fullWidth 
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Approve TA</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <p>Do you want to Approve <b>{`${data[8]} ${data[9]}`}</b></p>
              <p>TO BE TA OF  <b>{data.course_id} {data.course_name} ??</b></p> 
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

const DeleteDialog = ({ data, setOpen, open, refetch }) => {

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();


      //request
      await axios.patch(`/approve_request_ta.php?id=${data.request_id}&reject`)
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
        fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Reject TA</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>Do you want to Reject <b>{`${data[8]} ${data[9]}`}</b></p>
              <p>FROM COURSE <b>{data.course_id} {data.course_name}</b> ??</p> 
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
