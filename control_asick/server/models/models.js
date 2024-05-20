const sequelize = require('../db')
const {DataTypes, HasOne} = require('sequelize')

//Создание таблиц
const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    nikname: {type: DataTypes.STRING, defaultValue: "User"}
})

const Server = sequelize.define('server', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cost_object: {type: DataTypes.INTEGER, defaultValue: 0},
    income: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Mainer = sequelize.define('mainer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,allowNull:false},
    hashrat: {type: DataTypes.INTEGER, defaultValue: 0},
    consum_el: {type: DataTypes.INTEGER, defaultValue: 0},
    cost: {type: DataTypes.INTEGER, defaultValue: 0},
    profit: {type: DataTypes.INTEGER, defaultValue: 0},
    expend: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false, defaultValue: 'defaut.jpg'},
    work: {type: DataTypes.BOOLEAN, defaultValue: true}
})

const Uslov = sequelize.define('uslov', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cost_el: {type: DataTypes.INTEGER, defaultValue: 0},
    cost_hesh: {type: DataTypes.INTEGER, defaultValue: 0},
    cost_arend: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Indicat = sequelize.define('indicat', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    profit: {type: DataTypes.INTEGER, defaultValue: 0},
    expend: {type: DataTypes.INTEGER, defaultValue: 0}
})


Server.hasOne(User)
User.belongsTo(Server)

Server.hasMany(Mainer)
Mainer.belongsTo(Server)

Uslov.hasOne(Server)
Server.belongsTo(Uslov)

Mainer.hasOne(Indicat)
Indicat.belongsTo(Mainer)

module.exports = {
    User,
    Server,
    Mainer,
    Uslov,
    Indicat
}