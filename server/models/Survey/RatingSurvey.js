const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingSurveySchema = new Schema({
    survey: [{
        question: {type:String},
        rate:[{type:Number, default: 0}],
    }],
    dateCreated: {type:Date, default: Date.now()},
    timeLimit: {type:Number, default: 1},
    pointsEarned: {type:Number, default: 10},
})

module.exports = mongoose.model('ratingSurvey', RatingSurveySchema)