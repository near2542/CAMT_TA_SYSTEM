import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
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
import { Typography } from "@material-ui/core";
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
  marginTop:{
   marginTop:10,
  },
  searchField: {
    margin: theme.spacing(1, 1, 1, 1),
    display: "flex",
    alignItems: "center",
    minWidth:300,
  },
  selectField:{
    display:'flex',
  },
  dialogMin:{
    minWidth:300,
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
export const RequestTA = () => {
  const dispatch = useDispatch();
  const titleName = {
    title: "Assign Course",
  };
  dispatch(title(titleName));
  const classes = useStyles();
  let navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  const assignFetch = async() =>
  {
    let assign = null;
    console.log('role',state.role);
    console.log('id',state.id);

    if(state.role==4) assign =`/request_ta.php?user=${state.id}`
    
    else assign = '/request_ta.php'
    console.log(assign);
    const {data} = await axios.get(assign)
    setassignCourse(data);
  }
  const [open, setOpen] = useState(false);
  const [currentModal,setCurrentModal] = useState({});
  const [createOpen,setCreateOpen] = useState(false);
  const [course,setCourse] = useState(null);
  const [assignCourse,setassignCourse] = useState([]);
  const [teachers,setTeachers] = useState(null)
  const [semester,setSemester] = useState(null)
  const [editOpen,setEditOpen] = useState(false)
  const [deleteOpen,setDeleteOpen] = useState(false)
  const [tableHeader, SetTableHeader] = useState([]);
  const [SearchBy, setSearchBy] = useState("All");
  useEffect(async () => {
    try{    
    const course = await axios.get('/allcourses.php');
    const teacher = await axios.get('/teachers.php');
    const semester = await axios.get('/semester.php');
    assignFetch();
    setCourse(course.data);
    setTeachers(teacher.data);
    setSemester(semester.data);
    }
    catch(err)
    {
      console.log('test')
         
      navigate('/auth',{replace:true});
      console.log(err.number);
    }
    if (state.role == 4) {
      SetTableHeader(Data.assign_course.teacher);
    }
    else if (state.role == 1) {
      SetTableHeader(Data.assign_course.admin);
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
              {console.log(assignCourse)}
              {assignCourse.map(data => (<TableRow key={data.m_course_id.toString()}>
               <TableCell>{data.m_status ==1? 'Open' : 'Close'}</TableCell>
               <TableCell>{data.sem_number}</TableCell>
               <TableCell>{data.year}</TableCell>
               <TableCell>{data.course_id}</TableCell>
               <TableCell>{data.course_name}</TableCell>
               <TableCell>{data.major_name}</TableCell>
               <TableCell>{data.section}</TableCell>
               <TableCell>{data.day}</TableCell>
               <TableCell>{data.t_time}</TableCell>
               <TableCell>{data.language}</TableCell>
               <TableCell>{data.hr_per_week}</TableCell>
               <TableCell  colSpan="2">
                 {/* { data.request_id?
                 (<Button disabled variant="contained" color="primary" 
                 onClick={()=> {
                   setCurrentModal(data);
                   setEditOpen(true); }}
              >Requested</Button> ):
              ( <Button variant="contained" color="primary" 
                  onClick={()=> {
                    setCurrentModal(data);
                    setEditOpen(true); }}
               >Request</Button>)  } */}
               {!data.request_id && <Button variant="contained" color="primary"  onClick={()=> {
                   setCurrentModal(data);
                   setEditOpen(true); }}>Request</Button>}
               {data.request_id && data.approved ==0 && <Button disabled>Requested</Button>}
               {data.request_id && data.approved == 1 && <Typography color="primary">Approved</Typography>}
               {data.request_id && data.approved == 2 && <Typography color="secondary">Rejected</Typography>}
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
        {createOpen && <CreateDialog setOpen={setCreateOpen} semester={semester} teachers={teachers} course={course}  open={createOpen} refetch={assignFetch}/>}
        {editOpen && <EditDialog setOpen={setEditOpen} semester={semester} teachers={teachers} course={course} open={editOpen} data={currentModal} refetch={assignFetch}/>}
        {deleteOpen && <DeleteDialog setOpen={setDeleteOpen} open={deleteOpen} data={currentModal} refetch={assignFetch}/>}
      </div>
    </>
  );
};

const CreateDialog = ({data,setOpen,open,refetch,semester,teachers,course}) =>
{
  console.log(semester)
  console.log(teachers)
  console.log(course)
  const [form,setForm] = useState({});
  const classes = useStyles();
  const daywork = useSelector((state) => state.master.daywork);
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
      alert('something went wrong')
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


const EditDialog = ({data,setOpen,open,refetch,semester,teachers,course}) =>
{
  const state = useSelector((state) => state.auth);
  const [form,setForm] = useState({...data,course_id:data.courseID,day:data.id,work_time:data.t_time,hour:data.hr_per_week,
   user_id:state.id
  })
  console.log(form);
  const majorList = useSelector((state) => state.master.major);
  
  const classes = useStyles();
  const daywork = useSelector((state) => state.master.daywork);


  const handleChange =(e) =>
  {
    setForm({...form,
      [e.target.name]:e.target.value})
      console.log(form)
  }
  const handleSubmit = async(e)=>
  {
    console.log('submit');
    try{
    e.preventDefault();
    //request
    await axios.post('/request_ta.php',
      form
    )
    refetch();
    setOpen(false);
    alert('success');
    
    }
    catch(err)
    {
      alert('something went wrong')
      setOpen(false);
      console.log(err)
    }
  }

  const handleClose = () =>
  {
    setOpen(false);
  }
  return(
    <div>
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
                disabled
              >
                {semester.map(sem=> 
                (<MenuItem value={sem.sem_id}>Sem:{sem.sem_number} Year:{sem.year} </MenuItem>))
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
                disabled
              >
                {teachers.map(teacher=> 
                (<MenuItem value={teacher.user_id}>{`${teacher.f_name} ${teacher.l_name}`}  </MenuItem>))
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
                disabled
              >
                {course.map(cor=> 
                (<MenuItem  value={cor.id}> <b>{cor.major_name}</b> - {`${cor.course_id} ${cor.course_name}`}  </MenuItem>))
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
            disabled
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
                disabled
              >
                {daywork.map(day=> 
                (<MenuItem value={day.id}>{day.day}</MenuItem>))
                }
               
              </Select>
            </FormControl>
            <TextField
            required
            margin="dense"
            disabled
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
            disabled
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
                disabled
              >
                {['Thai','Eng'].map(lang=> 
                (<MenuItem value={lang} >{lang}</MenuItem>))
                }
               
              </Select>
            </FormControl>
            <TextField
            required
            margin="dense"
            
            id="stu_num"
            name="student_num"
            value={form.student_num}
            onChange={handleChange}
            label="Student Number"
            type="text"
            placeholder="Student needed number"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="ex_num"
            name="external_num"
            value={form.external_num}
            onChange={handleChange}
            label="External Number"
            type="text"
            placeholder="External needed number"
            fullWidth
          />
            <TextField
            className={clsx(classes.marginTop,classes.selectField)}
          id="outlined-multiline-static"
          label="Note"
          name="note"
          onChange={handleChange}
          value={form.note}
          multiline
          rows={6}
          placeholder="Note here..."
          variant="outlined"
        />
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

const DeleteDialog = ({data,setOpen,open,refetch}) =>
{
  
  const handleSubmit = async (e)=>
  {
    try{
    e.preventDefault();

    
    //request
    await axios.delete(`/assign_courses.php?id=${data.m_course_id}`)
    refetch();
    setOpen(false);
    alert('success');
    }
    catch(err)
    {
      setOpen(false);
      alert('something went wrong')
      console.log(err)
    }
  }

  const handleClose = () =>
  {
    setOpen(false);
  }
  return(
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
           Do you want to Delete <b>{data.course_id }</b> <b>{data.course_name}</b> ??
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

