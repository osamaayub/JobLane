import {
    getAllAppAdmin,
    getAllUsersAdmin,
    getAllJobsAdmin,
    getAppData,
    getJobData,
    getUserData,
    updateApplication,
    updateJobData,
    deleteApp,
    deleteUser,
    deleteJobData
} from "../actions/AdminActions";

import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
    name: 'admin',
    initialState: {
        loading: false,
        allJobs: null,
        allApplications: null,
        allUsers: null,
        error: null,
        applicationData: {
            job: {
                title: "",
                companyName: "",
                location: "",
                experience: "",
            },
            applicant: {
                name: "",
                email: ""
            },
            applicantResume: {
                url: ""
            },
            status: "",
            createdAt: ""
        },
        userData: {
            name: "",
            email: "",
            role: "",
            createdAt: "",
            avatar: {
                url: "",
            },
        },
        jobData: {
            title: "",
            description: "",
            companyName: "",
            companyLogo: {
                url: ""
            },
            location: "",
            skillsRequired: [],
            category: "",
            employmentType: "",
            experience: "",
            salary: ""
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        // Jobs
        builder.addCase(getAllJobsAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllJobsAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.allJobs = action.payload;
        });
        builder.addCase(getAllJobsAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getJobData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getJobData.fulfilled, (state, action) => {
            state.loading = false;
            state.jobData = action.payload;
        });
        builder.addCase(getJobData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Users
        builder.addCase(getAllUsersAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUsersAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers = action.payload;
        });
        builder.addCase(getAllUsersAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getUserData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(getUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Applications
        builder.addCase(getAllAppAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllAppAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.allApplications = action.payload;
        });
        builder.addCase(getAllAppAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getAppData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAppData.fulfilled, (state, action) => {
            state.loading = false;
            state.applicationData = action.payload;
        });
        builder.addCase(getAppData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(updateApplication.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateApplication.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(deleteApp.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteApp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(updateJobData.fulfilled, (state, action) => {
            state.loading = false;
            state.jobData = action.payload;  // Update job data with the new details
        });
        builder.addCase(updateJobData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(deleteJobData.fulfilled, (state, action) => {
            state.loading = false;
            state.allJobs = state.allJobs.filter(job => job.id !== action.payload.id); // Remove deleted job from the list
        });
        builder.addCase(deleteJobData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers = state.allUsers.filter(user => user.id !== action.payload.id); // Remove deleted user from the list
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default AdminSlice.reducer;
