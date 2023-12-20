import mongoose from "mongoose";
import config from '../../configs/config.json' assert {type: 'json'}

try {
    mongoose.connect(config.dbUrl)
}catch (e) {
    throw new Error(e)
}