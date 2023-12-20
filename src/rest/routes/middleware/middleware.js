import jwt from 'jsonwebtoken'
import config from "../../../../configs/config.json" assert {type: 'json'}
import {validationResult} from "express-validator";
export const isAuth = (req, res, next) =>{

    const token = req.headers['authorization']?.split(' ')[1]

    if(!token){
        return res.status(403).json({success:false, message:"Undefined token"})
    }

    jwt.verify(token, config.ACCESS_TOKEN, (err, data) =>{

        if(err){
            return res.status(403).json({message: err.message, code : 5})
        }

        req.user = data;
        next();
    })
}

export const isAdmin = (req,res,next)=>{

    if (!req?.user?.isAdmin) {
        return res.status(403).json({success: false, message: 'Only for admins'});
    }
    next()
}
export const checkResult = (req,res,next) => {

    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: result.mapped()
        })
    }
    next()
}