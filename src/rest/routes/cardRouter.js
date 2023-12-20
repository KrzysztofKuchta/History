import express from "express";
import CardController from "../controllers/CardController.js";
import {isAuth} from "./middleware/middleware.js";

const cardRouter = express.Router()

cardRouter.get('/get',  isAuth, CardController.get)
cardRouter.get('/find/:credentials',  CardController.findByCredentials)
cardRouter.post('/create', isAuth, CardController.create)
cardRouter.post('/delete', isAuth, CardController.delete)

export default cardRouter