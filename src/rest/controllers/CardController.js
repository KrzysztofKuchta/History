import Card from "../../db/models/card.js";
import CardService from "../services/CardService.js";

class CardController{

    async get(req,res){
        const data = await Card.find()
        return res.status(200).json({succes:true, data:data})
    }

    async create(req,res){

        const {author, token} = req.body

        try {

            await CardService.create(author, token)
            return res.status(200).json({success:true, code: 1, message:"Card saved successfully"})
        }catch (e) {
            return res.status(400).json({success:false, code: 2,  message:e.message})
        }
    }

    async findByCredentials(req,res){

        const {credentials} = req.params

        try {

            const data = await CardService.find(credentials)
            return res.status(200).json({success:true, code: 6, data})

        }catch (e) {
            return res.status(400).json({success:false, code: 5, message:e.message})
        }
    }

    async delete(req,res){

        const {id} = req.body

        try {

            await CardService.delete(id)
            return res.status(200).json({succes:false,code: 7, message:"Deleted"})
        }catch (e) {
            return res.status(400).json({success:false, code: 8, message:e.message})
        }
    }
}

export default new CardController()