const { Uslov } = require("../models/models")
const ApiError = require('../error/ApiError')

class UslovController{

    async create(req, res){
        const {cost_el, cost_hesh, cost_arend} = req.body
        const uslov = await Uslov.create({cost_el,cost_hesh, cost_arend})
        return res.json(uslov)
    }

    async getOne(req, res){
        const {id} = req.params
        const uslov = await Uslov.findOne({where: {id}})
        return res.json(uslov)
    }

    async change(req,res,next){
        const {id} = req.params
        const {cost_el, cost_arend, cost_hesh } = req.body
        if(!id || !cost_arend || !cost_el || !cost_hesh){
            next(ApiError.badRequest("Error"))
        }
        try {
            const uslov = await Uslov.update({cost_arend: cost_arend, cost_el: cost_el, cost_hesh: cost_hesh},{where: {id}})
            res.json(uslov)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}


module.exports = new UslovController()