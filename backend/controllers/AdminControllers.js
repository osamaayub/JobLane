
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
         const {id}=req.params;
        const application = await Application.findById(id);

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
        const {id}=req.params;
        const application = await Application.findByIdAndRemove(id);

        res.status(200).json({
            success: true,
            message: "Application Deleted",
            application

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
        const {id}=req.params;
        const application = await Application.findById(id).populate("job applicant");

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
        const {id}=req.params;
        const user = await User.findById(id);

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
        const {id}=req.params;
        const user = await User.findByIdAndRemove(id);

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
        const {id}=req.params;
        const user = await User.findById(id);

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
        const { id } = req.params;
        const job = await Job.findById(id);
        const logoToDelete_Id = job.companyLogo.public_id;
        await cloudinary.uploader.destroy(logoToDelete_Id);

        let logo;
        if (req.file) {
            logo = req.file ? req.file.path :null;
            const CompanyLogoCloud = await cloudinary.uploader.upload(logo, {
                folder: 'logo',
                crop: "scale",
            });
            req.body.companyLogo = {
                public_id: CompanyLogoCloud.public_id,
                url: CompanyLogoCloud.secure_url
            };
        }

        const jobData = await Job.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: "Job Updated",
            job: jobData
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};



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