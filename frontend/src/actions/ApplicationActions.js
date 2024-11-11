/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';
import axiosRequest from '../config/server';
import { createAsyncThunk } from "@reduxjs/toolkit";

// Helper function for getting config with Authorization headers
const getConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
    }
});

export const createApplication = createAsyncThunk(
    'application/createApplication',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.post(`/createApplication/${id}`, getConfig());
            toast.success("Applied Successfully");
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const getAppliedJob = createAsyncThunk(
    'application/getAllApplication',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.get("/getAllApplication", getConfig());
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const getSingleApplication = createAsyncThunk(
    'application/getSingleApplication',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.get(`/singleApplication/${id}`, getConfig());
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteApplication = createAsyncThunk(
    'application/deleteApplication',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.delete(`/deleteApplication/${id}`, getConfig());
            toast.success("Application Deleted Successfully!");
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);
