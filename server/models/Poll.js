const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PollSchema = new Schema({
    question: {type:String},
    options: [
        {
            name: {type:String},
            resultQuantity: {type: Number, default: 0}
        }
    ],
    image: {type:String, default:null},
    timeLimit: {type:Number, default: 1},
    dateCreated: {type:Date, default: Date.now()},
})

module.exports = mongoose.model('poll', PollSchema)