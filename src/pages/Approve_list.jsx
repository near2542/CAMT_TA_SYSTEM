import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { alpha, makeStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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
export const Approved_list = () => {
  const dispatch = useDispatch();
  const titleName = {
    title: "Approved TA",
  };
  dispatch(title(titleName));
  const classes = useStyles();
  let location = useHistory();
  const state = useSelector((state) => state.auth);
  const assignFetch = async () => {
    let assign = null;
  if (state.role === 4) assign = `/approved_list.php?user=${state.id}`
  else assign = '/approved_list.php'
    console.log(assign);
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
    if (state.role == 4) {
      SetTableHeader(Data.approve_request.teacher);
    }
    else if (state.role == 1) {
      SetTableHeader(Data.approve_request.admin);
    }

  }, []);
  return (
    <>
      <div>
        <CssBaseline />
        <Divider />
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {['Course ID','Course Name','Major Name','Student Name','Teacher Name','Day','Time','Year','semester','timestamp'].map((Data) => {
                    if(state.role==4 && Data=='Teacher Name') return;
                    return <TableCell>{Data}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {assignCourse.map(data => (<TableRow key={data.register_id.toString()}>
                <TableCell>{data.course_id}</TableCell>
                <TableCell>{data.course_name}</TableCell>
                <TableCell>{data.major_name}</TableCell>
                <TableCell>{`${data[8]} ${data[9]}`}</TableCell>
                {state.role==1 && <TableCell >{`${data.f_name} ${data.l_name}`}</TableCell>}
                <TableCell>{data.day}</TableCell>
                <TableCell>{data.t_time}</TableCell>
                <TableCell>{data.year}</TableCell>
                <TableCell>{data.sem_number}</TableCell>
                <TableCell>{data.timestamp}</TableCell>
                </TableRow>))
              }
            </TableBody>
          </Table>
        </TableContainer>
      
      </div>
    </>
  );
};

