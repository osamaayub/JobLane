import { createSlice } from "@reduxjs/toolkit";
import {
    createJobPost,
    getAllJobs,
    getSavedJobs,
    getSingleJob,
    saveJob
} from "../actions/JobActions";

// Initial State
const initialState = {
    loading: false,
    saveJobLoading: false,
    error: null,
    jobDetails: {
        __v: 0,
        _id: "",
        category: "",
        companyLogo: { public_id: "", url: "" },
        companyName: "",
        createdAt: "",
        description: "",
        employmentType: "",
        experience: "",
        location: "",
        postedBy: "",
        salary: "",
        skillsRequired: [],
        status: "",
        title: " "
    },
    savedJobs: [],
    allJobs: []
};

// Job Slice
const JobSlice = createSlice({
    name: 'Job',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle createJobPost
        builder.addCase(createJobPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createJobPost.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createJobPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle getAllJobs
        builder.addCase(getAllJobs.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.allJobs = action.payload;
        });
        builder.addCase(getAllJobs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle getJobDetails
        builder.addCase(getSingleJob.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSingleJob.fulfilled, (state, action) => {
            state.loading = false;
            state.jobDetails = action.payload;
        });
        builder.addCase(getSingleJob.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle saveJob
        builder.addCase(saveJob.pending, (state) => {
            state.saveJobLoading = true;
        });
        builder.addCase(saveJob.fulfilled, (state) => {
            state.saveJobLoading = false;
        });
        builder.addCase(saveJob.rejected, (state, action) => {
            state.saveJobLoading = false;
            state.error = action.payload;
        });

        // Handle getSavedJobs
        builder.addCase(getSavedJobs.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSavedJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.savedJobs = action.payload.savedJob;
        });
        builder.addCase(getSavedJobs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default JobSlice.reducer;