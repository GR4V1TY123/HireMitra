import { createSlice } from "@reduxjs/toolkit";

const applicantsSlice = createSlice({
    name: "applicant",
    initialState: {
        applicants: [],
        appliedJobs: []
    },
    reducers: {
        //actions
        setApplicants:(state, action)=> {
            state.applicants = action.payload
        },
        setAppliedJobs: (state,action) =>{
            state.appliedJobs = action.payload
        }
    }
})

export const {setApplicants, setAppliedJobs} = applicantsSlice.actions
export default applicantsSlice.reducer