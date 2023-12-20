import bcrypt from "bcrypt";
import User from "../db/models/user.js";
import AuthService from "../rest/services/AuthService.js";

export const checkPassword = (req,res,next) =>{

    const {password} = req.body
    if(password[0] !== password[1]){
        return res.status(400).json({success:false, code: 7, message:"Passwords aren't the same"})
    }

    next()
}

export const passwordValid = async (req, res, next) => {

    const {oldPassword, newPassword} = req.body
    const user = await User.findById(req.user.id)

    try{

         await AuthService.isValidPassword(user, oldPassword)
         await User.findByIdAndUpdate(req.user.id, newPassword)
    }catch (e) {
        return res.status(400).json({succes: false, code: e.cause.code, message: e.message})
    }

    next()
}