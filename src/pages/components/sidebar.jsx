
import React, { useEffect } from "react";
import axios from '../../shared/axios';
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { Link,Outlet} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AdminMenuList, TeacherMenuList, TAMenuList } from "./sidebarRouting";
import { role } from "../../shared";
import { majorReducer,dayworkReducer,semesterReducer } from "../../store/masterdata";
import HomeIcon from "@material-ui/icons/Home";

const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  Link: {
    textDecoration: "none",
    color: "inherit",
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.auth);
  const { auth } = useSelector((state) => state);
  console.log(auth)
  const title = useSelector((state) => state.title.title);

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(async ()=>{
    try{
    const major = await axios.get('/major.php');
    const daywork = await axios.get('/daywork.php')
    const semester = await axios.get('/semester.php')
    dispatch(majorReducer(major.data)) 
    dispatch(dayworkReducer(daywork.data)) 
    dispatch(semesterReducer(semester.data)) 
      
    }
    catch(err)
    {
      alert('something went wrong');
    }
  },
  [])
  
  
  const drawer = (
    <div>

      <Toolbar>
        <Typography color="secondary" variant="h5">
          CAMT TA System
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <ListItemText>
            <Typography color="primary">ROLE: {role[state.role]}</Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography color="primary">USERNAME: {state.username}</Typography>
          </ListItemText>
        </ListItem>
      </List>

      <Divider />
      <List>
        <Link className={classes.Link} to="/home">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {state.role == 1 && (
        <>
          <List>
            {AdminMenuList.map((text, index) => (
              
              <Link className={classes.Link} to={text.route} key={`${index} ${text}`}> 
                <ListItem button key={text.name}>
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      )}

      {state.role == 4 && (
        <>
          {" "}
          <List>
            {TeacherMenuList.map((text, index) => (
              <Link className={classes.Link} to={text.route} key={`${index} ${text}`}>
                <ListItem button key={text.name}>
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </>
      )}
      {state.role == 3 && (
        <>
          <List>
            {TAMenuList.map((text, index) => (
              <Link key={`${index} ${text}`} className={classes.Link} to={text.route} >
                <ListItem button key={text.name}>
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </>
      )}

      {state.role == 2 && (
        <>
          <List>
            {TAMenuList.map((text, index) => (
              <Link key={`${index} ${text}`} className={classes.Link} to={text.route}>
                <ListItem button key={text.name}>
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </>
      )}

      <List>
        <Link className={classes.Link} to="/logout">
        <ListItem
          button
          // onClick={() => {
          //   console.log("log out");
          // }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

    const token = localStorage.getItem('TAcamt-Auth')??  null 
    console.log(token)
  return token?(

    <div className={classes.root}>

      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <title>{state.role}- {title} </title>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Outlet/>
      </main>
    </div>
  ):  null
}



export default ResponsiveDrawer;
