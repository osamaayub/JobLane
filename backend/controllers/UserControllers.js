const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const {hashPassword,comparePassword}=require("../utils");
const { createToken } = require('../middlewares/auth')
const cloudinary = require('cloudinary').v2;



exports.register = async (req, res) => {
    try {
        const { name, email, password, skills } = req.body;


        // Upload avatar to Cloudinary
        const avatarUpload = await cloudinary.uploader.upload(avatar, {
            folder: 'avatar',
            crop:'scale'
        });

        // Upload resume to Cloudinary (use resource_type: 'raw' for PDFs)
        const resumeUpload = await cloudinary.uploader.upload(resume, {
            folder: 'resume',
        });

        // Hash the password
        const hashPass = await hashPassword(password);

        // Create the user with avatar and resume URLs
        const user = await User.create({
            name,
            email,
            password: hashPass,
            avatar: {
                public_id: avatarUpload.public_id,
                url: avatarUpload.secure_url,
            },
            skills,
            resume: {
                public_id: resumeUpload.public_id,
                url: resumeUpload.secure_url,
            },
        });

        // Create a token for the user
        const token = createToken(user._id, user.email);

        // Send the response with token and user data
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
            token,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
};











//login

exports.login = async (req, res) => {
    try {
        const { email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                sucess: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = comparePassword(password,user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password"
            })
        }

        const token = createToken(user._id, user.email)

        res.status(200).json({
            success: true,
            message: "User logged In Successfully",
            token
        })



    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.isLogin = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (user) {
            return res.status(200).json({
                success: true,
                isLogin: true
            })
        } else {
            return res.status(200).json({
                success: true,
                isLogin: false
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.me = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                sucess: false,
                message: "user not found"
            })

        }
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

exports.changePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword, confirmPassword } = req.body;

        const user = await User.findById(req.user._id)

        const userPassword = user.password;

        const isMatch = comparePassword(oldPassword, userPassword);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is wrong"
            })
        }

        if (newPassword === oldPassword) {
            return res.status(400).json({
                success: false,
                message: "New password is same as old Password"
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "New Pasword and Confirm Password are not matching"
            })
        }

        const hashPass =hashPassword(newPassword);

        user.password = hashPass;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User password changed"
        })



    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { newName, newEmail, newAvatar, newResume, newSkills } = req.body;
        //if any fields missing dont update profile
        if (!newName || !newEmail || !newAvatar || !newResume || !newSkills) {
            return res.status(400).json({
                sucess: false,
                message: "All fields are required"
            })
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(400).json({
                sucess: false,
                message: "user not found"
            })
        }

        const avatarId = user.avatar.public_id;
        const resumeId = user.resume.public_id;

        await cloudinary.uploader.destroy(avatarId);
        await cloudinary.uploader.destroy(resumeId);


        const myCloud1 = await cloudinary.uploader.upload(newAvatar, {
            folder: 'avatar',
            crop: "scale",
        })

        const myCloud2 = await cloudinary.uploader.upload(newResume, {
            folder: 'resume',
            crop: "fit",
        })
        user.name = newName
        user.email = newEmail
        user.skills = newSkills
        user.avatar = {
            public_id: myCloud1.public_id,
            url: myCloud1.secure_url
        }
        user.resume = {
            public_id: myCloud2.public_id,
            url: myCloud2.secure_url
        }

        await user.save()


        res.status(200).json({
            success: true,
            message: "Profile Updated",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.deleteAccount = async (req, res) => {
    try {

        const user = await User.findById(req.user._id)

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {
            await User.findByIdAndRemove(req.user._id);
        } else {
            return res.status(200).json({
                success: false,
                message: "Password does not match !"

            })
        }


        res.status(200).json({
            success: true,
            message: "Account Deleted"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}