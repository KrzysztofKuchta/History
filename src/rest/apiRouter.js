import express from "express";
import authRouter from "./routes/authRouter.js";
import cardRouter from "./routes/cardRouter.js";

const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/card', cardRouter)
export default apiRouter