/* eslint-disable no-unused-vars */
import {
    getAllJobsRequest, getAllJobsSuccess, getAllJobsFail,
    getAllUsersRequest, getAllUsersSuccess, getAllUsersFail,
    getAllAppRequest, getAllAppSuccess, getAllAppFail,
    getAppRequest, getAppSuccess, getAppFail,
    updateAppRequest, updateAppSuccess, updateAppFail,
    deleteAppRequest, deleteAppSuccess, deleteAppFail,
    getUserRequest, getUserSuccess, getUserFail,
    updateUserRequest, updateUserSuccess, updateUserFail,
    deleteUserRequest, deleteUserSuccess, deleteUserFail,
    getJobRequest, getJobSuccess, getJobFail,
    updateJobRequest, updateJobSuccess, updateJobFail,
    deleteJobRequest, deleteJobSuccess, deleteJobFail
} from '../slices/AdminSlice'
import axiosRequest from "../config/server";
import { toast } from 'react-toastify'


export const getAllJobsAdmin = () => async (dispatch) => {
    try {
        dispatch(getAllJobsRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.get("/admin/allJobs", config);

        dispatch(getAllJobsSuccess(data.jobs))

    } catch (err) {
        dispatch(getAllJobsFail(err.response.data.message));
    }
}

export const getAllUsersAdmin = () => async (dispatch) => {
    try {
        dispatch(getAllUsersRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.get("/admin/allUsers", config);

        dispatch(getAllUsersSuccess(data.users))

    } catch (err) {
        dispatch(getAllUsersFail(err.response.data.message));
    }
}


export const getAllAppAdmin = () => async (dispatch) => {
    try {
        dispatch(getAllAppRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.get("/admin/allApp", config);

        dispatch(getAllAppSuccess(data.applications))

    } catch (err) {
        dispatch(getAllAppFail(err.response.data.message));
    }
}


export const getAppData = (id) => async (dispatch) => {
    try {
        dispatch(getAppRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.get(`/admin/getApplication/${id}`, config)

        dispatch(getAppSuccess(data.application))

    } catch (err) {
        dispatch(getAppFail(err.response.data.message))
    }
}


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

            // eslint-disable-next-line no-unused-vars
            const { data } = await axiosRequest.put(`/admin/updateApplication/${id}`, dataBody, config)

            dispatch(updateAppSuccess())
            dispatch(getAppData(id))
            toast.success("Status Updated !")
        }

    } catch (err) {
        dispatch(updateAppFail(err.response.data.message))
    }
}


export const deleteApp = (id) => async (dispatch) => {
    try {

        dispatch(deleteAppRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        // eslint-disable-next-line no-unused-vars
        const { data } = await axiosRequest.delete(`/admin/deleteApplication/${id}`, config)


        dispatch(getAllAppAdmin())
        dispatch(deleteAppSuccess())
        toast.success("Application Deleted !")

    } catch (err) {
        dispatch(deleteAppFail(err.response.data.message))
    }
}



export const getUserData = (id) => async (dispatch) => {
    try {

        dispatch(getUserRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.get(`/admin/getUser/${id}`, config)

        dispatch(getUserSuccess(data.user))

    } catch (err) {
        dispatch(getUserFail(err.response.data.message));
    }
}


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

        const { data } = await axiosRequest.delete(`/admin/deleteUser/${id}`, config)

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
