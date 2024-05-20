const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Server, Uslov} = require('../models/models')

const generatorToken = (id,email) =>{
    return jwt.sign(
        {id, email},
         process.env.SECRET_KEY,
         {expiresIn: '24h'})
}


class UserController{

    async registration(req,res, next){
        const {email,password} = req.body
        if (!email || !password){
            return next(ApiError.badRequest("Некоректный email или password"))
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest("Пользователь с таким emai уже существует"))
        }

        const hashPassword = await bcrypt.hash(password,5)

        const uslov = await Uslov.create();
        const server = await Server.create({uslovId: uslov.id})
        const user = await User.create({email,password: hashPassword, serverId: server.id})

        const token = generatorToken(user.id,user.email)
        return res.json({token})
    }

    async login(req, res, next){
        const {email,password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if (!comparePassword){
            return next(ApiError.internal('Указан не верный пароль'))
        }
        const token = generatorToken(user.id,user.email)
        return res.json({token})
    }

    async check(req, res, next){
        const token = generatorToken(req.user.id,req.user.email,req.user.role)
        return res.json({token})
    }

    async getOne(req,res,next){
        const {id} = req.params
        const  user  = await User.findOne({where: {id}})
        return res.json(user)
    }

    async change(req,res,next){
        const {id} = req.params
        const {nikname, email } = req.body
        if(!id || !nikname || !email){
            next(ApiError.badRequest("Error"))
        }
        try {
            const user = await User.update({nikname: nikname, email: email},{where: {id}})
            res.json(user)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}


module.exports = new UserController()