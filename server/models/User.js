const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {type: String},
    email: {type: String},
    contactNo: {type:String},
    password: {type: String},
    points: {type:Number, default: 0},
    surveyDoneId: [{type:String}],
    isAdmin: {type:Boolean, default: false}
})

module.exports = mongoose.model('user', UserSchema)