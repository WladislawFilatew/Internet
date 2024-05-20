const { Server } = require("../models/models")

class ServerController{

    async create(req, res){
        const {uslovId} = req.body
        const server = await Server.create({uslovId})
        return res.json(server)
    }

    async getOne(req, res){
        const {id} = req.params
        const server = await Server.findOne({where: {id}})
        return res.json(server)
    }
}


module.exports = new ServerController()