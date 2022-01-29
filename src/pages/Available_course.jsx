import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
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
import axios from '../shared/axios';
import { useStyles} from './components/main-style'
// import
// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.black, 0.05),
//     "&:hover": {
//       backgroundColor: alpha(theme.palette.common.black, 0.15),
//     },
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "auto",
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },

//   searchField: {
//     margin: theme.spacing(1, 1, 1, 1),
//     display: "flex",
//     alignItems: "center",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));
export const AvaliableCourse = () => {
  const dispatch = useDispatch();
  const titleName = {
    title: "Avaliable Course",
  };
  dispatch(title(titleName));
  const classes = useStyles();
  const state = useSelector((state) => state.auth);
  const semester = dispatch(state => state.semester)
  const [tableHeader, SetTableHeader] = useState([]);
  const [course,setCourses] = useState([]);
  const [SearchBy, setSearchBy] = useState("All");
  const [createOpen,setCreateOpen] = useState(false);
  useEffect(async() => {
    if (state.role == 4) {
      SetTableHeader(Data.available_course.teacher);
    }
    else if (state.role == 1) {
      SetTableHeader(Data.available_course.admin);
    }
    try{
    const {data} = await axios.get('/available_courses.php');
    setCourses(data);
    }
    catch(err)
    {
      alert('error');
      console.log(err.response.data);
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
        <div className={classes.create}>
        {+state.role ===4 &&   <Button variant="contained" classes={classes.create} color="primary" onClick={() => setCreateOpen(true)}>Request Course</Button>}
        
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
            {course.map(data =>  <TableRow>
                <TableCell component="th" scope="row"> 
                  {data.course_id}
                </TableCell>
                <TableCell >{data.course_name}</TableCell>
                <TableCell >{data.major_name}</TableCell>
              
            </TableRow>)}
       </TableBody>
          </Table>
        </TableContainer>
      </div>
      {createOpen && <CreateDialog open={createOpen} setOpen={setCreateOpen} semester={semester} />}
    </>
  );
};

const CreateDialog = ({data,setOpen,open,refetch,semester,teachers,course}) =>
{
  const [form,setForm] = useState({});
  const classes = useStyles();
  const daywork = useSelector((state) => state.master.daywork);
  const semester = useSelector((state) => state.semester);
  const handleChange =(e) =>
  {
    setForm({...form,
      [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>
  {
    try{
    e.preventDefault();
    //request
    console.log('submitted-form here',form);
    await axios.post('/assign_courses.php',form)
    refetch();
    setOpen(false);
    alert('success');
    }
    catch(err)
    {
      alert(err.response.data.error)
      console.log(err)
    }
  }

  const handleClose = () =>
  {
    setOpen(false);
  }
  return(
    <div className={classes.dialogMin}>
           <form name="create" onSubmit={handleSubmit} className={classes.dialogMin}>
      <Dialog
      fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialogMin}
      >
        <DialogTitle id="alert-dialog-title">Assign Course</DialogTitle>
        <DialogContent>
        <FormControl required className={classes.selectField}>
              <InputLabel id="demo-simple-select-required-label">
               Semester
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                name="sem_id"
                onChange={handleChange}
                value={form.sem_id}
                
              >
                {semester.map(sem=> 
                (<MenuItem value={sem.sem_id}>Sem:{sem.sem_number} Year:{sem.year} </MenuItem>))
                }
               
              </Select>
            </FormControl>
            <FormControl required className={classes.selectField}>
              <InputLabel id="demo-simple-select-required-label">
               Course
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                name="course_id"
                onChange={handleChange}
                value={form.course_id}
              >
                {course.map(cor=> 
                (<MenuItem value={cor.id}><b>{cor.major_name}</b> - {`${cor.course_id} ${cor.course_name}`}  </MenuItem>))
                }
               
              </Select>
            </FormControl>
            <FormControl required className={classes.selectField}>
              <InputLabel id="demo-simple-select-required-label">
               Teacher
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                name="user_id"
                onChange={handleChange}
                value={form.user_id}
             
              >
                {teachers.map(teacher=> 
                (<MenuItem value={teacher.user_id}>{`${teacher.f_name} ${teacher.l_name}`}  </MenuItem>))
                }
               
              </Select>
            </FormControl>
          
            <TextField
            required
            margin="dense"
            id="section"
            name="section"
            value={form.section}
            onChange={handleChange}
            label="Section"
            type="text"
            placeholder="Ex. 001"
            fullWidth
          />
            <FormControl required className={classes.selectField}>
              <InputLabel id="demo-simple-select-required-label">
               Day
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                name="day"
                onChange={handleChange}
                value={form.day}
               
              >
                {daywork.map(day=> 
                (<MenuItem value={day.id}>{day.day}</MenuItem>))
                }
              </Select>
            </FormControl>
            <TextField
            required
            margin="dense"
            id="work_time"
            name="work_time"
            value={form.work_time}
            onChange={handleChange}
            label="Work Tme"
            type="text"
            placeholder="Ex. 1430-1600"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="hour"
            name="hour"
            value={form.hour}
            onChange={handleChange}
            label="Hour Per Week"
            type="text"
            placeholder="Hours"
            fullWidth
          />
            <FormControl required className={classes.selectField}>
              <InputLabel id="demo-simple-select-required-label">
               Language
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                name="language"
                onChange={handleChange}
                value={form.language}
               
              >
                {['Thai','Eng'].map(lang=> 
                (<MenuItem value={lang} >{lang}</MenuItem>))
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