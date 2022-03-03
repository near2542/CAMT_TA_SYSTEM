import React, { useState, useEffect,useRef } from "react";
import axios from '../shared/axios';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
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
import Select from "@material-ui/core/Select";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { Redirect } from 'react-router-dom';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { title } from "../store/title";
import Data from "./components/tableHeader.json";
import Searchbox from './components/Searchbox';
import { useOptions } from "../shared/useOptions";
// import
import {useStyles} from './components/main-style';


let GlobalForm = {
  course_id: '',
  course_name: '',
  major_id: null,
}



export const Course = () => {
  const [course, setCourse] = useState([]);
  const classes = useStyles();
  const [filterCourse, setFilterCourse] = useState([])
  const [searchValue, setSearch] = useState({searchBy:'all',searchValue:'',year:'2564'});
  const options = useRef(useOptions(['course_id','course_name','major_name']))
  const dispatch = useDispatch();
  const fetchCourses = async () => {
    const { data } = await axios.get('/allcourses.php');
    setCourse(data);
    setFilterCourse(data)
  }
  const titleName = {
    title: "Course",
  };

  

  const searchData = () => {
    let searchby = searchValue.searchBy.toLowerCase()
    let searchvalue = searchValue.searchValue.toLowerCase()
    let year = searchValue.year
    let _data = []
    if (searchby === 'all') {
      _data = course.filter(data => {
        return data.course_id.toString().toLowerCase().includes(searchvalue) == true
          || data.course_name.toLowerCase().includes(searchvalue) == true
          || data.major_name.toLowerCase().includes(searchvalue) === true
      })
    }
    else if (searchby === 'course_id') {
    _data = course.filter(data => {
        return data.course_id.toString().toLowerCase().includes(searchvalue) == true
      })
    }
    else if (searchby === 'course_name') {
    _data =  course.filter(data => {
        return data.course_name.toLowerCase().includes(searchvalue) == true
      })
    }
    else if (searchby === 'major_name') {
     _data = course.filter(data => {
        return data.major_name.toLowerCase().includes(searchvalue) === true
      })
    }
    setFilterCourse(_data)
  }

  dispatch(title(titleName));
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  const [currentModal, setCurrentModal] = useState();
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [tableHeader, SetTableHeader] = useState([]);
  useEffect(() => {
   
    try {
      fetchCourses(); 
    }
    catch (err) {
      console.log(err);
    }
    if (state.role == 4) {
      SetTableHeader(Data.course.teacher);
    }
    else if (state.role == 1) {
      SetTableHeader(Data.course.admin);
    }
  }, []);
  useEffect(() => {
    searchData()
  }, [searchValue])
  return (
    <>
      <div>
        <Searchbox searchValue={searchValue} setSearch={setSearch} options={options.current} />
            <div className={classes.create}>
          <Button variant="contained" color="primary" onClick={() => setCreateOpen(true)}>Create</Button>
            </div>
        {/* <Divider /> */}
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {tableHeader.map((Data) => (
                  <TableCell key={Data}>{Data}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterCourse?.map(data =>
              (<>
                <TableRow key={`id_${data.course_id}`}>

                  <TableCell >{data.course_id}</TableCell>
                  <TableCell >{data.course_name}</TableCell>
                  <TableCell >{data.major_name}</TableCell>
                  <TableCell >
                    <Button variant="contained" color="primary"
                      onClick={() => {
                        setCurrentModal(data);
                        setEditOpen(true);
                      }}
                    >Edit</Button>
                    <Button color="secondary" onClick=
                      {() => {
                        setCurrentModal(data);
                        setDeleteOpen(true);
                      }
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
        {createOpen && <CreateDialog setOpen={setCreateOpen} open={createOpen} refetch={fetchCourses} />}
        {editOpen && <EditDialog setOpen={setEditOpen} open={editOpen} data={currentModal} refetch={fetchCourses} />}
        {deleteOpen && <DeleteDialog setOpen={setDeleteOpen} open={deleteOpen} data={currentModal} refetch={fetchCourses} />}
      </div>
    </>
  );
};



const CreateDialog = ({ data, setOpen, open, refetch }) => {

  const [form, setForm] = useState(GlobalForm);
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
      alert(err.response.data.error)
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
                  (<MenuItem key={`${data.major.major_id}1`} value={major.major_id}>{major.major_name}</MenuItem>))
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
      alert(err.response.data.error)
      setOpen(false);
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
                  (<MenuItem  key={major.major_id} value={major.major_id}>{major.major_name}</MenuItem>))
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
      return alert(err.response.data.error)
      console.log(err)
    }
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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

