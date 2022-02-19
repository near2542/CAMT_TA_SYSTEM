import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import clsx from 'clsx';
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
import { title } from "../store/title";
import Data from "./components/tableHeader.json";
import axios from "axios";
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
  marginTop: {
    marginTop: 10,
  },
  searchField: {
    margin: theme.spacing(1, 1, 1, 1),
    display: "flex",
    alignItems: "center",
    minWidth: 300,
  },
  selectField: {
    display: 'flex',
  },
  dialogMin: {
    minWidth: 300,
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
export const AssignTA = () => {
  const dispatch = useDispatch();
  const titleName = {
    title: "Register TA Job",
  };
  dispatch(title(titleName));
  const classes = useStyles();
  let location = useHistory();
  const state = useSelector((state) => state.auth);
  const assignFetch = async () => {
    let assign = null;
    assign = `/job_register.php?user=${state.id}`
    const { data } = await axios.get(assign)
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
  useEffect(async () => {
    try {
      const course = await axios.get('/allcourses.php');
      const teacher = await axios.get('/teachers.php');
      const semester = await axios.get('/semester.php');
      assignFetch();
      setCourse(course.data);
      setTeachers(teacher.data);
      setSemester(semester.data);
    }
    catch (err) {

      location.push('/auth');
      console.log(err.number);
    }
    if (state.role == 2) {
      SetTableHeader(Data.assign_ta.StudentTA);
    }
    else if (state.role == 3) {
      SetTableHeader(Data.assign_ta.ExternalTA);
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
          {/* <Button variant="contained" color="primary" onClick={()=>setCreateOpen(true)}>Create</Button> */}

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
              {assignCourse.map(data => (<TableRow key={data.m_course_id}>
                <TableCell>{data.course_id}</TableCell>
                <TableCell>{data.course_name}</TableCell>
                <TableCell>{data.section}</TableCell>
                <TableCell>{data.major_name}</TableCell>
                <TableCell>{data.year}</TableCell>
                <TableCell>{data.sem_number}</TableCell>
                <TableCell>{`${data.f_name} ${data.l_name}` }</TableCell>
                <TableCell>{data.language}</TableCell>
                <TableCell>{data.day}</TableCell>
                <TableCell>{data.t_time}</TableCell>
                <TableCell>{data.hr_per_week}</TableCell>
                <TableCell>{data.stu_num}</TableCell>
                <TableCell>{data.ex_num}</TableCell>
                <TableCell colSpan="2" style={{ textAlign: 'center' }}>
                    {(data.r_status == null || data.r_status == 3) && <Button  variant="contained" color="primary"
                      onClick={() => {
                        setCurrentModal(data);
                        setEditOpen(true);
                      }}
                    >Register</Button>}

                    {data.r_status == 0 && <Button 
                    onClick={() => {
                      setCurrentModal(data);
                      setDeleteOpen(true);
                    }}
                    variant="contained" color="secodnay">Cancel</Button>}
                    {data.r_status == 1 && <Button disabled variant="contained">Approved</Button>}
                    {data.r_status == 2 && <Button disabled variant="contained">Rejected</Button>}
                  {/* <Button  color="secondary" onClick=
                  {()=>  {
                    setCurrentModal(data);
                    setDeleteOpen(true);} 
                  }
                    >Delete</Button>*/}

                </TableCell>               </TableRow>))
              }
            </TableBody>
          </Table>
        </TableContainer>
        {editOpen && <RegisterDialog setOpen={setEditOpen} semester={semester} teachers={teachers} course={course} open={editOpen} data={currentModal} refetch={assignFetch} />}
        {deleteOpen && <CancelDialog setOpen={setDeleteOpen} open={deleteOpen} data={currentModal} refetch={assignFetch} />}
      </div>
    </>
  );
};


const RegisterDialog = ({ data, setOpen, open, refetch, semester, teachers, course }) => {
  const state = useSelector((state) => state.auth);

  const form = {m_course_id:data.matching_id,
                register_id:data.register_id,
                user_id:state.id};

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
       
      //request
      await axios.post(`/job_register.php`,form)
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
          <DialogTitle id="alert-dialog-title">Approve</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to Approve <b>{data.course_id}</b> <b>{data.course_name}</b> ??
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

const CancelDialog = ({ data, setOpen, open, refetch }) => {
  const state = useSelector((state) => state.auth);
  const {register_id} = data;
  const form = {register_id}
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.patch(`/job_register.php`,form)
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
              Do you want to Cancel <b>{data.course_id}</b> <b>{data.course_name}</b> ??
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

