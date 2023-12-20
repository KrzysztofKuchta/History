import express from 'express'
import config from '../configs/config.json' assert {type: 'json'}
import cookieParser from "cookie-parser"
import apiRouter from "./rest/apiRouter.js";
import User from "./db/models/user.js";

import './db/mongoose.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

const defaultUser = await User.findOne()

if (!defaultUser) {
    await User.create({
        email: 'admin@admin.pl',
        password: 'password123'
    })
    console.log('Default User created')
}

app.use('/api/v1', apiRouter)

app.listen(config.port, ()=>{
    console.log(`app listening on port ${config.port}`)
})