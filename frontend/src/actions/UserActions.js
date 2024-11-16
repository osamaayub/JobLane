/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';
import axiosRequest from "../config/server";
import { createAsyncThunk } from '@reduxjs/toolkit';

// Register User Action
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.post("/register", userData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Ensure the content type is multipart/form-data
                },
            });
            localStorage.setItem('userToken', response.data.token);
            toast.success("Registration successful !");
            return response.data;
        } catch (err) {
            if (err?.response?.data?.message.includes("duplicate")) {
                toast.error("User already exists");
                return rejectWithValue("User already exists");
            } else {
                const message = err?.response?.data?.message || err.message;
                toast.error(message);
                return rejectWithValue("Registration failed");
            }
        }
    }
);

// Login User Action
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.post("/login", userData);
            localStorage.setItem('userToken', response.data.token);
            toast.success("Login successful !");
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Check if User is Logged In
export const logOrNot = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const response = await axiosRequest.get("/isLogin", config);
            return response.data.isLogin;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Fetch Logged-in User's Info (Me)
export const Me = createAsyncThunk(
    'user/Me',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const response = await axiosRequest.get("/me", config);
            localStorage.setItem("role", response.data.user.role);
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            return rejectWithValue(errorMessage);
        }
    }
);

// Change Password Action
export const changePass = createAsyncThunk(
    'user/changePassword',
    async (userData, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const response = await axiosRequest.put("/changePassword", userData, config);
            toast.success("Password changed successfully !");
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Update Profile Action
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const response = await axiosRequest.put("/updateProfile", userData, config);
            toast.success("Profile updated successfully !");
            console.log(userData);
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Delete Account Action
export const deleteAccount = createAsyncThunk(
    'user/deleteAccount',
    async (userData, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            };
            const response = await axiosRequest.put("/deleteAccount", userData, config);

            if (response.data.message === "Account Deleted") {
                toast.success("Account deleted successfully !");
                localStorage.removeItem('userToken');
            } else {
                toast.error("Wrong password !");
            }
            return response.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);
