import { createSlice } from '@reduxjs/toolkit';
import { createApplication, getAppliedJob, getSingleApplication, deleteApplication } 
from '../actions/ApplicationActions';

const ApplicationSlice = createSlice({
    name: 'application',
    initialState: {
        loading: false,
        error: null,
        appliedJobs: [],
        applicationDetails: {
            applicant: { _id: "", name: "", email: "" },
            applicantResume: { public_id: "", url: "" },
            job: { _id: "", title: "", companyName: "" },
            status: "",
            createdAt: "",
        },
    },
    reducers: {
        // Other reducers if needed
    },
    extraReducers: (builder) => {
        builder
            // Handling createApplication
            .addCase(createApplication.pending, (state) => {
                state.loading = true;
            })
            .addCase(createApplication.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handling getAppliedJob
            .addCase(getAppliedJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAppliedJob.fulfilled, (state, action) => {
                state.loading = false;
                state.appliedJobs = action.payload;
            })
            .addCase(getAppliedJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handling getSingleApplication
            .addCase(getSingleApplication.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.applicationDetails = action.payload; // Make sure action.payload is assigned here
             // Verify this log
            })

            .addCase(getSingleApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handling deleteApplication
            .addCase(deleteApplication.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteApplication.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ApplicationSlice.reducer;
