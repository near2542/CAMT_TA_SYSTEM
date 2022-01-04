import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../store/auth';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio,{RadioProps} from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Email } from '@material-ui/icons';
import axios from '../shared/axios';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label :{
    margin:theme.spacing(1,0,1)
  },
  danger:{
    color:'#d81b60',
    fontWeight:'bold',
  }
}));

export function Register() {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [OnSubmit, setOnSubmit] = useState(false);
  const [majorSelect, setMajor] = useState('');
  const [open, setOpen] = useState(false);
  const [showForm,setShow] = useState(false);
  const [user, setUser] = useState({
    TA_type: false,
    username:'',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    student_id: '',
    tel: '',
    major: false,
    line: '',
    facebook: '',
    portfolio: '',
    role: false,

  })

  const [formError, setError] = useState({
    TA_type: false,
    username:{status:false,message:''},
    email: {status:false,message:''},
    password: {status:false,message:''},
    firstname: {status:false,message:''},
    lastname: {status:false,message:''},
    student_id: {status:false,message:''},
    tel: {status:false,message:''},
    major: {status:false,message:'',touch:false},
  })

  useEffect(()=>{

    let anyError = 0;
    for(let key in formError)
    {
      if(formError[key].status == true) anyError++
    }
    if(anyError>0) return setOnSubmit(true);
     return setOnSubmit(false);
  },[formError])

  const handleChange = (e) => {
    setUser({...user,major:e.target.value});
    if(majorSelect == null) return setError({...formError,major:{message:'Please Select Major'}})
    
  };


  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setError({...formError,major:{touch:true}})
    console.log(formError.major)
  };

  const handleSubmit = async (e) =>
  {
    setOnSubmit(!OnSubmit)
    e.preventDefault();
    const data ={
      ...user
    }
    try{
    const response = await axios.post('/register.php',data);
    setError({...formError,username:{status:false,message:''}})
    console.log(response);
    alert('create success');
    history.push('/auth');
    }
    catch(err)
    {
      const {error} = err.response.data;
      if(error.toLowerCase().indexOf('username')) {
        let message = 'Username is already used'
        alert(message)
        setError({...formError,username:{status:true,message:message}})
    }
      // setError(...formError,{username:{status:true,message:error.toString()}})
      console.log(error);
      
      setOnSubmit(!OnSubmit)
    }
    finally{
      setOnSubmit(false)
    }
  }



  return (
    <Container component="main" maxWidth="xs">
      
      <div className={classes.paper}>
      
        <Typography component="h6" variant="h5">
          Already have an account? <Link href="/auth">Login</Link>
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl component="fieldset"> 
      <FormLabel component="legend">Select TA type</FormLabel>

      <RadioGroup row aria-label="position" name="position" value={user.TA_type} defaultValue="top" 
      onChange={(e)=> {
        
        setUser({...user,TA_type:parseInt(e.target.value)})

        console.log(`selected ${user.TA_type}`)
      }
      } >
        <FormControlLabel
          value={2}
          control={<Radio color="primary"/>}
          onChange={(e)=>setUser({...user,TA_type:e.target.value})}
          label="Internal"
          labelPlacement="start"
        />

      <FormControlLabel
          value={3}
          control={<Radio color="primary" />}
          onChange={(e)=>setUser({...user,TA_type:e.target.value})}
          label="External"
          labelPlacement="start"
        />
       
      
      </RadioGroup>
    </FormControl>
       
         { user.TA_type && <> 
         
          <TextField
            onChange={(e) => {
              setUser({...user,username:e.target.value})
                e.target.value.search(/\w{8,20}/) == -1? 
                setError({...formError,username:{status:true,message:'Username length should be greater than 8'}})
                : setError({...formError,username:{status:false,message:''}})
            }}
            variant="outlined"
            margin="normal"
            required
            value={user.username}
            fullWidth
            error={formError.username.status}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            
          />
          {formError.username.status && <FormHelperText className={classes.danger}>{formError.username.message}</FormHelperText>}
         
    
         <TextField
            onChange={ async (e) => {
               setUser({ ...user, password: e.target.value });
               console.log('password',e.target.value);
               console.log('confirm password',user.confirm_password)
              if(e.target.value?.length <= 7 ) 
            {
              return setError({...formError,password:{status:true,message:'Password length must be longer than 8'}})
            }
            
              user.confirm_password !== e.target.value?  
              setError({...formError,confirm_password:{status:true,message:'Password not match'}})
              :setError({...formError,confirm_password:{status:false,message:''}})
    
            
             return setError({...formError,password:{status:false,message:''}})
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={formError.password.status}
            value={user.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
         {formError.password.status && <FormHelperText className={classes.danger}>{formError.password.message}</FormHelperText>}

         <TextField
            onChange={(e) => {
              if(user.TA_type === 1)  {e.target.value.search(/\w@cmu.ac.th$/) == -1? 
            setError({...formError,email:{status:true,message:'Email must be an CMU email'}})  
              :
              (
              
           setError({...formError,email:{status:false,message:''}})

              )}
              else{
                e.target.value.search(/\w@\w.\w/) == -1? 
                setError({...formError,email:{status:true,message:'Please insert valid email'}})  
                :
                setError({...formError,email:{status:false,message:''}})
  
              }
           setUser({ ...user, email: e.target.value });
           console.log(user.email);
            }}
            variant="outlined"
            margin="normal"
            required
            value={user.email}
            fullWidth
            error={formError.email.status}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"

          />
          {formError.email.status && <FormHelperText className={classes.danger}>{formError.email.message}</FormHelperText>}



         {user.TA_type === 1 &&  <TextField
            onChange={ async (e) => {
               setUser({ ...user, student_id: e.target.value.substring(0,9) });
               e.target.value.search(/[0-9]{9}$/) == -1?
               setError({...formError,student_id:{status:true,message:'Student ID not valid'}})
               :setError({...formError,student_id:{status:false,message:''}})
           
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={formError.student_id.status}
            value={user.student_id}
            name="student_id"
            label="Student Id"
            type="text"
            id="student_id"
          />}
         {formError.student_id.status && <FormHelperText className={classes.danger}>{formError.student_id.message}</FormHelperText>}


          {user.TA_type === 1 && <><InputLabel id="demo-controlled-open-select-label" className={classes.label}>Major</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            variant="outlined"
            error={formError.major.status}
          
            margin="none"
            placeholder="Please Select "
            required
            open={open}
            fullWidth
            onClose={handleClose}
            onOpen={handleOpen}
            value={user.major}
            onChange={handleChange}
          >
            <MenuItem selected={true} defaultValue disabled value={null}> Please Select Major </MenuItem>
            <MenuItem value={'MMIT'}>{'MMIT'}</MenuItem>
            <MenuItem value={'ANI'}>{'ANI'}</MenuItem>
            <MenuItem value={'SE'}>{'SE'}</MenuItem>
            <MenuItem value={'DG'}>{'DG'}</MenuItem>
            <MenuItem value={'DII'}>{'DII'}</MenuItem>
          </Select></>}
          {formError.major.touch && formError.major.message && <FormHelperText>{formError.major.message}</FormHelperText>}
          <TextField
            onChange={(e) => {
              setUser({ ...user, firstname: e.target.value });
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={user.firstname}
            name="Firstname"
            label="Firstname"
            type="text"
            id="Firstname"
          />

          <TextField
            onChange={(e) => {
              setUser({ ...user, lastname: e.target.value });
            }}
            value={user.lastname}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Lastname"
            label="Lastname"
            type="text"
            id="Lastname"
            autoComplete="current-password"
          />

          <TextField
            onChange={(e) => {
              setUser({ ...user, tel: e.target.value.substring(0,10) });
              console.log(user.tel)
            }}
            variant="outlined"
            margin="normal"
            required
            value={user.tel}
            placeholder="08xxxxxxxx"
            fullWidth
            name="Tel"
            label="Tel"
            type="text"
            id="Tel"
          />

<TextField
            onChange={(e) => {
              setUser({ ...user, facebook: e.target.value });
            }}
            variant="outlined"
            margin="normal"
            value={user.facebook}
            placeholder="facebook name / facebook link"
            fullWidth
            name="Facebook"
            label="Facebook"
            type="text"
            id="Facebook"
          />

<TextField
            onChange={(e) => {
              setUser({ ...user, line: e.target.value });
            }}
            variant="outlined"
            margin="normal"
            value={user.line}
            placeholder="Line ID"
            fullWidth
            name="Line"
            label="Line"
            type="text"
            id="Line"
          />

<TextField
            onChange={(e) => {
              setUser({ ...user, portfolio: e.target.value });
            }}
            variant="outlined"
            margin="normal"
            value={user.portfolio}
            placeholder="Portfolio Link"
            fullWidth
            name="portfolio"
            label="portfolio"
            type="text"
            id="portfolio"
          />


          <Button
            disabled={OnSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

          >
            Register
          </Button>
       </>}
        </form>
      </div>
     
    </Container>
  );
}
