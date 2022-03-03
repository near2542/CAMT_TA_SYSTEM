import { createContext } from "react";

import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const MasterDataContext = createContext(null)






export const MasterDataProvider = ({children}) => {


    

    const [major,setMajor] = useState(null)
    const [semester,setSemester] = useState(null)
    const [daywork,setDaywork] = useState(null)
    const [teacher,setTeacher] = useState(null)

    
    async function fetchSemester(){
        const {data} = await axios.get('/daywork.php')
        if(data.error) throw new Error('Error')
        setSemester(data)
    }    

    async function fetchMajor(){
        const {data} = await axios.get('/daywork.php')
        if(data.error) throw new Error('Error')
    }

    async function fetchDaywork()
    {
        const {data} = await axios.get('/daywork.php')
        if(data.error) throw new Error('Error')
        setDaywork(data)
    }

    async function fetchTeacher()
    {
        const {data} = await axios.get('/teacher.php')
        if(data.error) throw new Error('Error')
        setDaywork(data)
    }


    useEffect(()=>
    {
        Promise.all([fetchMajor,fetchDaywork,fetchSemester,fetchTeacher])
    })

  return (
    <MasterDataContext.Provider value={major,teacher,daywork,semester}>{children}</MasterDataContext.Provider>
  )
}
