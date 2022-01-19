import React, { useState, useEffect } from "react";
import { useStyles } from './SearchboxStyle/style'
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
  
export default function Searchbox({searchValue,setSearch,options}) {

    
    const classes = useStyles()

    return (
        <div className={classes.searchField}>
        <div className="select">
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Search By
            </InputLabel>

            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={searchValue.searchBy}
              onChange={(e) => setSearch({...searchValue,searchBy:e.target.value})}
              className={classes.selectEmpty}
              
            >
               {options.map(data => <MenuItem default={data.default} value={data.value}>{data.label}</MenuItem>)}
          
           
            </Select>
          </FormControl>
        </div>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
            onChange={(e) => setSearch({...searchValue,searchValue:e.target.value})}
              placeholder="Search…"
              variant="outlined"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          
      </div>
        )
}
