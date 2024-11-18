const Job = require('../models/JobModel')
const User = require('../models/UserModel')
const cloudinary = require('cloudinary').v2;




const createJob = async (req, res) => {
    try {
        // Extract the fields from req.body
        console.log(req.body);
        const { title, description, companyName, location, experience, salary, category, employmentType, skillsRequired } = req.body;
        
         if(!req.file){
            return res.status(400).json({message:"Logo not Found"});
         }
         const logoPath=req.file.path;

        // Upload the logo to Cloudinary
        const myCloud = await cloudinary.uploader.upload(logoPath, {
            folder: 'logo',
            crop: "scale",
        });

        // Create the new job post in the database
        const newJob = Job.create({
            title,
            description,
            companyName,
            location,
            companyLogo: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            skillsRequired,
            experience,
            salary,
            category,
            employmentType
        });

        // Save the job post to the database
        await newJob.save();

        // Return a success response
        res.status(201)
        .json({ message: "Job created successfully", job: newJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the job post", error: error.message });
    }
};







const allJobs = async (req, res) => {
    try {

        const Jobs = await Job.find();

        res.status(200).json({
            success: true,
            Jobs
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const oneJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy');

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


const saveJob = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const JobId = req.params.id;

        if (user.savedJobs.includes(JobId)) {

            const jobIdObjectId = new mongoose.Types.ObjectId(JobId);
            const arr = user.savedJobs.filter(jobid => jobid.toString() !== jobIdObjectId.toString());

            user.savedJobs = arr;
            await user.save();

            res.status(200).json({
                success: true,
                message: "Job UnSaved"
            })

        } else {
            const jobIdObjectId = new mongoose.Types.ObjectId(JobId);
            user.savedJobs.push(jobIdObjectId);
            await user.save();
            res.status(200).json({
                success: true,
                message: "Job saved"
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getSavedJobs = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).populate('savedJobs');;



        res.status(200).json({
            success: true,
            savedJob: user.savedJobs
        })



    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports={
createJob,
getSavedJobs,
saveJob,
oneJob,
allJobs
}
