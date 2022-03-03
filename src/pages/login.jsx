import {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {useDispatch } from 'react-redux'
import {LoginAction} from '../store/auth';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
function Copyright() {


  return (
    
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">

      </Link>{' '}
      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  error : {
    color : 'red',
  }
}));

export  function  Login() {
  const {LoginUser,auth} = useAuth();
  let navigate = useNavigate()
  
  useEffect(()=>
  {
    if(auth.id) navigate('/home',{replace:true})
   
  },[auth,navigate])

  const dispatch = useDispatch();

  const classes = useStyles();
  const [OnSubmit,setOnSubmit] = useState(false);
  const [user,setUser] = useState({
    username:'',
    password:'',
  })
  const [loginError,setLoginError] = useState(null);
  
    
  const ClickLogin = async (e) => 
  {
    e.preventDefault();
    setOnSubmit(!OnSubmit)
    try{
    const {status,data} = await axios.post('/login.php',user);
    console.log('does this still work')
    console.log(data)
    
    if(!data.ACCESS_TOKEN) throw new Error(data.error);
      
    let success = await LoginUser(user.username,user.password)
    console.log(success)
    if(success) navigate('/home')
    setLoginError(null);
    }
    catch(err)
    {

      console.log(err)
      if(err) setLoginError(err.message);
    }
    finally{

      setOnSubmit(false)
      return;
    }
   
   

  }
  return (
<>
   
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}  onSubmit={ClickLogin}>
          <TextField
          onChange={(e)=>{
                  setUser({...user,username:e.target.value});
               } }
            variant="outlined"
            margin="normal"
            required={true}
          
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
          onChange={(e)=>{
            setUser({...user,password:e.target.value});
         } }
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        {loginError && <FormHelperText className={classes.error} ><h3>{loginError}</h3></FormHelperText>}
         
          <Button
            disabled={OnSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}
