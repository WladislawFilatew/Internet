const ApiError = require("../error/ApiError")
const uuid = require('uuid')
const path = require('path')
const { Mainer, Indicat } = require("../models/models")


class MainerController{

    async create(req, res, next){
        try {
           const {name, serverId} = req.body
        //const {img} = req.files
        //let fileName = uuid.v4() + ".jpg"
        //img.mv(path.resolve(__dirname,'..','static',fileName))

           const mainer = await Mainer.create({name, serverId })
           return res.json(mainer)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res){
        const {serverId} = req.query
        const mainers = await Mainer.findAll({where: {serverId}})
        return res.json(mainers)
    }

    async getOne(req, res){
        const {id} = req.params
        const mainer = await Mainer.findOne(
            {
                where:{id}
            }
        )
        return res.json(mainer)
    }

    async change(req, res, next){
        const {id} = req.params
        const {pole, value } = req.body
        var img = {}
        var mainer
        if(!id || !pole){
            next(ApiError.badRequest("Error"))
        }
        try {
            if (pole == 'img'){
                img = req.files.img
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname,'..','static', fileName))
                mainer = await Mainer.update({img: fileName},{where: {id}})
            }
            else{
                mainer = await Mainer.update({[pole]: value},{where: {id}})
            }
            res.json(mainer)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }


    }

    async delMainer(req, res, next){
        const {id} = req.params
        const user = await Mainer.findOne({where: {id}})
        if (!user){
            return next(ApiError.badRequest("Пользователя не существует"))
        }
        const data = await Mainer.destroy({where: {id: id}})
        return res.json(data)
    }

    async getCost(req,res,nexr){
        const {id} = req.params
        const data = await Indicat.findAll({limit: 20,
                                            order: [['createdAt', 'DESC']],
                                            where: {"mainerId" : id}
                                        })
        return res.json(data)                                
    }
}



module.exports = new MainerController()