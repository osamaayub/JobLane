import { createSlice } from '@reduxjs/toolkit';
import {
    createApplication
    , getAppliedJob,
    getSingleApplication,
    deleteApplication
} from "../actions/ApplicationActions";

const ApplicationSlice = createSlice({
    name: 'Application',
    initialState: {
        loading: false,
        error: null,
        appliedJobs: [],
        applicationDetails: {
            applicant: {
                _id: "",
                name: "",
                email: ""
            },
            applicantResume: {
                public_id: "",
                url: ""
            },
            job: {
                _id: "",
                title: "",
                companyName: ""
            },
            status: "",
            createdAt: "",
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        //create Application
        builder.addCase(createApplication.pending, (state) => {
            state.loading = true;
        }
        ).addCase(createApplication.fulfilled, (state, action) => {
            state.loading = false;
        }).addCase(createApplication.rejected, (state, action) => {
           state.loading=false;
           state.error=action.payload;
          //get Applied Jobs
        }).addCase(getAppliedJob.pending,(state)=>{
              state.loading=false;
        }).addCase(getAppliedJob.fulfilled,(state,action)=>{
            state.loading=false;
            state.appliedJobs=action.payload;

        }).addCase(getAppliedJob.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
          
        })
            //delete Application
        .addCase(deleteApplication.pending,(state)=>{
          state.loading=true;

        }).addCase(deleteApplication.fulfilled,(state)=>{
          state.loading=false;
        }).addCase(deleteApplication.rejected,(state,action)=>{
             state.loading=false;
             state.error=action.payload;
        })
        //get Single Applications
        .addCase(getSingleApplication.pending,(state)=>{
            state.loading=true;
        }).addCase(getSingleApplication.fulfilled,(state,action)=>{
             state.loading=false;
             state.applicationDetails=action.payload;
        }).addCase(getSingleApplication.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

    }
})
export default ApplicationSlice.reducer