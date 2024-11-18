
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
        // Log the request body and uploaded file for debugging
        console.log(req.file); // Logs the uploaded logo file

        // Find the job by ID
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Handle new logo upload if a file is uploaded
        if (req.file && req.file.path) {
            // The logo file uploaded via multer is in req.file
            const logoFile = req.file.path; // Get the file path from multer
            const myCloud = await cloudinary.uploader.upload(logoFile, {
                folder: 'logo', // Specify the folder in Cloudinary
                crop: "scale",  // Scale the image
            });

            // Set the new logo data with Cloudinary's response
            companyLogo = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        // Update the job in the database
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, 
            updatedJobData, { new: true });

        res.status(200).json({
            success: true,
            message: "Job Updated",
            job: updatedJob,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
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

module.exports={
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