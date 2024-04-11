require('dotenv').config();
const CLIENT_URL = process.env.CLIENT_URL;
const User = require('../model/UserModel')
const asyncHandler = require('express-async-handler')
const isLoggedIn = async (req,res,next)=>{
    await req.session.save();
    console.log(req.session);
    req.user ? next(): res.status(401).json({data: req.user, message: "hel"});
}
const isAuthenticatedCallBack = ()=>{}
const isSuccessLogin = asyncHandler(async(req,res)=>{
    if(req.isAuthenticated()){
      //console.log(req)
      const existingUser = await User.findById(req.user.user._id);
      if(!existingUser)
       return res.status(401).json({data:req.user});
      if(existingUser.refreshToken !== req.user.refreshToken)
      {
        

        return res.json({data: req.user.refreshToken, message: "hello"});
      }
        res.status(200).json({
          success: true,
          message: "Sucesss",
          user: req.user
        })
    }
})
const isFailureLogin = (req,res)=>{
    res.status(401).json({
      success: false,
      message: 'failure'
    })
    //res.redirect(CLIENT_URL)
};
const Logout = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
        }
        res.status(200).json({
          success: true,
          message: "Success"
        });
      });
    });

  } else {
    res.status(401).json({
      success: false,
      message: "User not authenticated"
    });
  }
};

  module.exports = {isLoggedIn, isAuthenticatedCallBack, isSuccessLogin, isFailureLogin, Logout};