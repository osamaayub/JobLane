import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosRequest from '../config/server';
import {toast}from "react-toastify"; // Adjust based on your axios instance

// Async Thunks
export const createJobPost = createAsyncThunk(
    'job/createJobPost',
    async (jobData, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            };

            const { data } = await axiosRequest.post('/create/job', jobData, config);
            return data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage);
        }
    }
);

export const getAllJobs = createAsyncThunk(
    'job/getAllJobs',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosRequest.get('/jobs'); // Correct API endpoint
            return data.Jobs;  // Make sure this is the correct structure from the API response
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage);
        }
    }
);

export const getSingleJob = createAsyncThunk(
    'job/getSingleJob',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axiosRequest.get(`/job/${id}`);
            return data.job;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage);
        }
    }
);

export const saveJob = createAsyncThunk(
    'job/saveJob',
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            };

            const { data } = await axiosRequest.get(`/saveJob/${id}`, config);
            toast.success("Job saved Sucessfully")
            return data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage);
        }
    }
);

export const getSavedJobs = createAsyncThunk(
    'job/getSavedJobs',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            };

            const { data } = await axiosRequest.get('/getSavedJobs', config);
            return data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage);
        }
    }
);