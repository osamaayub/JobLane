import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from "../config/server";
import { toast } from 'react-toastify';

export const getAllJobsAdmin = createAsyncThunk(
    'admin/getAllJobsAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const { data } = await axiosRequest.get("/admin/allJobs", config);
            return data.jobs;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getAllUsersAdmin = createAsyncThunk(
    'admin/getAllUsersAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const { data } = await axiosRequest.get("/admin/allUsers", config);
            return data.users;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getAllAppAdmin = createAsyncThunk(
    'admin/getAllAppAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const { data } = await axiosRequest.get("/admin/allApp", config);
            return data.applications;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getAppData = createAsyncThunk(
    'admin/getAppData',
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const { data } = await axiosRequest.get(`/admin/getApplication/${id}`, config);
            return data.application;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const updateApplication = createAsyncThunk(
    'admin/updateApplication',
    async ({ id, dataBody }, { rejectWithValue }) => {
        try {
            if (dataBody.status === "not") {
                toast.info("Please Select Status !");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };

            await axiosRequest.put(`/admin/updateApplication/${id}`, dataBody, config);

            toast.success("Status Updated !");
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const deleteApp = createAsyncThunk(
    'admin/deleteApp',
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            await axiosRequest.delete(`/admin/deleteApplication/${id}`, config);
            toast.success("Application Deleted !");
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getUserData = createAsyncThunk(
    'admin/getUserData',
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const { data } = await axiosRequest.get(`/admin/getUser/${id}`, config);
            return data.user;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            await axiosRequest.put(`/admin/updateUser/${id}`, userData, config);
            toast.success("Role Updated Successfully !");
            return { id, userData };
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            await axiosRequest.delete(`/admin/deleteUser/${id}`, config);
            toast.success("User Deleted Successfully !");
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getJobData = createAsyncThunk(
    'admin/getJobData',
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const { data } = await axiosRequest.get(`/admin/getJob/${id}`, config);
            return data.job;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const updateJobData = createAsyncThunk(
    'admin/updateJobData',
    async ({ id, jobData }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            await axiosRequest.put(`/admin/updateJob/${id}`, jobData, config);
            toast.success("Job Updated Successfully !");
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const deleteJobData = createAsyncThunk(
    'admin/deleteJobData',
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            await axiosRequest.delete(`/admin/deleteJob/${id}`, config);
            toast.success("Job Deleted Successfully !");
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);
