import mongoose from "mongoose";

const cardSchema = new mongoose.Schema ({

    token:{
        type:String,
        required: [true, "token is required"],
        unique: [true, "token must be unique"]
    },
    date:{
        type:Date,
       required: true
    },
    author:{
        type:String,
        required: true
    }
})

cardSchema.post('save', (error, doc, next) => {
    if (error.code === 11000) {
        throw new Error('Token is already used', {cause: {code: 8}})
    }
    next(error);
});
const Card = mongoose.model('card', cardSchema)

export default Card