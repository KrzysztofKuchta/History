import mongoose from "mongoose";
import bcrypt from "bcrypt"
const Schema = mongoose.Schema

const userSchema = new Schema({

    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    }
})

userSchema.path('password').set(value => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(value, salt);
    return hash;
});

userSchema.post('save', function(error, doc, next) {
    if (error.code === 11000) {
        console.log(error.message)
        throw new Error('Email is already used', {cause: {code: 4 }})
    }
    next(error);
});

userSchema.methods = {
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName[0]}.`;
});

const User = new mongoose.model('user', userSchema)

export default User