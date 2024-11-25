const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type : DataTypes.STRING, allowNull: false},
    surname: {type : DataTypes.STRING, allowNull: false},
    phone_number: {type : DataTypes.STRING,},
    email: {type : DataTypes.STRING, unique: true, allowNull: false},
    password: {type : DataTypes.STRING, allowNull: false},
    roles: {type : DataTypes.STRING, defaultValue: "USER"},
})

const Subject = sequelize.define('subject', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type : DataTypes.STRING, unique: true, allowNull: false},
    description: {type : DataTypes.STRING,}
})

const Syllabus = sequelize.define('syllabus', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type : DataTypes.DATE, allowNull: false},
})

const Form_study = sequelize.define('form_study', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type : DataTypes.STRING, allowNull: false},
})

const Type_method = sequelize.define('Type_method', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type : DataTypes.STRING, allowNull: false},
})

const Speciality = sequelize.define('speciality', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type : DataTypes.STRING, unique: true, allowNull: false},
    qualification: {type : DataTypes.STRING, allowNull: false},
})

const Methodological_rec = sequelize.define('methodological_rec', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date_realese: {type : DataTypes.DATE, allowNull: false},
    title: {type : DataTypes.STRING, unique: true, allowNull: false},
    description: {type : DataTypes.STRING, allowNull: false},
    language: {type : DataTypes.STRING, allowNull: false},
    year_create: {type : DataTypes.DATE, allowNull: false},
    url: {type : DataTypes.STRING, allowNull: false},
    quantity_pages: {type : DataTypes.INTEGER, allowNull: false},
})

const User_methodological = sequelize.define('user_methodological',{
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Speciality_method = sequelize.define('speciality_method',{
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Syllabus.hasMany(Subject)
Subject.belongsTo(Syllabus)

Type_method.hasMany(Methodological_rec)
Methodological_rec.belongsTo(Type_method)

Form_study.hasMany(Speciality)
Speciality.belongsTo(Form_study)

Subject.hasOne(Methodological_rec)
Methodological_rec.belongsTo(Subject)

Methodological_rec.belongsToMany(User, {through: User_methodological})
User.belongsToMany(Methodological_rec, {through: User_methodological})

Methodological_rec.belongsToMany(Speciality, {through: Speciality_method})
Speciality.belongsToMany(Methodological_rec, {through: Speciality_method})

module.exports = {
    User, 
    Subject, 
    Syllabus,
    Form_study,
    Type_method,
    Speciality,
    Methodological_rec,
    User_methodological,
    Speciality_method
}