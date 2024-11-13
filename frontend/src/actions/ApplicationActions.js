/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';
import axiosRequest from '../config/server';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createApplication = createAsyncThunk(
    'application/createApplication'
    , async (id, { rejectWithValue }) => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }


            const response = await axiosRequest.post(`/createApplication/${id}`, {}, config);
            toast.success("Applied Successfully");
            return response.data;

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);

        }

    })




export const getAppliedJob = createAsyncThunk(
    'application/getAllApplication',
    async (_,{ rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }

            const {data} = await axiosRequest.get("/getAllApplication", config);
            return data.allApplications;

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return  rejectWithValue(errorMessage);
        }

    });



export const getSingleApplication = createAsyncThunk(
    'application/getSingleApplication',
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }
            const response = await axiosRequest.get(`/singleApplication/${id}`, config);
            return response.data;

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return  rejectWithValue(errorMessage);
        }

    });

export const deleteApplication = createAsyncThunk(
    'application/deleteApplication',
    async (id, { rejectWithValue }) => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }

            const response = await axiosRequest.delete(`/deleteApplication/${id}`, config);
            toast.success("Application Deleted Successfully !");
            return response.data;

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return  rejectWithValue(errorMessage);
        }

    });