const express=require("express");
const  sendContactMessage=require("../controllers/sendEmailController");
const {isAuthenticated}=require("../middlewares/auth")
const upload=require("../utils/multer");



const sendEmailRouter=express.Router();



sendEmailRouter.post("/contact",isAuthenticated, upload.none(),sendContactMessage);

module.exports=sendEmailRouter;