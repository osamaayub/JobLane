const mongoose = require('mongoose') ;

const ApplicationSchema =  new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    applicantResume: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }, 
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true})

const Application = mongoose.model('Application', ApplicationSchema) ;
module.exports = Application
