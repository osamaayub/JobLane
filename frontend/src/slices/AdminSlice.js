
import { createSlice } from '@reduxjs/toolkit'
import {
    getAllJobsAdmin,
    getAllUsersAdmin,
    getAllAppAdmin,
    getAppData,
    deleteApp,
    getUserData,
    updateUser
}
    from "../actions/AdminActions";

const AdminSlice = createSlice({
    name: `admin`,
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
                companyName: ""
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
    reducers: {

        updateUserRequest: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state) => {
            state.loading = false
        },
        updateAppRequest: (state) => {
            state.loading = true
        },
        updateAppSuccess: (state) => {
            state.loading = false
        },
        updateAppFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteUserRequest: (state) => {
            state.loading = true
        },
        deleteUserSuccess: (state) => {
            state.loading = false
        },
        deleteUserFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        getJobRequest: (state) => {
            state.loading = true;
        },
        getJobSuccess: (state, action) => {
            state.loading = false;
            state.jobData = action.payload
        },
        getJobFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        updateJobRequest: (state) => {
            state.loading = true;
        },
        updateJobSuccess: (state) => {
            state.loading = false;
        },
        updateJobFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },


        deleteJobRequest: (state) => {
            state.loading = true;
        },
        deleteJobSuccess: (state) => {
            state.loading = false;
        },
        deleteJobFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

    },
    extraReducers: (builder) => {
        //getAllJobs
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
        //getAllUsers
        builder.addCase(getAllUsersAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUsersAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers = action.payload;
        })
        builder.addCase(getAllUsersAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //getAllApp
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
        //getAppData
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
        //deleteApp
        builder.addCase(deleteApp.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteApp.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteApp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //getUserData
        builder.addCase(getUserData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.loading = false
            state.userData = action.payload
        });
        builder.addCase(getUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export const {
    getAppRequest, getAppSuccess, getAppFail,
    updateAppRequest, updateAppSuccess, updateAppFail,
    deleteAppRequest, deleteAppSuccess, deleteAppFail,
    updateUserSuccess,updateUserRequest,updateUserFail,
    deleteUserRequest, deleteUserSuccess, deleteUserFail,
    getJobRequest, getJobSuccess, getJobFail,
    updateJobRequest, updateJobSuccess, updateJobFail,
    deleteJobRequest, deleteJobSuccess, deleteJobFail

} = AdminSlice.actions;
export default AdminSlice.reducer;