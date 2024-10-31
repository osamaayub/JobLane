/* eslint-disable no-unused-vars */
import {
    createApplicationRequest, createApplicationSuccess, createApplicationFail,
    allAppliedJobsRequest, allAppliedJobsSuccess, allAppliedJobsFail,
    applicationDetailsRequest, applicationDetailsSuccess, applicationDetailsFail,
    deleteApplicationRequest, deleteApplicationSuccess, deleteApplicationFail
} from '../slices/ApplicationSlice'

import { Me } from '../actions/UserActions';
import { toast } from 'react-toastify'
import axiosRequest from '../config/server';

export const createApplication = (id) => async (dispatch) => {
    try {
        dispatch(createApplicationRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }


        const { data } = await axiosRequest.post(`/createApplication/${id}`, config, config);


        dispatch(createApplicationSuccess())
        toast.success("Applied Successfully")
        dispatch(Me())

    } catch (err) {
        dispatch(createApplicationFail(err.response.data.message))
        toast.error(err.response.data.message)
        dispatch(Me())
    }
}


export const getAppliedJob = () => async (dispatch) => {
    try {

        dispatch(allAppliedJobsRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.get("/getAllApplication", config);

        dispatch(allAppliedJobsSuccess(data.allApplications))

    } catch (err) {
        dispatch(allAppliedJobsFail())
    }
}


export const getSingleApplication = (id) => async (dispatch) => {
    try {

        dispatch(applicationDetailsRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.get(`/singleApplication/${id}`, config);

        dispatch(applicationDetailsSuccess(data.application))

    } catch (err) {
        dispatch(applicationDetailsFail())
    }
}

export const deleteApplication = (id) => async (dispatch) => {
    try {

        dispatch(deleteApplicationRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axiosRequest.delete(`/deleteApplication/${id}`, config)

        dispatch(deleteApplicationSuccess())
        dispatch(getAppliedJob())
        dispatch(Me())

        toast.success("Application Deleted Successfully !")

    } catch (err) {
        dispatch(deleteApplicationFail(err.response.data.message))
    }
}