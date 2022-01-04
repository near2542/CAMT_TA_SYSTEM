import React, { useState, useEffect } from "react";
import axios from '../../shared/axios';
import { useSelector, useDispatch } from "react-redux";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination"
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import { title } from "../../store/title";
// import {CreateDialog} from './create'
import Data from "../components/tableHeader.json";
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
  selectField:{
    display:'flex',

  },
  createButton:{
    color:'#002884',
    textAlign:'right',
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

let GlobalForm = {
  course_id: '',
  course_name: '',
  major_id: null,
}



export const Teacher = () => {
  const [teacher,setTeacher] = useState([]);
  const dispatch = useDispatch();
  const fetchCourses = async() =>
  {
   const teacher = await axios.get('/teachers.php');
   setTeacher(teacher.data);
  }
  const titleName = {
    title: "Teacher List",
  };
  dispatch(title(titleName));

  const classes = useStyles();
  const majorList = useSelector((state) => state.master);
  const [currentModal,setCurrentModal] = useState();
  const [createOpen,setCreateOpen] = useState(false)
  const [editOpen,setEditOpen] = useState(false)
  const [deleteOpen,setDeleteOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const [tableHeader, SetTableHeader] = useState([]);

  const [SearchBy, setSearchBy] = useState("All");
  useEffect(async() => {
    try{
  fetchCourses();
    }
    catch(err)
    {
      console.log(err);
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
          <Button variant="contained" color="primary" onClick={()=>setCreateOpen(true)}>Create</Button>
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
                {['Username','First Name','Last Name','major','email','tel','Action'].map((Data) => (
                  <TableCell>{Data}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
             
               {teacher.map(data => 
                (<>
                <TableRow>
                 
                <TableCell >{data.username}</TableCell>
                <TableCell >{data.f_name}</TableCell>
                <TableCell >{data.l_name}</TableCell>
                <TableCell >{data.major_name}</TableCell>
                <TableCell >{data.cmu_mail}</TableCell>
                <TableCell >{data.tel? data.tel:'-'}</TableCell>
                <TableCell >
                  <Button variant="contained" color="primary" 
                  onClick={()=> {
                    setCurrentModal(data);
                    setEditOpen(true); }}
                    >Edit</Button> 
                  <Button  color="secondary" onClick=
                  {()=>  {
                    setCurrentModal(data);
                    setDeleteOpen(true);} 
                  }
                    >Delete</Button>
                </TableCell>
                </TableRow>
                </>)
                )/* { <TableCell component="th" scope="row">
                  {"test"}
                </TableCell>
                <TableCell align="right">{"test"}</TableCell>
                <TableCell align="right">{"test"}</TableCell>
                <TableCell align="right">{"test"}</TableCell>
                <TableCell align="right">{"test"}</TableCell>} */}
              
            </TableBody>
          </Table>
        </TableContainer>
        {createOpen && <CreateDialog setOpen={setCreateOpen} open={createOpen} refetch={fetchCourses}/>}
        {editOpen && <EditDialog setOpen={setEditOpen} open={editOpen} data={currentModal} refetch={fetchCourses}/>}
        {deleteOpen && <DeleteDialog setOpen={setDeleteOpen} open={deleteOpen} data={currentModal} refetch={fetchCourses}/>}
      </div>
    </>
  );
};


const CreateDialog = ({data,setOpen,open,refetch}) =>
{
  
  const [form,setForm] = useState({});
  const classes = useStyles();
  const majorList = useSelector((state) => state.master.major);
  const handleChange =(e) =>
  {
    setForm({...form,
      [e.target.name]:e.target.value})
   
  }

  const handleSubmit = async (e)=>
  {
    e.preventDefault();
    try{
 
    //request
    await axios.post('/teachers.php',form)
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
    <div>
           <form name="create" onSubmit={handleSubmit}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Teacher</DialogTitle>
        <DialogContent>
   
        <TextField
            required
            margin="dense"
            id="username"
            label="Username"
            name="username"
            type="text"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
          />
            <TextField
            required
            margin="dense"
            id="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
            label="Password"
            type="text"
            fullWidth
          />
           <TextField
            required
            margin="dense"
            id="first_name"
            label="First Name"
            name="f_name"
            type="text"
            placeholder="Your first name here"
            value={form.f_name}
            onChange={handleChange}
            fullWidth
          />
           <TextField
            required
            margin="dense"
            id="last_name"
            label="Last Name"
            name="l_name"
            type="text"
            placeholder="Your last name here"
            value={form.l_name}
            onChange={handleChange}
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
                {majorList.map(major=> 
                (<MenuItem value={major.major_id}>{major.major_name}</MenuItem>))
                }
               
              </Select>
            </FormControl>

            <TextField
            required
            margin="dense"
            id="cmu_mail"
            name="cmu_mail"
            value={form.cmu_mail}
            onChange={handleChange}
            label="Email"
            type="text"
            placeholder="example@hotmail.com"
            fullWidth
          />
           <TextField
            
            required
            margin="dense"
            id="tel"
            name="tel"
            value={form.tel}
            onChange={handleChange}
            label="Tel."
            placeholder="08xxxxxxxx"
            type="text"
            fullWidth
          />
               <TextField
              
              margin="dense"
              id="line_id"
              name="line_id"
              value={form.line_id}
              onChange={handleChange}
              label="Line ID"
              placeholder="@example"
              type="text"
              fullWidth
            />
            <TextField
              
              margin="dense"
              id="facebook_link"
              name="facebook_link"
              value={form.facebook_link}
              onChange={form.facebook_link}
              label="Facebook Link"
              placeholder="@example"
              type="text"
              fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  )
}


const EditDialog = ({data,setOpen,open,refetch}) =>
{
    const [form,setForm] = useState({...data,password:null});
    console.log(form);
    const classes = useStyles();
    const majorList = useSelector((state) => state.master.major);
    const handleChange =(e) =>
    {
      setForm({...form,
        [e.target.name]:e.target.value})
     
    }
  
    const handleSubmit = async (e)=>
    {
      e.preventDefault();
      try{
    
      //request
      await axios.patch('/teachers.php',form)
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
      <div>
             <form name="create" onSubmit={handleSubmit}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Teacher</DialogTitle>
          <DialogContent>
     
          <TextField
              required
              margin="dense"
              id="username"
              label="Username"
              name="username"
              type="text"
              placeholder="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
            />
              <TextField
              required
              margin="dense"
              id="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              label="New Password"
              type="text"
              fullWidth
            />

          <TextField
            required
            margin="dense"
            id="first_name"
            label="First Name"
            name="f_name"
            type="text"
            placeholder="Your first name here"
            value={form.f_name}
            onChange={handleChange}
            fullWidth
          />
           <TextField
            required
            margin="dense"
            id="last_name"
            label="Last Name"
            name="l_name"
            type="text"
            placeholder="Your last name here"
            value={form.l_name}
            onChange={handleChange}
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
                  {majorList.map(major=> 
                  (<MenuItem value={major.major_id}>{major.major_name}</MenuItem>))
                  }
                 
                </Select>
              </FormControl>
              <TextField
              required
              margin="dense"
              id="cmu_mail"
              name="cmu_mail"
              value={form.cmu_mail}
              onChange={handleChange}
              label="Email"
              type="text"
              placeholder="example@hotmail.com"
              fullWidth
            />
             <TextField
              required
              margin="dense"
              id="tel"
              name="tel"
              value={form.tel}
              onChange={handleChange}
              label="Tel."
              placeholder="08xxxxxxxx"
              type="text"
              fullWidth
            />
             <TextField
              margin="dense"
              id="line_id"
              name="line_id"
              value={form.line_id}
              onChange={handleChange}
              label="Line ID"
              placeholder="@example"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="facebook_link"
              name="facebook_link"
              value={form.facebook_link}
              onChange={handleChange}
              label="Facebook Link"
              placeholder="@example"
              type="text"
              fullWidth
            />
              
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" autoFocus>
              Confirm
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
    e.preventDefault();
    try{
    //request
    await axios.delete(`/teachers.php?id=${data.user_id}`)
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
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  )
}

