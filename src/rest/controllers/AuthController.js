import AuthService from "../services/AuthService.js";
import RefreshTokens from "../../db/models/refreshToken.js";

class AuthController{

    async login(req,res){

        const {email,password} = req.body
        let user
        const maxAgeInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        let tokens

        try{
            user = await AuthService.isExistUser(email)
            await AuthService.isValidPassword(user,password)
            const payload = {
                id: user._id,
                isAdmin: user.isAdmin
            }
           tokens = await AuthService.createTokens(payload);
        }catch (e) {
            return res.status(401).json({success:false, code: e.cause.code, message:e.message})
        }


        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: maxAgeInMilliseconds,
            secure: true,
            httpOnly: true,
            sameSite: 'lax'
        });

        const {token, refreshToken} = tokens

        return res.status(200).json({token, refreshToken})
    }

    async refreshToken(req,res){

        const  tokenCookies  = req.cookies.refreshToken
        const refreshToken = await RefreshTokens.findOne({token : tokenCookies})

        if(!refreshToken){
            return res.status(403).json({message: 'Forbidden', code: 5})
        }

       try{

            const token = await AuthService.verifyToken(tokenCookies)
            return res.status(200).json({succes: true, token: token})

       }catch (e) {
           return res.status(403).json({succes: false, code: e.cause.code, message: e.message})
       }
    }

    async logout(req,res){

        const { refreshToken } = req.cookies

        try {

            await RefreshTokens.deleteOne({ token: refreshToken });
            res.clearCookie('refreshToken');

            return res.status(200).json({success:true, message: 'Refresh-token deleted.' });

        } catch (err) {
            return res.status(403).json({success:false, message: err.message });
        }
    }

    async changePassword(req,res){

        const {newPassword} = req.body

        try{

            const {id} = req.user
            await AuthService.changePassword(id, newPassword)

            return res.status(200).json({success: true, message: "Password changed"})

        }catch(e){
            return  res.status(401).json({success: false, message: e.message})
        }
    }
}

export default new AuthController()