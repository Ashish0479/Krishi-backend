const{getProfileController,updateProfileController}=require('../controller/profileController');
const express=require('express');

const profileRouter=express.Router();
const {isLoggedIn}=require('../validations/authvalidator');

profileRouter.get('/',isLoggedIn,getProfileController);
profileRouter.put('/',isLoggedIn,updateProfileController);

module.exports=profileRouter;      