const User = require('./models/User')
const Comment = require('./models/Comment')
const Prize = require('./models/Prize')
const Poll = require('./models/Poll')
const TextSurvey = require('./models/Survey/TextSurvey')
const RatingSurvey = require('./models/Survey/RatingSurvey')
const OptionSurvey = require('./models/Survey/OptionSurvey')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')
const { GraphQLUpload } = require('graphql-upload')

const resolvers = {
    Query: {
        getAllPrizes: async () => await Prize.find(),
        getAllComments: async () =>  await Comment.find(),
        getAllPoll: async () => await Poll.find(),
        getPoll: async (_, {id}) => await Poll.findById(id),
        getAllTextSurvey: async() => await TextSurvey.find(),
        getTextSurvey: async(_, {id}) => await TextSurvey.findById(id),
        getAllRatingSurvey: async() => await RatingSurvey.find(),
        getRatingSurvey: async(_, {id}) => await RatingSurvey.findById(id),
        getAllOptionSurvey: async() => await OptionSurvey.find(),
        getOptionSurvey: async(_, {id}) => await OptionSurvey.findById(id)

    },

    Upload: GraphQLUpload,

    Mutation: {
        register: async(_, args) => {
            const { username, email, contactNo, password } = args.user
            
            const user = await User.findOne({username})

            if(user) {
                throw new UserInputError("User already exists")
            } else {
                let newUser = new User()
                newUser.username = username
                newUser.email = email
                newUser.contactNo = contactNo
                
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(password, salt)
                newUser.password = hash
                await newUser.save()
                return newUser
            }
        },
        login: async(_, args) => {
            const { username, password } = args.user

            const foundUser = await User.findOne({username})

            if(!foundUser) {
                throw new Error("User doesn't exists")
            } else {
                let isMatch = bcrypt.compareSync(password, foundUser.password)

                if(!isMatch) throw new Error('Invalid Credentials')
                
                let payload = {foundUser}

                let token = jwt.sign(payload, 'mysecretkey', { expiresIn: "6h"})
                return {token}
            }
        },
        createPrize: async(_, args) => {
            const { title, condition } = args.prize
            const prize = new Prize()
            prize.title = title
            prize.condition = condition
            await prize.save()
            return prize
        },
        updatePrize: async (_, args) => {
            const prizeId = args.id
            const prize = await Prize.findById(prizeId)
           
            prize.title = args.prize.title
            prize.condition = args.prize.condition
            await prize.save()
            return prize
        },
        deletePrize: async (_, {id}) => await Prize.findByIdAndDelete(id),

        createComment: async(_, args, {user: {foundUser}}) => {
            const { description } = args.comment
            const comment = new Comment()
            comment.description = description
            comment.authorId = foundUser._id
            comment.pollId = args.pollId
            await comment.save()
            return comment
        },
        deleteComment: async(_, {id}) => await Comment.findByIdAndDelete(id),

        createPoll: async(_, args) => {
            const { question, timeLimit } = args.poll

            const poll = new Poll()
            poll.question = question
            poll.timeLimit = timeLimit
            args.poll.options.forEach(option => {
                poll.options.push(option)
            })

            await poll.save()
            return poll
        },
        answerPoll: async(_, args, {user: {foundUser}}) => {
            let poll = await Poll.findById(args.id)
            const user = await User.findById(foundUser._id)

            poll.options.forEach(option => {
                if(String(option._id) == args.optionId){  
                    option.resultQuantity += 1
                }
            })

            user.surveyDoneId.push(args.id)
            await user.save()
            await poll.save()
            return poll
        },
        deletePoll: async(_, {id}) => await Poll.findByIdAndDelete(id),

        createTextSurvey: async(_, args) => {
            const { timeLimit, pointsEarned } = args.textSurvey

            const textSurvey = new TextSurvey()
            textSurvey.timeLimit = timeLimit
            textSurvey.pointsEarned = pointsEarned

            args.textSurvey.survey.forEach(perSurvey => {
                textSurvey.survey.push(perSurvey)
            })

            await textSurvey.save()
            return textSurvey
        },
        answerTextSurvey: async(_, args, {user: {foundUser}}) => {
            const { answer } = args.answer
            const textSurveyId = args.id
            const textSurvey = await TextSurvey.findById(textSurveyId)
            const user = await User.findById(foundUser._id)
            
            textSurvey.survey.forEach(perSurvey => {
                if(String(perSurvey.question._id == args.questionId)){
                    perSurvey.answer.push(answer)
                }
            })

            user.points += textSurvey.pointsEarned
            user.surveyDoneId.push(args.id)

            await user.save()
            await textSurvey.save()
            return textSurvey
        },
        deleteTextSurvey: async (_, {id}) => await TextSurvey.findByIdAndDelete(id),

        createRatingSurvey: async(_, args) => {
            const { timeLimit, pointsEarned } = args.rating

            const ratingSurvey = new RatingSurvey()
            ratingSurvey.timeLimit = timeLimit
            ratingSurvey.pointsEarned = pointsEarned

            args.rating.survey.forEach(perSurvey => {
                ratingSurvey.survey.push(perSurvey)
            })

            await ratingSurvey.save()
            return ratingSurvey
        },
        answerRatingSurvey: async(_, args, {user: {foundUser}}) => {
            const { rate } = args.rating
            const ratingSurveyId = args.id
            const ratingSurvey = await RatingSurvey.findOne({id: ratingSurveyId})
            const user = await User.findById(foundUser._id)

            ratingSurvey.survey.forEach(perSurvey => {
                if(String(perSurvey.question._id == args. questionId)){
                    perSurvey.rate.push(rate)
                    
                }
            })

            user.points += ratingSurvey.pointsEarned
            user.surveyDoneId.push(args.id)
             
            await user.save()
            await ratingSurvey.save()
            return ratingSurvey
        },
        deleteRatingSurvey: async(_, {id}) => await RatingSurvey.findByIdAndDelete(id),

        createOptionSurvey: async(_, args) => {
            const { timeLimit, pointsEarned } = args.optionSurvey

            const optionSurvey = new OptionSurvey()
            optionSurvey.timeLimit = timeLimit
            optionSurvey.pointsEarned = pointsEarned

            args.optionSurvey.survey.forEach(perSurvey => {
                optionSurvey.survey.push(perSurvey)
            })

            await optionSurvey.save()
            return optionSurvey
        },
        answerOptionSurvey: async(_, args, {user: {foundUser}}) => {
            const optionSurvey = await OptionSurvey.findById(args.id)
            const user = await User.findById(foundUser._id)

            optionSurvey.survey.forEach(perSurvey => {
                if(String(perSurvey._id) == args.questionId){
                    perSurvey.options.forEach(option => {
                        if(String(option._id) == args.optionId){
                            option.resultQuantity += 1
                        }
                    })
                }
            })
            user.points += optionSurvey.pointsEarned
            user.surveyDoneId.push(args.id)

            await user.save()
            await optionSurvey.save()
            return optionSurvey
        },
        deleteOptionSurvey: async(_, {id}) => await OptionSurvey.findByIdAndDelete(id),

        imageUpload: async(_, {file}) => {
            const { createReadStream, filename } = await file

            const stream = createReadStream()

            const pathName = path.join(_dirname, `/public/images/${filename}`)

            const out = require('fs').createWriteStream(pathName)
            stream.pipe(out)

            return { url: `http://localhost:4000/images/${filename}`}
        }

    }
}

module.exports = resolvers