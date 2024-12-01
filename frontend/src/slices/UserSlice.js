/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import {
    loginUser,
    logOrNot,
    changePass,
    updateProfile,
    deleteAccount,
    registerUser,
    Me
} from "../actions/UserActions";

const initialState = {
    loading: false,
    error: null,
    isLogin: false,
    registrationSuccess: false,
    me: {
        avatar: {
            public_id: "",
            url: "",
        },
        resume: {
            public_id: "",
            url: "",
        },
        _id: "",
        name: "",
        email: "",
        password: "",
        role: "",
        skills: [],
        createdAt: ""
    },
    userDetails: {
        avatar: {
            public_id: "",
            url: "",
        },
        resume: {
            public_id: "",
            url: "",
        },
        _id: "",
        name: "",
        email: "",
        password: "",
        role: "",
        skills: [],
        createdAt: ""
    },
};

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        logoutClearState: (state) => {
            state.me = initialState.me;
            state.isLogin = false;
            state.registrationSuccess = false;
            state.userDetails = initialState.userDetails;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.registrationSuccess = true;
                state.isLogin = true;
                state.me = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            })

            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isLogin = true;
                state.me = action.payload.user;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })

            // Check if Logged-in (logOrNot)
            .addCase(logOrNot.pending, (state) => {
                state.loading = true;
            })
            .addCase(logOrNot.fulfilled, (state,action) => {
                state.loading = false;
                 state.isLogin=action.payload;
             })
            .addCase(logOrNot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error checking login status";
            })

            // Fetch User's Info (Me)
            .addCase(Me.pending, (state) => {
                state.loading = true;
            })
            .addCase(Me.fulfilled, (state, action) => {
                state.loading = false;
                state.me = action.payload.user;
            })
            .addCase(Me.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching user info";
            })

            // Change Password
            .addCase(changePass.pending, (state) => {
                state.loading = true;
            })
            .addCase(changePass.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(changePass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error changing password";
            })

            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload.user;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error updating profile";
            })

            // Delete Account
            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAccount.fulfilled, (state) => {
                state.loading = false;
                state.isLogin = false;
                localStorage.removeItem('userToken');
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error deleting account";
            });
    }
});

export const { logoutClearState } = UserSlice.actions;

export default UserSlice.reducer;
