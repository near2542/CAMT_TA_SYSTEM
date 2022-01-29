import { useStyles } from "../components/main-style";
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { alpha, makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
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
import { title } from "../../store/title";
import Data from "../components/tableHeader.json";
import axios from "axios";
import Searchbox from '../components/Searchbox'

export const CreateDialog = ({data,setOpen,open,refetch,semester,teachers,course}) =>
{
  
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