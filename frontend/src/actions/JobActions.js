import { toast } from 'react-toastify';
import axiosRequest from '../config/server';
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create Job Post
export const createJobPost = createAsyncThunk(
    'job/createJob',
    async (jobData, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }

            const response = await axiosRequest.post("/create/job", jobData, config);
            toast.success("Job posted successfully!")
            return response.data;

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage); // return rejectWithValue
        }
    }
)

// Get All Jobs
export const getAllJobs = createAsyncThunk(
    'job/getAllJobs', // Changed to 'job/getAllJobs'
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.get("/jobs");
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage); // return rejectWithValue
        }
    }
);

// Get Single Job
export const getSingleJob = createAsyncThunk(
    'job/getSingleJob', // Corrected the action name to match
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.get(`/job/${id}`);
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage); // return rejectWithValue
        }
    }
);

// Save Job
export const saveJob = createAsyncThunk(
    'job/saveJob', // Corrected the action name to match
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }
            const response = await axiosRequest.get(`/saveJob/${id}`, config);
            toast.success(response.data.message);
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage); // return rejectWithValue
        }
    }
);

// Get Saved Jobs
export const getSavedJobs = createAsyncThunk(
    'job/getSavedJobs', // Corrected the action name to match
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const response = await axiosRequest.get("/getSavedJobs", config);
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage); // return rejectWithValue
        }
    }
);
