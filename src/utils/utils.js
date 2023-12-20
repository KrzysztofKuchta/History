import path from "path";
import {fileURLToPath} from "url";
import {validationResult} from "express-validator";
import mongoose from "mongoose";
import crypto from "crypto";
import config from '../../configs/config.json' assert {type: 'json'}
import P24 from "@ingameltd/node-przelewy24";
import nodemailer from "nodemailer";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const dirname = () => __dirname

export const parseObjectId = id => {
    if (!id) {
        throw new Error('ID jest wymagane.')
    }

    return new mongoose.Types.ObjectId(id)
}
export const randomBytes = (size) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(size, (e, buffer) => {
            if (e) { reject(reject) }
            resolve(buffer.toString('hex'))
        })
    })
}

export const getP24 = () =>{
    const {p24} = config

    if (typeof p24.merchantId !== 'number') {
        throw new Error('Wartosc p24.merchantId w configu musi byc liczba (int)')
    }

    return new P24.P24(
        p24.merchantId,
        p24.posId,
        p24.apiKey,
        p24.crcKey,
        {
            sandbox: p24.isSandbox
        }
    )
}
//merchantId ID konta
//posId ID konta   merchantId posId to to samo
//apiKey "Klucz do raportÃ³w"
//crcKey "Klucz do CRC"
//isSandbox czy sandbox
//returnUrl Automatically prefixed with baseUrl - must start with a "/"!


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: config.mailAuth
});


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "public/gallery")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})
export  {upload}
