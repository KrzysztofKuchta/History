import User from "../../db/models/user.js";
import config from '../../../configs/config.json' assert {type: 'json'}
import jwt from "jsonwebtoken";
import RefreshTokens from "../../db/models/refreshToken.js";

class AuthService{


    async isExistUser(email){

        const user = await User.findOne({email:email})
        if(!user){
            throw new Error("User doesn't exist", {cause: {code: 2 }});
        }
        return user
    }

    async isValidPassword(user,password){
        const validPassword = user.comparePassword(password);
        if (!validPassword) {
            throw new Error('Password not valid', {cause: {code: 3}});
        }
    }

    async createTokens(payload){

        const token = jwt.sign(payload, config.ACCESS_TOKEN, {expiresIn: '1w'})
        const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN)
        await RefreshTokens.create({token:refreshToken})

        return {token,refreshToken}
    }

    async verifyToken(token){
        jwt.verify(token, config.ACCESS_TOKEN, (err,data)=>{
            if(err){
                throw new Error('Forbidden', {cause: {code: 5 }})
            }
            const payload = {
                id: data._id,
                isAdmin: data.isAdmin
            }
            return  jwt.sign(payload, config.ACCESS_TOKEN)
        })
    }

    async changePassword(id, password){
        await User.findByIdAndUpdate(id, {$set:{password:password}})
    }

    async isAuth(token){

        let result
        if(token) {
            jwt.verify(token, config.ACCESS_TOKEN, (err, data) => {
                if (err) {
                    return
                }
                result = data
            })
        }
        return result
    }
}

export default new AuthService()