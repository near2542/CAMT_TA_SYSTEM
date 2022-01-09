// import React from 'react'
// import { alpha, makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//     container: {
//       display: "flex",
//       flexWrap: "wrap",
//     },
//     search: {
//       position: "relative",
//       borderRadius: theme.shape.borderRadius,
//       backgroundColor: alpha(theme.palette.common.black, 0.05),
//       "&:hover": {
//         backgroundColor: alpha(theme.palette.common.black, 0.15),
//       },
//       marginLeft: 0,
//       width: "100%",
//       [theme.breakpoints.up("sm")]: {
//         marginLeft: theme.spacing(1),
//         width: "auto",
//       },
//     },
//     searchIcon: {
//       padding: theme.spacing(0, 2),
//       height: "100%",
//       position: "absolute",
//       pointerEvents: "none",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
  
//     searchField: {
//       margin: theme.spacing(1, 1, 1, 1),
//       display: "flex",
//       alignItems: "center",
//     },
//     selectField: {
//       display: 'flex',
  
//     },
//     createButton: {
//       color: '#002884',
//       textAlign: 'right',
//     },
//     inputInput: {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//       transition: theme.transitions.create("width"),
//       width: "100%",
//       [theme.breakpoints.up("sm")]: {
//         width: "12ch",
//         "&:focus": {
//           width: "20ch",
//         },
//       },
//     },
//   }));

  
// export default function Searchbox() {

//     const classes = useStyles()

//     return (
//         <div className={classes.searchField}>
//         <div className="select">
//           <FormControl required className={classes.formControl}>
//             <InputLabel id="demo-simple-select-required-label">
//               Search By
//             </InputLabel>

//             <Select
//               labelId="demo-simple-select-required-label"
//               id="demo-simple-select-required"
//               value={SearchBy}
//               onChange={(e) => setSearchBy(e.target.value)}
//               className={classes.selectEmpty}
//             >
//               <MenuItem default value={"All"}>
//                 All
//               </MenuItem>
//               <MenuItem value={"Course_Name"}>Course Name</MenuItem>
//               <MenuItem value={"Course_ID"}>Course ID</MenuItem>

//             </Select>
//           </FormControl>
//         </div>
//         <div className={classes.search}>
//           <div className={classes.searchIcon}>
//             <SearchIcon />
//           </div>
//           <InputBase
//             placeholder="Search…"
//             variant="outlined"
//             classes={{
//               root: classes.inputRoot,
//               input: classes.inputInput,
//             }}
//             onChange={(e) => setSearch(e.target.value)}
//             inputProps={{ "aria-label": "search" }}
//           />
//         </div>

//         <Button variant="contained" color="primary" onClick={() => setCreateOpen(true)}>Create</Button>
//       </div>
//         )
// }
