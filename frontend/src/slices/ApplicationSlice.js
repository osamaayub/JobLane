import { createSlice } from '@reduxjs/toolkit';
import {
    createApplication,
    getAppliedJob,
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
        // Create Application
        builder
            .addCase(createApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createApplication.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Applied Jobs
            .addCase(getAppliedJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAppliedJob.fulfilled, (state, action) => {
                state.loading = false;
                state.appliedJobs = action.payload;
            })
            .addCase(getAppliedJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Application
            .addCase(deleteApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteApplication.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Single Application
            .addCase(getSingleApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.applicationDetails = action.payload;
            })
            .addCase(getSingleApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default ApplicationSlice.reducer;
