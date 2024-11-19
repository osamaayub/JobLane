
const Job = require('../models/JobModel')
const User = require('../models/UserModel')
const Application = require("../models/AppModel")
const cloudinary = require('cloudinary').v2;


// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        res.status(200).json({
            success: true,
            jobs
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Get all Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            users
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Get all applications
const getAllApp = async (req, res) => {
    try {
        const applications = await Application.find().populate("job applicant");

        res.status(200).json({
            success: true,
            applications
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Update Application Status
const updateApplication = async (req, res) => {
    try {

        const application = await Application.findById(req.params.id);

        application.status = req.body.status;

        await application.save();

        res.status(200).json({
            success: true,
            message: "Application Updated"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// Delete Application
const deleteApplication = async (req, res) => {
    try {

        const application = await Application.findByIdAndRemove(req.params.id);

        res.status(200).json({
            success: true,
            message: "Application Deleted"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// Get Application
const getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate("job applicant");

        res.status(200).json({
            success: true,
            application
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// Update User Role
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        user.role = req.body.role;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User Updated"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);

        res.status(200).json({
            success: true,
            message: "User Deleted"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Get User
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// Update Job

const updateJob = async (req, res) => {
    try {
    const job = await Job.findById(req.params.id);
    const logoToDelete_Id = job.companyLogo.public_id;
    await cloudinary.uploader.destroy(logoToDelete_Id);
        const logo = req.body.companyLogo;
        const myCloud = await cloudinary.v2.uploader.upload(logo, {
            folder: 'logo',
            crop: "scale",
        })
        req.body.companyLogo = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    const jobData = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({
        sucess:true,
        message:"Job Updated",
        jobData
      });

    } catch (err) {
     res.status(500).json({
        sucess:false,
        message:err.message
     })
    }
}



// Get Single Job
const getJob = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id)

        res.status(200).json({
            success: true,
            job
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// Delete Single Job
const deleteJob = async (req, res) => {
    try {

        const job = await Job.findByIdAndRemove(req.params.id)

        res.status(200).json({
            success: true,
            message: "Job Deleted"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    getAllApp,
    getAllJobs,
    getAllUsers,
    updateApplication,
    deleteApplication,
    getApplication,
    getJob,
    getUser,
    updateJob,
    updateUser,
    deleteJob,
    deleteUser
}