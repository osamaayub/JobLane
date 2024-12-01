
import {
    updateAppRequest, updateAppSuccess, updateAppFail,
    deleteUserRequest, deleteUserSuccess, deleteUserFail,
    updateUserFail,updateUserSuccess,updateUserRequest,
    getJobRequest, getJobSuccess, getJobFail,
    updateJobRequest, updateJobSuccess, updateJobFail,
    deleteJobRequest, deleteJobSuccess, deleteJobFail
} from '../slices/AdminSlice'
import axiosRequest from "../config/server";
import { toast } from 'react-toastify'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllJobsAdmin = createAsyncThunk(
    'admin/allJobs', async (_, { rejectWithValue }) => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }

            const response = await axiosRequest.get("/admin/allJobs", config);

            return response.data.jobs;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }

    })


export const getAllUsersAdmin = createAsyncThunk(
    'admin/allUsers', async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }

            const response = await axiosRequest.get("/admin/allUsers", config);

            return response.data.users;

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }

    });



export const getAllAppAdmin = createAsyncThunk(
    'admin/allApp', async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }

            const response = await axiosRequest.get("/admin/allApp", config);

            return response.data.applications;

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }

    });



export const getAppData = createAsyncThunk(
    'admin/getApplication'
    , async (id, { rejectWithValue }) => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }
            const response = await axiosRequest.get(`/admin/getApplication/${id}`, config)

            return response.data.application;

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    });



export const updateApplication = (id, dataBody) => async (dispatch) => {
    try {
        if (dataBody.status === "not") {
            toast.info("Please Select Status !")
        } else {
            dispatch(updateAppRequest())


            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }

            const { data } = await axiosRequest.put(`/admin/updateApplication/${id}`, dataBody, config)

            dispatch(updateAppSuccess())
            dispatch(getAppData(id))
            toast.success("Status Updated !")
        }

    } catch (err) {
        dispatch(updateAppFail(err.response.data.message))
    }
}


export const deleteApp = createAsyncThunk(
    'admin/deleteApplication', async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }

            const response = await axiosRequest.delete(`/admin/deleteApplication/${id}`, config);
            toast.success("Application Deleted !");
            return response.data;

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }

    });




export const getUserData = createAsyncThunk(
    'admin/getUser', async (id, { rejectWithValue }) => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }

            const response = await axiosRequest.get(`/admin/getUser/${id}`, config)

            return response.data.user;

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage);
        }

    })




export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.put(`/admin/updateUser/${id}`, userData, config)

        dispatch(getUserData(id));
        toast.success("Role Updated Successfully !")
        dispatch(updateUserSuccess())

    } catch (err) {
        dispatch(updateUserFail(err.response.data.message))
    }
}


export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(deleteUserRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.delete(`admin/deleteUser/${id}`, config)

        dispatch(getAllUsersAdmin());
        toast.success("User Deleted Successfully !")
        dispatch(deleteUserSuccess())

    } catch (err) {
        dispatch(deleteUserFail(err.response.data.message))
    }
}


export const getJobData = (id) => async (dispatch) => {
    try {
        dispatch(getJobRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.get(`/admin/getJob/${id}`, config);

        dispatch(getJobSuccess(data.job))

    } catch (err) {
        dispatch(getJobFail(err.response.data.message));
    }
}

export const updateJobData = (id, jobData) => async (dispatch) => {
    try {
        dispatch(updateJobRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.put(`/admin/updateJob/${id}`, jobData, config);
        console.log(data);
        dispatch(updateJobSuccess())
        dispatch(getAllJobsAdmin())
        dispatch(getJobData(id))
        toast.success("Job Updated Successfully !")

    } catch (err) {
        dispatch(updateJobFail(err.response.data.message));
    }
}


export const deleteJobData = (id) => async (dispatch) => {
    try {
        dispatch(deleteJobRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.delete(`/admin/deleteJob/${id}`, config);

        dispatch(deleteJobSuccess())
        dispatch(getAllJobsAdmin())
        toast.success("Job Deleted Successfully !")

    } catch (err) {
        dispatch(deleteJobFail(err.response.data.message));
    }
}