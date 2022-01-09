import React, { useState, useEffect } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {title} from '../store/title';
// import 
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    display: 'flex',
    alignItems: 'center',

  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}
));
export const Homepage = () => {
  const dispatch = useDispatch();
  const titleName = {
    title:'Homepage',
  }
  dispatch(title(titleName))
  const classes = useStyles();
  const state = useSelector((state) => state.auth)
  const [open, setOpen] = useState(false);
  // console.log(state);
  const [SearchBy, setSearchBy] = useState('All')
  useEffect(() => {

  }, [])
  return (
    <>

      <div>
          <h1>TA system is welcome!</h1>
      </div>
    </>
  )


}



