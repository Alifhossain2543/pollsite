const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PrizeSchema = new Schema({
    title: {type:String},
    image: {type:String, default: null},
    condition:{type:Number}
})

module.exports = mongoose.model('prize', PrizeSchema)