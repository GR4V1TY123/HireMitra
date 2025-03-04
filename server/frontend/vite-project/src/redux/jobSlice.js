import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJobByText:"",
        searchQuery:""
    },
    reducers: {
        //actions
        setJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setSearchJobByText: (state,action) =>{
            state.searchJobByText = action.payload
        },
        setSearchQuery: (state,action) =>{
            state.searchQuery = action.payload
        }
    }
})

export const { setJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setSearchQuery } = jobSlice.actions
export default jobSlice.reducer