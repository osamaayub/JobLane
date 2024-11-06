import { createSlice } from "@reduxjs/toolkit";
import {
    createJobPost,
    getAllJobs,
    getSavedJobs,
    getSingleJob,
    saveJob
} from "../actions/JobActions";

const initialState = {
    loading: false,
    saveJobLoading: false,
    error: null,
    jobDetails: {
        __v: 0,
        _id: "",
        category: "",
        companyLogo: {
            public_id: "",
            url: ""
        },
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

const JobSlice = createSlice({
    name: 'Job',
    initialState,
    reducers: {
        resetJobDetails: (state) => {
            state.jobDetails = initialState.jobDetails;
        },
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createJobPost.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createJobPost.fulfilled, (state, action) => {
            state.loading = false;
            state.allJobs = [...state.allJobs, action.payload];
        });
        builder.addCase(createJobPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        });

        builder.addCase(getAllJobs.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.allJobs = action.payload;
        });
        builder.addCase(getAllJobs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        });

        builder.addCase(getSavedJobs.pending, (state) => {
            state.loading = true;
            state.saveJobLoading = true;
            state.error = null;
        });
        builder.addCase(getSavedJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.saveJobLoading = false;
            state.savedJobs = action.payload;
        });
        builder.addCase(getSavedJobs.rejected, (state, action) => {
            state.loading = false;
            state.saveJobLoading = false;
            state.error = action.payload || action.error.message;
        });

        builder.addCase(getSingleJob.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getSingleJob.fulfilled, (state, action) => {
            state.loading = false;
            state.jobDetails = action.payload;
        });
        builder.addCase(getSingleJob.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        });

        builder.addCase(saveJob.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(saveJob.fulfilled, (state, action) => {
            state.loading = false;
            state.saveJobLoading = false;
            state.savedJobs = action.payload;
        });
        builder.addCase(saveJob.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        });
    }
});

export const { resetJobDetails, resetError } = JobSlice.actions;
export default JobSlice.reducer;
