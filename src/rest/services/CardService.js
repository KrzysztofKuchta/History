import Card from "../../db/models/card.js";

class CardService {
    async create(author, token){

        const card = {
            author,
            token,
            date: new Date()
        }

        await Card.create(card)
    }

    async find(credentials){

        const data = await Card.find({$or: [{token: credentials }, {author:  { $regex: credentials, $options: 'i' }}]})
        if(data.length === 0 ){
            throw new Error("User with this credentials doesn't exist")
        }

        return data;
    }

    async delete(id){

        const data = await Card.findByIdAndDelete(id)
        if(!data){
            throw new Error("Card already doesn't exist")
        }
    }
}

export default new CardService()