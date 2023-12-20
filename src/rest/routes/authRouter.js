import express from "express";
import {checkPassword, passwordValid} from "../../utils/validatorUtils.js";
import AuthController from "../controllers/AuthController.js";
import {checkResult, isAuth} from "./middleware/middleware.js";
import {body} from "express-validator";

const authRouter = express.Router()

authRouter.post('/login', body(['email','password']).notEmpty(), body('email').isEmail(), checkResult,  AuthController.login)
authRouter.post('/refresh-token', isAuth, AuthController.refreshToken)
authRouter.post('/logout',  AuthController.logout)
authRouter.post('/change-password', body(['oldPassword', 'newPassword']).notEmpty(), checkResult, isAuth, passwordValid,  AuthController.changePassword)

export default authRouter