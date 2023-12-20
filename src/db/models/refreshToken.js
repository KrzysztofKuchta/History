import mongoose from "mongoose";

const Schema = mongoose.Schema

const  refreshTokensSchema = new Schema({

    token:{
        type:String,
        required: true,
        unique: true
    }
})

refreshTokensSchema.post('save', function(error, doc, next) {
    if (error.code === 11000) {
        throw new Error('User is already logged in.', {cause: {code: 8 }})
    }
    next(error);
});

const RefreshTokens = new mongoose.model('refreshTokens', refreshTokensSchema)

export default RefreshTokens